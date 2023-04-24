import React, { useState, useEffect, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { updateGradeBookScore } from '../../redux/actions/staff-action';
import tokenConfig from '../../redux/actions/token-config';
import axios from 'axios';
import { subjectField } from '../../libs/subjects';
import { setPageTitle } from '../../libs/utility-functions';

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
    btnCancel: {
        color: '#ff2233',
        borderColor: '#ff2233',
        borderStyle: 'solid',
        marginRight: 10,
    },
    nameCl: {
        color: '#04558b',
        fontSize: 'medium',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    regCl: {
        color: '#5a390d',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
})

const GradeScoreForm = () => {

    const classes = useStyle();

    const initialScore = {
        first_quiz: '',
        second_quiz: '',
        third_quiz: '',
        c_a: '',
        exam: '',

    };
    const [scores, setScores] = useState(initialScore);
    const [disabled, setDisabled] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const { _id, reg_number, name, state } = location.state;

    setPageTitle(`${reg_number} - ${subjectField(state.subject, 'label')} Score Form`);
    
    const dbScoreRef = useRef(initialScore);

    const getDBScore = async () => {
        try {
            const responds = await axios({
                url: '/gradebooks/scores',
                method: 'GET',
                params: {
                    session: state.session.replace('/', '_'),
                    term: state.term,
                    class_name: `${state.class_name}_${state.class_stream.toLowerCase()}`,
                    subject: state.subject,
                    stu_id: _id,
                },
                headers: tokenConfig('application/json'),
            });
            return responds.data;
        } catch (errors) {
            return errors.response;
        }
    }

    useEffect(() => {
        getDBScore().then(data => {
            const dbScore = {
                first_quiz: data.first_quiz || '',
                second_quiz: data.second_quiz || '',
                third_quiz: data.third_quiz || '',
                c_a: data.c_a || '',
                exam: data.exam || '',

            };
            dbScoreRef.current = dbScore;
            setScores(dbScore)
        })
            .catch(err => { })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dispatch = useDispatch();


    const validateNumberInput = (value = '', min = 0, max = 10) => {
        if (value < min || value > max) {
            return '';
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
        if (
            scores.c_a === dbScoreRef.current.c_a &&
            scores.first_quiz === dbScoreRef.current.first_quiz &&
            scores.second_quiz === dbScoreRef.current.second_quiz &&
            scores.third_quiz === dbScoreRef.current.third_quiz &&
            scores.exam === dbScoreRef.current.exam
        ) {
            return;
        }
        dispatch(updateGradeBookScore({ scores, stu_id: _id, reg_number }, {
            session: state.session.replace('/', '_'),
            term: state.term,
            class_name: `${state.class_name}_${state.class_stream.toLowerCase()}`,
            subject: state.subject,
        }));

        setDisabled(true);
        dbScoreRef.current = scores;
        history.goBack();
    }

    return (
        <div>
            <Typography align='center' variant='h4' >{subjectField(state.subject, 'label')}</Typography>
            <Typography className={classes.nameCl} align='center'>{`${name.last_name}, ${name.first_name} ${name.other_names}`}</Typography>
            <Typography align='center'>Reg. Number: <span className={classes.regCl}>{reg_number}</span> </Typography>
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
                    />
                </FormControl>

                <Button
                    variant='outlined'
                    className={classes.btnColor}
                    type='submit' size='small'
                    endIcon={<SaveIcon />}
                    disabled={disabled}
                >Save</Button>
                <Button
                    variant='outlined'
                    className={classes.btnCancel}
                    size='small'
                    disabled={disabled}
                    onClick={() => history.goBack()}
                >Cancel
                </Button>
            </form>

        </div>
    )
}

export default GradeScoreForm
