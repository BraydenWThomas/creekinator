// Components
import './Styling/RecruiterStyles.css';
import './Styling/NavBar.css';
// React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

// Material UI
import { Box, Button, Typography, TextField, Divider, Stack, FormControlLabel } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Radio from '@mui/material/Radio';
// Webpage Components
import NavBar from './NavBar';
const DisplayForm = () => {
  localStorage.setItem("status", "ROLE_RECRUITER")
  const performanceQuestions = ["How was their ability to organise their language?", "How well did they communicate their answers?", "How was their non verbal communication skills"]
  const [questions, setQuestions] = useState([1, 2, 3, 4])
  const [selectedValue, setSelectedValue] = useState(questions.slice().fill(1));
  const [selectedValueComm, setSelectedValueComm] = useState(questions.slice().fill(1));
  const [performanceValue, setPerformanceValue] = useState(performanceQuestions.slice().fill(0));
  const [totalValue, setTotalValue] = useState(0);
  const [performanceTotal, setPerformanceTotal] = useState(0);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const handleChange = (index, item) => {

    setSelectedValue(selectedValue.map((v, i) => (i == index ? item : v)));

  };
  const handleChangeComm = (index, item) => {

    setSelectedValueComm(selectedValueComm.map((v, i) => (i == index ? item : v)));

  };
  const handlePerformance = (index, item) => {

    setPerformanceValue(performanceValue.map((v, i) => (i == index ? item : v)));

  };

  const controlProps = (item, index) => ({
    checked: selectedValue[index] == item,
    onChange: () => handleChange(index, item),

    value: item,
    inputProps: { 'aria-label': item },
  }

  );

  const controlPropsComm = (item, index) => ({
    checked: selectedValueComm[index] == item,
    onChange: () => handleChangeComm(index, item),

    value: item,
    inputProps: { 'aria-label': item },
  })
  const controlPropsPerformance = (item, index) => ({
    checked: performanceValue[index] == item,
    onChange: () => handlePerformance(index, item),

    value: item,
    inputProps: { 'aria-label': item },
  })

  useEffect(() => {
    setTotalValue(selectedValue.reduce((a, v) => a = a + v, 0) + selectedValueComm.reduce((a, v) => a = a + v, 0))

  }, [selectedValue, selectedValueComm]);
  useEffect(() => {
    setPerformanceTotal(performanceValue.reduce((a, v) => a = a + v, 0))

  }, [performanceValue]);

  return (
    <div className="pageSection">

      <NavBar />

      <div className='bodySection' style={{ marginLeft: "7%" }}>
        <Typography
          component="h1"
          variant="h3"
          mt={2}
          ml={2}
          sx={{ flex: 1 }}>
          Interview Form 1
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography
          component="h1"
          variant="h5"
          mt={2}
          ml={2}
          sx={{ flex: 1 }}>
          Stream: Science
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10%", width: "30%" }}>
            {questions.map((question, index) => (<Box
              sx={{

                '& > :not(style)': {
                  m: 1,
                  width: '100%',

                }
              }} key={index}>

              <h2>{question} dsfsdfsfsdffds</h2>

              <TextField

                id="outlined-multiline-flexible"
                label="Comment"
                multiline
                maxRows={4}


              />
              <div key={index}>
                <p>Answer Integrity</p>
                <FormControlLabel
                  value="bottom"
                  control={<Radio {...controlProps(1, index)} color="secondary" />}
                  label="Unsatisfactory"
                  labelPlacement="start"
                />

                <Radio {...controlProps(2, index)} color="secondary" />
                <Radio {...controlProps(3, index)} color="secondary" />
                <Radio {...controlProps(4, index)} color="secondary" />
                <FormControlLabel
                  value="bottom"
                  control={<Radio {...controlProps(5, index)} color="secondary" />}
                  label="Satisfactory"
                  labelPlacement="end"
                />

              </div>
              <div key={index}>
                <p>Communication Quality</p>
                <FormControlLabel
                  value="bottom"
                  control={<Radio {...controlPropsComm(1, index)} color="secondary" />}
                  label="Unsatisfactory"
                  labelPlacement="start"
                />

                <Radio {...controlPropsComm(2, index)} color="secondary" />
                <Radio {...controlPropsComm(3, index)} color="secondary" />
                <Radio {...controlPropsComm(4, index)} color="secondary" />
                <FormControlLabel
                  value="bottom"
                  control={<Radio {...controlPropsComm(5, index)} color="secondary" />}
                  label="Satisfactory"
                  labelPlacement="end"
                />

              </div>
            </Box>
            ))


            }

            <h2>Total: {totalValue}</h2>
          </div>



          <div style={{ marginRight: "10%", width: "30%" }}>
            <Box
              sx={{

                '& > :not(style)': {
                  m: 1,
                  width: '100%',


                }
              }}>
              {performanceQuestions.map((question, index) => (<Box
                sx={{

                  '& > :not(style)': {
                    m: 1,
                    width: '100%',

                  }
                }} key={index}>

                <h2>{question}</h2>

                <TextField

                  id="outlined-multiline-flexible"
                  label="Comment"
                  multiline
                  maxRows={4}


                />

                <div key={index}>

                  <FormControlLabel
                    value="bottom"
                    control={<Radio {...controlPropsPerformance(0, index)} color="secondary" />}
                    label="0"
                    labelPlacement="top"
                  />

                  <FormControlLabel
                    value="bottom"
                    control={<Radio {...controlPropsPerformance(5, index)} color="secondary" />}
                    label="5"
                    labelPlacement="top"
                  />


                  <FormControlLabel
                    value="bottom"
                    control={<Radio {...controlPropsPerformance(10, index)} color="secondary" />}
                    label="10"
                    labelPlacement="top"
                  />

                </div>
              </Box>
              ))


              }

              <h2>Total: {performanceTotal}</h2>
            </Box>
          </div>
        </div>



        <Stack direction="column" spacing={2} sx={{ marginTop: "2%" }}>
          <TextField

            id="outlined-multiline-flexible"
            label="Comment"
            multiline
            maxRows={4}
            variant="standard"
            width="500px"


          />
          <Button variant="contained">Submit</Button>
          <Button variant="contained" color='secondary' onClick={goBack}> Back </Button>

        </Stack>
      </div>

    </div>

  )
}

export default DisplayForm;