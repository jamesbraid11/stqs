import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Styling
import './styles/main.scss';

// Page components
import App from './App.tsx';
import NewGame from './components/NewGame.tsx';
import ContinueGame from './components/ContinueGame.tsx';
import Contracts from './components/Contracts.tsx';

// Actions
import { acceptContract, fetchAgent, registerAgent } from './utils/actions/stqs.ts';

// Loaders
import { fetchContracts } from './utils/loaders/stqs.ts';

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
        action: async ({ request }) => fetchAgent(request)
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
