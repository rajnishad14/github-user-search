import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { GithubProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'
import 'dotenv/config'
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT}
      redirectUri={window.location.origin}
      CacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
