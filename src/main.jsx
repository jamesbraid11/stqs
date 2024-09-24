import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styling
import './index.css'

// Page components
import App from './App.jsx'
import NewGame from './NewGame.jsx'

// Actions
import { registerAgent } from './utils/actions/stqs.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <NewGame />,
        action: async ({ request }) => registerAgent(request)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
