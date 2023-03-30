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


// const InterviewForm = () => {
//     const [questions, setQuestions] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//     const [pack, setPack] = useState([])
//     const [checkedItems, setCheckedItems] = useState({1: false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:false, 10:false});
//     const packLimit = 4;
//     const [open, setOpen] = useState(false);


//     const handleChange = (question) => {
//         setCheckedItems({ ...checkedItems, [question]: checkedItems.question && false });
//         console.log(checkedItems.question)
//         //setPack([...pack, question])
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };


//     const handleSubmit = () => {
//         if (pack.length > packLimit) {
//             setOpen(true)
//         }
//     }

    return (
        // <Box>
        //     <FormGroup>
        //         {questions.map((question, index) =>
        //             <FormControlLabel
        //                 control={<Checkbox onClick={handleChange(question)} name={question}/>} label={question} key={index} />
        //         )}

        //     </FormGroup>

        //     { /*  */}
        //     <Button variant="contained" fullWidth onClick={handleSubmit}>
        //         Create
        //     </Button>


        //     <Dialog
        //         open={open}
        //         onClose={handleClose}
        //         aria-labelledby="alert-dialog-title"
        //         aria-describedby="alert-dialog-description"
        //     >
        //         <DialogTitle id="alert-dialog-title">
        //             {"Warning!"}
        //         </DialogTitle>
        //         <DialogContent>
        //             <DialogContentText id="alert-dialog-description">
        //                 Please allow 4 questions max
        //             </DialogContentText>
        //         </DialogContent>
        //         <DialogActions>

        //             <Button onClick={handleClose} autoFocus>
        //                 Close
        //             </Button>
        //         </DialogActions>
        //     </Dialog >
        // </Box>

    );
};

export default InterviewForm;