import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '714119740864-86bb52urngugkd0t6iorv6cq5rv5ecvm.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // The user's Google ID
}

export async function verifyGoogleToken(token: string): Promise<GoogleUser> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();

  // Ensure payload exists and has the required fields
  if (!payload || !payload['email'] || !payload['name'] || !payload['sub']) {
    throw new Error('Invalid Google token');
  }

  // Use non-null assertion operator to tell TypeScript that you are sure the value is not null/undefined
  return {
    email: payload['email']!, // Asserting that email is not undefined
    name: payload['name']!, // Asserting that name is not undefined
    picture: payload['picture']!, // Asserting that picture is not undefined
    sub: payload['sub']!, // Asserting that sub is not undefined
  };
}
