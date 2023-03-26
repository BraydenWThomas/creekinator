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
  const [questions, setQuestions] = useState([1, 2, 3, 4])
  const [selectedValue, setSelectedValue] = useState(questions.slice().fill(1));
  const [totalValue, setTotalValue] = useState(0);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const handleChange = (index, item) => {

    setSelectedValue(selectedValue.map((v, i) => (i == index ? item : v)));

  };

  const controlProps = (item, index) => ({
    checked: selectedValue[index] == item,
    onChange: () => handleChange(index, item),

    value: item,
    inputProps: { 'aria-label': item },
  }
  );
  useEffect(() => {
    setTotalValue(selectedValue.reduce((a, v) => a = a + v, 0))

  }, [selectedValue]);

  return (
    <div className="pageSection">

      <NavBar />

      <div className='bodySection' style={{ marginLeft: "6%" }}>
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
        <div>
          
          {questions.map((question, index) => (<Box
            sx={{

              '& > :not(style)': {
                m: 1,
                width: '50%',

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
          </Box>
          ))


          }

          <h2>Total: {totalValue}</h2>
          <Box
            sx={{

              '& > :not(style)': {
                m: 1,
                width: '50%',

              }
            }}>
            <TextField

              id="outlined-multiline-flexible"
              label="Comment"
              multiline
              maxRows={4}
              variant="standard"


            />

          </Box>

        </div> 
        <Stack direction="column" spacing={2} sx={{marginTop: "2%"}}>
        <Button variant="contained">Submit</Button>
        <Button variant="contained" color='secondary' onClick={goBack}> Back </Button>
        
        </Stack>
        
      </div>
    </div>
  )
}

export default DisplayForm;