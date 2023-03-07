import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Components/AdminDashboard';
import Recruiter from './Components/Recruiter';

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Recruiter />
    },
    {
      path:"/admin/:abc",
      element: <AdminDashboard />
    }
    
  ]);


  return (
    <RouterProvider router = {router} />

  )
}

export default App;
