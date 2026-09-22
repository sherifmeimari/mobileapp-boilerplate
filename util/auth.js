import axios from 'axios';

const FIREBASE_API_KEY = 'AIzaSyA21X_KsoyYuUJp53UyvFvPTWXk3LUqx-4';

// docs: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
async function authenticateFirebase(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  // Firebase Auth API response payload contains idToken
  const token = response.data.idToken;
  return token;
}

export function createFirebaseUser(email, password) {
  return authenticateFirebase('signUp', email, password);
}

export function loginFirebaseUser(email, password) {
  return authenticateFirebase('signInWithPassword', email, password);
}
