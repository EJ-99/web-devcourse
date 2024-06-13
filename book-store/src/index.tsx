import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StyleSheetManager } from 'styled-components';

async function mountApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mock/browser');
    await worker.start();
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <StyleSheetManager shouldForwardProp={() => true}>
        <App />
      </StyleSheetManager>
    </React.StrictMode>
  );
}

mountApp();
