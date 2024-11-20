import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { ClerkProvider } from '@clerk/clerk-react';

const CLERK_PUSLISHABLE_KEY = "pk_test_dXNlZnVsLXN0aW5ncmF5LTIuY2xlcmsuYWNjb3VudHMuZGV2JA"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUSLISHABLE_KEY}>
      <NextUIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextUIProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
