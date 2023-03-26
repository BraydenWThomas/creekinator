import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
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


const AssignQuestionPack = () => {
    const [questions, setQuestions] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const pack = []

    const packLimit = 4;
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(questions.slice().fill(false));

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        var counter = 0;
        for (var i = 0; i < isChecked.length; i++) {
            if (isChecked[i] == true) {
                counter = counter + 1
                pack.push(questions[i - 1])
            }
        }
        if (counter > packLimit) {
            setOpen(true);

        }
        console.log(pack);

    }

    const toggleCheckboxValue = (index) => {
        setIsChecked(isChecked.map((v, i) => (i === index ? !v : v)));
    }

    return (
        <Box>
            <FormGroup>
                {questions.map((item, index) => (

                    <FormControlLabel
                        control={<Checkbox onClick={() => toggleCheckboxValue(item)} name={item.toString()} />} label={item} key={index} />
                ))}



            </FormGroup>

            <Button variant="contained" fullWidth onClick={handleSubmit}>
                Create
            </Button>


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