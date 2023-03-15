import { createBrowserRouter, RouterProvider, Navigate, useNavigate, Router } from 'react-router-dom';
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
import Candidate from './Components/Candidate/Candidate';

const FDMtheme = createTheme({
  palette: {
    primary: {
      main: '#6f00ff',
    },
    secondary: blue,
  },
});


const App = () => {


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
          localStorage.setItem('userId', result.id)
          if (result.roles[0] == "ROLE_RECRUITER") {
            window.location.href = "/recruiter"
          }
          else if (result.roles[0] == "ROLE_INTERVIEWER") {
            window.location.href = "/interviewer"
          }
          else if (result.roles[0] == "ROLE_CANDIDATE") {
            window.location.href = "/candidate"
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

  if (localStorage.getItem('status') == "ROLE_RECRUITER") {
    routes.push({
      path: "/recruiter",
      element: <Recruiter />
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

  if (localStorage.getItem('status') == "ROLE_INTERVIEWER") {
    routes.push({
      path: "/interviewer",
      element: <Interviewer />
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

  if (localStorage.getItem('status') == "ROLE_CANDIDATE") {
    routes.push( {
      path: "/candidate",
      element: <Candidate />
    })
  }

  

  const routerPage = createBrowserRouter(routes);

  const logout = () => {

    localStorage.removeItem('status');
    localStorage.removeItem('userId')
    window.location.href = "/"

  }
  const getCalendar = () => {
    window.location.href = "/calendar"
  }

  const getCandidate = () => {

    
    window.location.href = "/candidate"

  }

  return (

    <ThemeProvider theme={FDMtheme}>
      <Button onClick={logout}>LOGOUT</Button>
      <Button onClick={getCalendar}>Calendar</Button>
      <Button onClick={getCandidate}>Candidate</Button>
      
      <RouterProvider router={routerPage} />
    </ThemeProvider>
  )

}

export default App;
