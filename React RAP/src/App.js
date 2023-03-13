import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Components/AdminDashboard';
import Recruiter from './Components/Recruiters/Recruiter';
import Interviewer from './Components/Interviewers/Interviewer';
import CreateCandidate from './Components/Candidate/CreateCandidate';
import UpdateCandidate from './Components/Candidate/UpdateCandidate';
import CandidateInformation from './Components/Candidate/CandidateInformation';
import ViewAC from './Components/Interviewers/ViewAC';
import ViewUpcomingAC from './Components/Recruiters/ViewUpcomingAC';
import ViewPastAC from './Components/Recruiters/ViewPastAC';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import LoginPage from './Components/LoginPage';


const FDMtheme = createTheme({
  // typography:{
  //   fontFamily: [
  //     'Barlow',
  //     'sans-serif'
  // ].join(','),
  // },

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
      path:"/recruiter",
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
