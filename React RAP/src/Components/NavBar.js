import React from 'react';
import fdm from './fdm-logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TuneIcon from '@mui/icons-material/Tune';

const NavBar = () => {
    return (
        <div className='navBar'>
            <nav className='NavSide' style={{ float: 'left', width: '20%', height: '10%'}}>
                <img src={fdm} alt="FDM Logo" />
                <h1>
                <a href='Dashboard'> <DashboardIcon /> Dashboard </a>
                <a href='Calendar'> <CalendarMonthIcon /> Calendar </a>
                <a href='Settings'> <TuneIcon /> Settings</a>
                </h1>
            </nav>
        </div>
    )
}

export default NavBar;
