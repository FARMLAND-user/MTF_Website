
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Fatal: Root element not found in DOM.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("METAFOR CORE: Initialized Successfully.");
  } catch (error) {
    console.error("METAFOR CORE: Failed to mount application.", error);
    // 화면에 직접 에러 표시 (Fallback)
    rootElement.innerHTML = `
      <div style="padding: 40px; color: #FF5E00; font-family: 'Anton', sans-serif; text-align: center;">
        <h1 style="font-size: 24px;">INITIALIZATION FAILED</h1>
        <p style="color: white; font-family: sans-serif; font-size: 14px; opacity: 0.6; margin-top: 10px;">
          The system encountered a runtime error during core startup.
        </p>
      </div>
    `;
  }
}
