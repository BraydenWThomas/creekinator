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
import handleClick from './Components/LoginPage';
import NavBar from './Components/NavBar';
import { Button } from '@mui/material';
import Calendar from './Components/Calendar';
import CandidateApply from './Components/CandidateApply';
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

  const handleClick = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body =
      JSON.stringify({
        "username": data.get('username'),
        "password": data.get('password')
      });

    const requestOptions = {
      headers: { 'content-type': 'application/json' },
      method: "POST",
      body: body,
      redirect: 'follow'
    };

    fetch(" http://localhost:8080/api/auth/signin", requestOptions)
      .then(response => response.json())
      .then(result => {

       

        if (result.username) {

          localStorage.setItem('status', result.roles[0])
          if (result.roles[0] == "ROLE_RECRUITER") {
            window.location.href = "/recruiter"
          }
          else if (result.roles[0] == "ROLE_INTERVIEWER") {
            window.location.href = "/interviewer"
          }


        }}) 
      .catch(error => console.log('error', error));






  };

  const routes = [{
    path: "/",
    element: <LoginPage onClick={handleClick} />
  },
  {
    path: "/apply",
    element: <CandidateApply />
  },
  {
    path: "/calendar",
    element: <Calendar />
  },
  {
    path: "/admin",
    element: <AdminDashboard />
  }]

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
      {
        path: "/candidate/create",
        element: <CreateCandidate />
      },
      {
        path: "/candidate/update/:candidateID",
        element: <UpdateCandidate />
      },
      {
        path: "/candidate/info/:candidateID",
        element: <CandidateInformation />
      },
      {
        path: "/viewac/:abc",
        element: <ViewAC />
      },
      {
        path: "/viewupcomingac/:abc",
        element: <ViewUpcomingAC />
      }
      ,
      {
        path: "/viewpastac/:abc",
        element: <ViewPastAC />
      }
      ,
      {
        path: "/createac",
        element: <CreateAC />
      }
    )
  }

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
        path: "/candidateinformation/:abc",
        element: <CandidateInformation />
      },
      {
        path: "/viewac/:abc",
        element: <ViewAC />
      })
  }

  const routerPage = createBrowserRouter(routes);

  const logout = () => {

    localStorage.removeItem('status');
    window.location.href = "/"

  }
  const getCalendar = () => {

    
    window.location.href = "/calendar"

  }

  return (
    <ThemeProvider theme={FDMtheme}>
      <Button onClick={logout}>LOGOUT</Button>
      <Button onClick={getCalendar}>Calendar</Button>
      <RouterProvider router={routerPage} />
    </ThemeProvider>
  )

}

export default App;
