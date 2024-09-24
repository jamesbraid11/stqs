import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styling
import './index.css'

// Page components
import App from './App.jsx'
import NewGame from './components/NewGame.jsx'

// Actions
import { loadAgent, registerAgent } from './utils/actions/stqs.js'
import ContinueGame from './components/ContinueGame.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <NewGame />,
        action: async ({ request }) => registerAgent(request)
      },
      {
        path: '/continueGame',
        element: <ContinueGame />,
        action: async ({ request }) => loadAgent(request)
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
