import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './contexts/Tasks/authcontext' 
import { TodosProvider } from './contexts/Tasks' 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
    
      <TodosProvider>
     
        <App />
      </TodosProvider>
    </AuthProvider>
  </React.StrictMode>,
)

reportWebVitals()
