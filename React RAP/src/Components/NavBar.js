import React from 'react';
import fdm from './fdm-logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TuneIcon from '@mui/icons-material/Tune';
import './NavBar.css';

const NavBar = () => {
    return (
        <div>
            <nav className='NavSide' style={{ float: 'left', width: '200px', height: '1290px', borderRight: '1px solid black' }}>
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
