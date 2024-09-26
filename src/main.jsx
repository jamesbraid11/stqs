import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styling
import './index.css'

// Page components
import App from './App.jsx'
import NewGame from './components/NewGame.jsx'
import ContinueGame from './components/ContinueGame.jsx'
import Contracts from './components/Contracts.jsx'

// Actions
import { acceptContract, loadAgent, registerAgent } from './utils/actions/stqs.js'

// Loaders
import { fetchContracts } from './utils/loaders/stqs.js'

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
      {
        path: '/contracts',
        element: <Contracts />,
        loader: fetchContracts,
        action: async ({ request }) => acceptContract(request)
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
