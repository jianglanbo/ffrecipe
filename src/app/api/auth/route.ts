import { NextRequest, NextResponse } from 'next/server';

// GitHub OAuth configuration
// Create a GitHub OAuth App at https://github.com/settings/developers
// Set Authorization callback URL to: https://ffrecipe.com/api/auth
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // If no code, redirect to GitHub OAuth
  if (!code) {
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set('redirect_uri', 'https://ffrecipe.com/api/auth');
    githubAuthUrl.searchParams.set('scope', 'repo');
    githubAuthUrl.searchParams.set('state', state || Math.random().toString(36).substring(7));
    
    return NextResponse.redirect(githubAuthUrl.toString());
  }

  // Exchange code for token
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: 'https://ffrecipe.com/api/auth',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error }, { status: 400 });
    }

    // Return HTML that sends token to parent window and closes
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <script>
          if (window.opener) {
            window.opener.postMessage(
              { type: 'oauth', token: '${tokenData.access_token}' },
              'https://ffrecipe.com'
            );
            window.close();
          }
        </script>
      </head>
      <body>
        <p>Authentication successful! You can close this window.</p>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
