/**
 * SR Fashion — Firebase configuration
 * ------------------------------------------------------------------
 * Replace every value below with the config object from your own
 * Firebase project: Firebase Console → Project settings → General →
 * "Your apps" → SDK setup and configuration.
 *
 * This file only initializes Firebase. Auth logic lives in auth.js so
 * it stays reusable across login.html and register.html.
 * ------------------------------------------------------------------
 */

// TODO: replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Guard so this file can be safely included on every page even before
// real keys are added — pages that don't need auth/firestore won't crash.
let srFirebaseApp = null;
let srAuth = null;
let srDb = null;

try {
  if (window.firebase && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
    srFirebaseApp = firebase.initializeApp(firebaseConfig);
    srAuth = firebase.auth();
    srDb = firebase.firestore();
  } else if (window.firebase) {
    // Keys not yet configured — initialize a no-op-safe app so pages
    // don't throw, but log a clear message for the developer.
    console.info(
      '[SR Fashion] Firebase config placeholders detected. Add your real keys in assets/js/firebase-config.js to enable Authentication and Firestore.'
    );
  }
} catch (err) {
  console.error('[SR Fashion] Firebase failed to initialize:', err);
}
