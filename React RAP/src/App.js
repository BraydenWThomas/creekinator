// React + css
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// Componenets
import AdminDashboard from './Components/AdminDashboard';
import Recruiter from './Components/Recruiters/Recruiter';
import Interviewer from './Components/Interviewers/Interviewer';
import CreateCandidate from './Components/Candidate/CreateCandidate';
import UpdateCandidate from './Components/Candidate/UpdateCandidate';
import CandidateInformation from './Components/Candidate/CandidateInformation';
import ViewAC from './Components/Interviewers/ViewAC';
import ViewUpcomingAC from './Components/Recruiters/ViewUpcomingAC';
import ViewPastAC from './Components/Recruiters/ViewPastAC';
import CreateAC from './Components/Recruiters/CreateAC';
import UpdateAC from './Components/Recruiters/UpdateAC';
import LoginPage from './Components/LoginPage';

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

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

    // Users
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

    // User webpages

    // Candidates
    {
      path:"/candidate/create",
      element: <CreateCandidate />
    },
    {
      path: "/candidate/info/:candidateId",
      element: <CandidateInformation />
    },
    {
      path:"/candidate/update/:candidateId",
      element: <UpdateCandidate />
    },

    // AC Info
    {
      path:"/ac/view/:abc",
      element: <ViewAC />
    },
    {
      path:"/ac/view-upcoming/:acId",
      element: <ViewUpcomingAC />
    },
    {
      path:"/ac/view-past/:acId",
      element: <ViewPastAC />
    },
    {
      path:"/ac/create",
      element: <CreateAC />
    },
    {
      path:"/ac/update/:acId",
      element: <UpdateAC />
    }
    
  ]);

  return (
    <ThemeProvider theme={FDMtheme}>
    <RouterProvider router = {router} />
    </ThemeProvider>
  )

}

export default App;
