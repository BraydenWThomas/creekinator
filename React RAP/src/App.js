import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Components/AdminDashboard';
import Recruiter from './Components/Recruiter';
import Interviewer from './Components/Interviewer';
import CreateCandidate from './Components/CreateCandidate';
import UpdateCandidate from './Components/UpdateCandidate';
import CandidateInformation from './Components/CandidateInformation';
import ViewAC from './Components/ViewAC';
import LoginPage from './Components/LoginPage';

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <AdminDashboard />
    },
    {
      path:"/Recruiter",
      element: <Recruiter />
    },
   
    {
      path:"/interviewer",
      element: <Interviewer />
    }
,
    {
      path:"/createcandidate",
      element: <CreateCandidate />
    },
    {
      path:"/updatecandidate",
      element: <UpdateCandidate />
    },
    {
      path:"/candidateinformation/:abc",
      element: <CandidateInformation />
    },
    {
      path:"/viewac/:abc",
      element: <ViewAC />
    },
    {
      path:"/login",
      element: <LoginPage />
    }
    
  ]);


  return (
    <RouterProvider router = {router} />
  )

}

export default App;
