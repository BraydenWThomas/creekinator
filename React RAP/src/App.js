// React + css
import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useNavigate, Router } from 'react-router-dom';
import './App.css';

// Components
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
import Candidate from './Components/Candidate/Candidate'

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Button } from '@mui/material';
import Calendar from './Components/Calendar';
import CandidateApply from './Components/CandidateApply';


const FDMtheme = createTheme({
  typography:{
    fontFamily: "barlow",
  },

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
        }
      })
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
  }, {
    path: "/candidate",
    element: <Candidate />
  }
]

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
        path: "/candidate/update/:candidateId",
        element: <UpdateCandidate />
      },
      {
        path: "/candidate/info/:candidateID",
        element: <CandidateInformation />
      },
      {
        path: "/ac/view/:acId",
        element: <ViewAC />
      },
      {
        path: "/ac/view-upcoming/:acId",
        element: <ViewUpcomingAC />
      },
      {
        path: "/ac/update/:acId",
        element: <UpdateAC />
      },
      {
        path: "/ac/view-past/:acId",
        element: <ViewPastAC />
      },
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
        path: "/candidateinformation/:candidateId",
        element: <CandidateInformation />
      },
      {
        path: "/viewac/:acId",
        element: <ViewAC />
      })
  }

  

  const routerPage = createBrowserRouter(routes);

  const getCalendar = () => {
    window.location.href = "/calendar"
  }

  const getCandidate = () => {

    
    window.location.href = "/candidate"

  }

  return (

    <ThemeProvider theme={FDMtheme}>
      {/* <Button onClick={getCandidate}>Candidate</Button> */}
      
      <RouterProvider router={routerPage} />
    </ThemeProvider>
  )

}

export default App;
