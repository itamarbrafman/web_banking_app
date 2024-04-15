import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import VerificationPage from './pages/VerificationPage'
import DashboardPage from './pages/Dashboard/DashboardPage'

const router = createBrowserRouter([
  {path: '/', element: <DashboardPage />},
  {path: '/signup', element: <SignUpPage />},
  {path: '/verification', element: <VerificationPage />}
]);

function App() {

  return <RouterProvider router={router} />
}

export default App