import { createBrowserRouter, RouterProvider, redirect, Navigate } from 'react-router-dom';
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
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import LoginPage from './Components/LoginPage';
import handleClick from './Components/LoginPage';
import NavBar from './Components/NavBar';
import { Button } from '@mui/material';

const FDMtheme = createTheme({
  palette: {
    primary: {
      main: '#6f00ff',
    },
    secondary: blue,
  },
});


const App = () => {






  // const routerInterview = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Interviewer />
  //   },
  //   {
  //     path: "/interviewer",
  //     element: <Interviewer />
  //   }, {
  //     path: "/candidateinformation/:abc",
  //     element: <CandidateInformation />
  //   },
  //   {
  //     path: "/viewac/:abc",
  //     element: <ViewAC />
  //   }, 
  //   {
  //     path: "/login",
  //     element: <LoginPage />
  //   }
  // ]);


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [checkin, setCheckIn] = useState("null");
  
  // useEffect(() => {


  //   const body =
  //     JSON.stringify({
  //       "username": username,
  //       "password": password
  //     });

  //   const requestOptions = {
  //     headers: { 'content-type': 'application/json' },
  //     method: 'POST',
  //     body: body,
  //     redirect: 'follow'
  //   };

  //   fetch(" http://localhost:8080/api/auth/signin", requestOptions)
  //     .then(response => response.json())
  //     .then(result => result.username ? setCheckIn(result) : setCheckIn("null"))
  //     .catch(error => console.log('error', error));

  //   if (checkin != "null") {
  //     setAccessToken(checkin.roles[0])


  //     setCheckIn("null")

  //   }
  // }, [])
  useEffect(() => {


    if (checkin !== "null") {

      setAccessToken(checkin.roles[0]);

    }
  }, [checkin]);

  const handleClick = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setUsername(data.get('username'));
    setPassword(data.get('password'));

    console.log(username)

    console.log(password)


    setTimeout(function () {
      refreshPage()
    }.bind(this), 100)


    localStorage.setItem('status', true);
    console.log("Local storage: " + localStorage.getItem('status'))
    console.log(accessToken)
    //setCheckIn("null")

  };


  const refreshPage = () => {

    const body =
      JSON.stringify({
        "username": username,
        "password": password
      });

    const requestOptions = {
      headers: { 'content-type': 'application/json' },
      method: "POST",
      body: body,
      redirect: 'follow'
    };

    fetch(" http://localhost:8080/api/auth/signin", requestOptions)
      .then(response => response.json())
      .then(result => result.username ? setCheckIn(result) : setCheckIn("null"))
      .catch(error => console.log('error', error));


  }

  const routerRecruit = createBrowserRouter([
    {
          path: "/",
          element: <LoginPage onClick={handleClick}/>,
          children: [
            localStorage.getItem('status') === "true" ? {
              path: "/recruiter",
              element: <Recruiter />
            }: {
              path: "/interviewer",
              element: <Interviewer />
            }

          ]
        },

   
    ,
    {
      path: "/createcandidate",
      element: <CreateCandidate />
    },
    {
      path: "/updatecandidate",
      element: <UpdateCandidate />
    },
    {
      path: "/candidateinformation/:abc",
      element: <CandidateInformation />
    },
    {
      path: "/recruiter/viewac/:abc",
      element: <ViewAC />
    },
    {
      path: "/recruiter/viewupcomingac/:abc",
      element: <ViewUpcomingAC />
    }
    ,
    {
      path: "/recruiter/viewpastac/:abc",
      element: <ViewPastAC />
    }
    ,
    {
      path: "/recruiter/createac",
      element: <CreateAC />
    }
  ]);
  const logout = () => {


    //console.log("log out")
    localStorage.setItem('status', false);
    //setAccessToken("");
    //setCheckIn("null")
    return redirect("/")
   // window.history.replaceState(null, '', '/');
   
   
    // history.push('/login');
  }

  return (

    <ThemeProvider theme={FDMtheme}>

      <Button onClick={logout}>LOGOUT</Button>

      <RouterProvider router={routerRecruit} />
    </ThemeProvider>
  )

}

export default App;
