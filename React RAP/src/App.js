// React + css
import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useNavigate, Router } from 'react-router-dom';
import './App.css';

// Webpage Components
// User dashboards
import AdminDashboard from './Components/AdminDashboard';
import Recruiter from './Components/Recruiters/Recruiter';
import Interviewer from './Components/Interviewers/Interviewer';
import Candidate from './Components/Candidate/Candidate'
// AC
import ViewAC from './Components/Interviewers/ViewAC';
import ViewUpcomingAC from './Components/Recruiters/ViewUpcomingAC';
import ViewPastAC from './Components/Recruiters/ViewPastAC';
import CreateAC from './Components/Recruiters/CreateAC';
import UpdateAC from './Components/Recruiters/UpdateAC';
import CreateSalesInterview from './Components/Recruiters/CreateSalesInterview'
import CreateTechnicalInterview from './Components/Recruiters/CreateTechnicalInterview'
// Candidate
import CandidateInformationRec from './Components/Candidate/CandidateInformationRec';
import CandidateInformationInterview from './Components/Candidate/CandidateInformationInterview';
import CreateCandidate from './Components/Candidate/CreateCandidate';
import UpdateCandidate from './Components/Candidate/UpdateCandidate';
import CandidateApply from './Components/CandidateApply';
// UI Functionality
import LoginPage from './Components/LoginPage';
import Calendar from './Components/Calendar';

// Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

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
        path: "/recruiter/candidate/create",
        element: <CreateCandidate />
      },
      {
        path: "/recruiter/candidate/update/:candidateId",
        element: <UpdateCandidate />
      },
      {
        path: "/recruiter/candidate/info/:candidateId",
        element: <CandidateInformationRec />
      },
      {
        path: "/recruiter/ac/view-upcoming/:acId",
        element: <ViewUpcomingAC />
      },
      {
        path: "/recruiter/ac/update/:acId",
        element: <UpdateAC />
      },
      {
        path: "/recruiter/ac/view-past/:acId",
        element: <ViewPastAC />
      },
      {
        path: "/recruiter/ac/create",
        element: <CreateAC />
      },
      {
        path: "/recruiter/ac/update/schedule/sales/:acId",
        element: <CreateSalesInterview/>
      },
      {
        path: "/recruiter/ac/update/schedule/technical/:acId",
        element: <CreateTechnicalInterview/>
      }
    )
  }

  if (localStorage.getItem('status') == "ROLE_INTERVIEWER") {
    routes.push({
      path: "/interviewer",
      element: <Interviewer />
    },
      {
        path: "/interviewer/candidate/info/:candidateId",
        element: <CandidateInformationInterview />
      },
      {
        path: "/interviewer/ac/view/:acId",
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
