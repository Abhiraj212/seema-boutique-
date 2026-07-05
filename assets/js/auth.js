/**
 * SR Fashion — Auth
 * Handles the Login and Register forms using Firebase Authentication
 * (email / password). Designed to fail gracefully if Firebase hasn't
 * been configured yet (see firebase-config.js).
 */
(function () {
  'use strict';

  function showMessage(el, text) {
    if (!el) return;
    el.textContent = text;
    el.classList.add('is-visible');
  }

  function hideMessage(el) {
    if (!el) return;
    el.classList.remove('is-visible');
    el.textContent = '';
  }

  function setLoading(button, isLoading, idleLabel) {
    if (!button) return;
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Please wait…' : idleLabel;
  }

  function friendlyError(err) {
    const code = err && err.code ? err.code : '';
    const map = {
      'auth/invalid-email': 'That email address doesn’t look right.',
      'auth/user-not-found': 'No account found with that email.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Choose a password with at least 6 characters.',
      'auth/network-request-failed': 'Network error — check your connection and try again.',
    };
    return (
      map[code] ||
      'Firebase isn’t configured yet — add your project keys in assets/js/firebase-config.js.'
    );
  }

  function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    const errorEl = form.querySelector('.form-error');
    const successEl = form.querySelector('.form-success');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideMessage(errorEl);
      hideMessage(successEl);

      const email = form.email.value.trim();
      const password = form.password.value;

      if (!email || !password) {
        showMessage(errorEl, 'Please fill in both email and password.');
        return;
      }

      if (!window.srAuth) {
        showMessage(errorEl, friendlyError({}));
        return;
      }

      setLoading(submitBtn, true, 'Sign in');
      window.srAuth
        .signInWithEmailAndPassword(email, password)
        .then(function () {
          showMessage(successEl, 'Signed in successfully. Redirecting…');
          setTimeout(function () {
            window.location.href = 'index.html';
          }, 900);
        })
        .catch(function (err) {
          showMessage(errorEl, friendlyError(err));
        })
        .finally(function () {
          setLoading(submitBtn, false, 'Sign in');
        });
    });
  }

  function initRegisterForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    const errorEl = form.querySelector('.form-error');
    const successEl = form.querySelector('.form-success');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideMessage(errorEl);
      hideMessage(successEl);

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      const confirm = form.confirmPassword.value;
      const agreed = form.terms.checked;

      if (!name || !email || !password || !confirm) {
        showMessage(errorEl, 'Please fill in every field.');
        return;
      }
      if (password.length < 6) {
        showMessage(errorEl, 'Password should be at least 6 characters.');
        return;
      }
      if (password !== confirm) {
        showMessage(errorEl, 'Passwords do not match.');
        return;
      }
      if (!agreed) {
        showMessage(errorEl, 'Please accept the Terms & Privacy Policy to continue.');
        return;
      }

      if (!window.srAuth) {
        showMessage(errorEl, friendlyError({}));
        return;
      }

      setLoading(submitBtn, true, 'Create account');
      window.srAuth
        .createUserWithEmailAndPassword(email, password)
        .then(function (cred) {
          return cred.user.updateProfile({ displayName: name }).then(function () {
            if (window.srDb) {
              return window.srDb.collection('users').doc(cred.user.uid).set({
                name: name,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
            }
          });
        })
        .then(function () {
          showMessage(successEl, 'Account created. Redirecting…');
          setTimeout(function () {
            window.location.href = 'index.html';
          }, 900);
        })
        .catch(function (err) {
          showMessage(errorEl, friendlyError(err));
        })
        .finally(function () {
          setLoading(submitBtn, false, 'Create account');
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLoginForm();
    initRegisterForm();
  });
})();
