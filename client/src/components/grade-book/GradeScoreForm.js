import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';

const useStyle = makeStyles({
    formField: {
        marginTop: 5,
        marginBottom: 5
    },
    btnColor: {
        color: '#008800',
        borderColor: '#008800',
        borderStyle: 'solid',
    },
})

const GradeScoreForm = () => {

    const classes = useStyle();

    const initialScore = {
        first_quiz: '0',
        second_quiz: '0',
        third_quiz: '0',
        c_a: '0',
        exam: '0',

    };
    const [scores, setScores] = useState(initialScore);

    const validateNumberInput = (value = '', min = 0, max = 10) => {
        if (value < min || value > max) {
            return '0';
        }
        return value;
    }

    const validFields = (name, value) => {
        if (name === 'exam') {
            return validateNumberInput(value, 0, 60);
        }
        return validateNumberInput(value);
    }
    const handleScoreChange = e => {
        setScores({ ...scores, [e.target.name]: validFields(e.target.name, e.target.value) });
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(scores);
        setScores(initialScore)
    }
    return (
        <div>
            <Typography align='center'>Name Goes Here</Typography>
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth className={classes.formField}>
                <TextField name="first_quiz"
                    label="First Quiz"
                    value={scores.first_quiz}
                    onChange={handleScoreChange}
                    variant="outlined"
                    type='number'
                    size='small'
                    inputProps={{
                        min: 0,
                        max: 10,
                    }}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formField} >
                <TextField name="second_quiz"
                    label="Second Quiz"
                    value={scores.second_quiz}
                    onChange={handleScoreChange}
                    variant="outlined"
                    type='number'
                    size='small'
                    inputProps={{
                        min: 0,
                        max: 10,
                    }}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formField} >
                <TextField name="third_quiz"
                    label="Third Quiz"
                    value={scores.third_quiz}
                    onChange={handleScoreChange}
                    variant="outlined"
                    type='number'
                    size='small'
                    inputProps={{
                        min: 0,
                        max: 10,
                    }}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formField} >
                <TextField name="c_a"
                    label="Assessments"
                    value={scores.c_a}
                    onChange={handleScoreChange}
                    variant="outlined"
                    type='number'
                    size='small'
                    inputProps={{
                        min: 0,
                        max: 10,
                    }}
                />
            </FormControl>
            <FormControl fullWidth className={classes.formField} >
                <TextField name="exam"
                    label="Exam"
                    value={scores.exam}
                    onChange={handleScoreChange}
                    variant="outlined"
                    type='number'
                    size='small'
                    inputProps={{
                        min: 0,
                        max: 60,
                    }}
                />
            </FormControl>

            <Button
             variant='outlined' 
             className={classes.btnColor} 
             type='submit' size='small'
             endIcon={<SaveIcon />}
             >Save</Button>
        </form>
        </div>
    )
}

export default GradeScoreForm
