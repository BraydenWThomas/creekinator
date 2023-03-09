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
import ViewPastAC from './Components/ViewPastAC';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import LoginPage from './Components/LoginPage';


const FDMtheme = createTheme({
  palette: {
    primary: {
      main: '#6f00ff',
    },
    secondary: blue,
  },
});

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <LoginPage />
    },
    {
      path:"/Recruiter",
      element: <Recruiter />
    },
   
    {
      path:"/interviewer",
      element: <Interviewer />
    },

    {
      path:"/admin",
      element: <AdminDashboard />
    },
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
      path:"/viewupcomingac/:abc",
      element: <ViewUpcomingAC />
    }
    ,
    {
      path:"/viewpastac/:abc",
      element: <ViewPastAC />
    }
    
  ]);


  return (
    <ThemeProvider theme={FDMtheme}>
    <RouterProvider router = {router} />
    </ThemeProvider>
  )

}

export default App;
