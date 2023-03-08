// Components
import NavBar from './NavBar';

// React
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

// Material UI
import { Avatar, Divider, Tab, Stack, Button, FormControl } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const ViewUpcomingAC = () => {
	// AC Details
	const [tabValue1, setTabValue1] = useState("1");
	const [tabValue2, setTabValue2] = useState("1");
	const [tabValue3, setTabValue3] = useState("1");
	const [tabValue4, setTabValue4] = useState("1");

	const handleChangeInterview1 = (event, newValue) => {
		setTabValue1(newValue);
	}

	const handleChangeInterview2 = (event, newValue) => {
		setTabValue2(newValue);
	}

	const handleChangeInterview3 = (event, newValue) => {
		setTabValue3(newValue);
	}

	const handleChangeInterview4 = (event, newValue) => {
		setTabValue4(newValue);
	}

  return (
		<div>
			<NavBar />

			<div className="Dashboard" style={{ float: 'left', width: '80%' }}>
				<h1> Upcoming Assessment Centre </h1>

				<Divider variant="middle" />

				<div className="ac-details" style={{ marginTop: '-0.5%' }}>
					<div style={{ float: 'left', width: '80%' }}>
						<h1> placeholder-ac-title </h1>
						<h2 style={{ marginLeft: '15pt', marginTop: '-5pt' }}> placeholder-date </h2>
					</div>

					<div style={{ float: 'left', width: '20%', marginTop: '4%' }}>
						<Stack direction="row" spacing={3}>
							<Avatar> J </Avatar>
							<h4 style={{ marginTop: '3%' }}> AC Coorindator: John Doe </h4>
						</Stack>
					</div>
				</div>

				<Divider variant="middle" />

				<div className="sales-interview" style={{ float: 'left', width: '100%' }}>
					<h2> Sales Interview </h2>

					<div style={{ float: 'left', width: '50%' }}>
						<h3> Interviewer 1 </h3>
						<TabContext value={tabValue1}>
							<TabList onChange={handleChangeInterview1}>
								<Tab value="1" label="John Doe" />
								<Tab value="2" label="John Doe" />
								<Tab value="3" label="John Doe" />
								<Tab value="4" label="John Doe" />
							</TabList>
							<TabPanel value="1">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="2">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="3">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="4">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
						</TabContext>
					</div>
					<div className="right-side" style={{ float: 'left', width: '50%' }}>
						<div style={{ float: 'left' }}>
							<h3> Interviewer 2 </h3>
							<TabContext value={tabValue2}>
							<TabList onChange={handleChangeInterview2}>
								<Tab value="1" label="John Doe" />
								<Tab value="2" label="John Doe" />
								<Tab value="3" label="John Doe" />
								<Tab value="4" label="John Doe" />
							</TabList>
							<TabPanel value="1">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="2">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="3">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="4">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
						</TabContext>
						</div>
					</div>
				</div>

				<div className="technical-interview" style={{ float: 'left', width: '100%' }}>
					<h2> Technical Interview </h2>

					<div style={{ float: 'left', width: '50%' }}>
						<h3> Interviewer 1 </h3>
						<TabContext value={tabValue3}>
							<TabList onChange={handleChangeInterview3}>
								<Tab value="1" label="John Doe" />
								<Tab value="2" label="John Doe" />
								<Tab value="3" label="John Doe" />
								<Tab value="4" label="John Doe" />
							</TabList>
							<TabPanel value="1">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="2">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="3">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="4">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
						</TabContext>
					</div>
					<div className="right-side" style={{ float: 'left', width: '50%' }}>
						<div style={{ float: 'left' }}>
							<h3> Interviewer 2 </h3>
							<TabContext value={tabValue4}>
							<TabList onChange={handleChangeInterview4}>
								<Tab value="1" label="John Doe" />
								<Tab value="2" label="John Doe" />
								<Tab value="3" label="John Doe" />
								<Tab value="4" label="John Doe" />
							</TabList>
							<TabPanel value="1">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="2">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="3">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
							<TabPanel value="4">
								<Button variant="contained"> View profile </Button>
								<Button variant="contained"> View interview form </Button>
							</TabPanel>
						</TabContext>
						</div>
					</div>
				</div>

				<Divider variant="middle" />

				<div className="interview-pack" style={{ float: 'left', width: '100%' }}>
					<h2> Interview Pack </h2>
					<FormControl sx={{ minWidth: '50%' }}>
						<Button variant="outlined"> Sales Pack A </Button>
					</FormControl>
					<FormControl sx={{ minWidth: '50%' }}>
						<Button variant="outlined"> Technical Pack A </Button>
					</FormControl>
				</div>

				<Divider />

				<div className="bottom-buttons" style={{ float: 'right', marginTop: '2%' }}>
					<Button variant="contained" sx={{ float: 'right' }}>
						Back
					</Button>

					<Button variant="contained" sx={{ float: 'right' }}>
						Update-show-up-for-ac-coordinator
					</Button>
				</div>
			</div>

		</div>
	)
}

export default ViewUpcomingAC;