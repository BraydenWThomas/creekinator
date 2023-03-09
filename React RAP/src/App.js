import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Components/AdminDashboard';
import Recruiter from './Components/Recruiter';
import Interviewer from './Components/Interviewer';
import CreateCandidate from './Components/CreateCandidate';
import UpdateCandidate from './Components/UpdateCandidate';
import CandidateInformation from './Components/CandidateInformation';
import ViewAC from './Components/ViewAC';
import ViewUpcomingAC from './Components/ViewUpcomingAC';

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <AdminDashboard />
    },
    {
      path:"/recruiter",
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
      path:"/viewupcomingac",
      element: <ViewUpcomingAC />
    }
    
  ]);


  return (
    <RouterProvider router = {router} />
  )

}

export default App;
