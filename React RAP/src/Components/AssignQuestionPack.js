import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
import './questionsPage.css'
import {
    Divider,
    TextField,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    FormControlLabel,
    Select,
    IconButton,
    Box,
    FormGroup,
    Checkbox,
    Typography,
    Avatar,
    Grid,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import { Title } from '@mui/icons-material';


const AssignQuestionPack = () => {
    const stream = "Software Dev";
    const interviewType = "Technical";
    const [questions, setQuestions] = useState([
        "1. Could you tell me about yourself and describe your background in brief?", 
        "2. How did you hear about this position?", 
        "3. What type of work environment do you prefer?", 
        "4. How do you deal with pressure or stressful situations?", 
        "5. Do you prefer working independently or on a team?", 
        "6. When you’re balancing multiple projects, how do you keep yourself organized?", 
        "7. What did you do in the last year to improve your knowledge?", 
        "8. What are your salary expectations?", 
        "9. Are you applying for other jobs?", 
        "10. From your resume it seems you took a gap year. Would you like to tell us why that was?"]);
    const [pack, setPack] = useState([]);

    const packLimit = 4;
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(questions.slice().fill(false));

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        var counter = 0;
        var tmp =[];
        
        for (var i = 0; i < isChecked.length; i++) {
            if (isChecked[i] == true) {
                counter = counter + 1
                tmp.push(questions[i])
                console.log(i);
            }
        }
        if (counter > packLimit) {
            setOpen(true)
            
        }else{
            setPack(tmp);
        }

    }
    
    console.log(isChecked);
    const toggleCheckboxValue = (index) => {
        setIsChecked(isChecked.map((v, i) => (i === index ? !v : v)));
    }
    

    return (
        <Box>
            <header>
                <div className='page-details'>
                    <h1 className='stream'>{stream}</h1>
                    <h1 className='interviewType'>{interviewType}</h1>
                </div>
                <div className='page-title'>
                    <h2 className='title'>Questions Pool</h2>
                </div>
            </header>
            <FormGroup>
                {questions.map((item, index) => (

                    <FormControlLabel
                        control={<Checkbox onClick={() => toggleCheckboxValue(index)} name={item.toString()} />} label={item} key={index} />
                ))}

            </FormGroup>

            { /*  */}
            <Button variant="contained" fullWidth onClick={handleSubmit}>
                Create
            </Button>
            <table>
                <tr>
                    
                    <th>Question body</th>
                </tr>
                {pack.map((val, key) => {
                    return (

                        <tr key={key}>
                            
                            <td>{val}</td>
                        </tr>
                    )
                })

                }
            </table>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Warning!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please allow 4 questions max
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog >
        </Box>

    );
};

export default AssignQuestionPack;