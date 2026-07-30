import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Chrome enforces a brief cooldown after pointer lock is exited via the
// default unlock gesture (Esc) — re-locking too soon rejects with a
// SecurityError. It's a native browser restriction, not a bug in this
// project (see https://github.com/pmndrs/drei/issues/1988), and it
// resolves itself a moment later. Suppress only this specific, known-
// harmless rejection so it doesn't look like a crash in the console.
window.addEventListener('unhandledrejection', (event) => {
  const isPointerLockCooldown =
    event.reason?.name === 'SecurityError' &&
    /pointer lock/i.test(event.reason?.message ?? '')
  if (isPointerLockCooldown) event.preventDefault()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
