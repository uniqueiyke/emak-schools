import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Button, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ResultManager from '../grade-book/ResultManager';
import { currentAcademicYear, currentTerm } from '../../libs/session-array';
import FormFieldsValidator from '../../libs/form-fields-validator';
import { isEmptyArrayOrObject, alertMessageParser } from '../../libs/utility-functions';
import AlertMessage from '../other-components/AlertMessage';

const useStyles = makeStyles(theme => ({
    btnDiv: {
        margin: '0px 10px',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: 'auto auto',
        gap: 0,
        color: 'forestgreen',
    },
}));

const CreateGradeBook = () => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const initialState = {
        session: currentAcademicYear(),
        term: currentTerm(),
        class_name: 'jss1',
        class_stream: 'A',
        subject: '',
    }

    const initErrorState = {isError: false, errorMsg: null}

    const [state, setState] = useState(initialState);
    const [errState, setErrState] = useState(initErrorState);
    // const dispatch = useDispatch();

    const handleValueChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        const formValidator = new FormFieldsValidator(state)
        formValidator.field('session').isEmpty().withMessage('please choose the academic session');
        formValidator.field('class_name').isEmpty().withMessage('please choose students class');
        formValidator.field('term').isEmpty().withMessage('please choose the term');
        formValidator.field('subject').isEmpty().withMessage('Select a subject.');
        const err = formValidator.errorMessage();

        if (!isEmptyArrayOrObject(err)) {
            setErrState({isError: true, errorMsg: err});
            return;
        }
        history.push(`/staff/dashboard/grade-book/${state.subject}`, state)
        setState(initialState);
    }

    return (
        <>
        {
            errState && <AlertMessage severity='error' open={errState.isError} onClose={() => setErrState(initErrorState)} >{alertMessageParser(errState.errorMsg)}</AlertMessage>
        }
        <Typography variant='h6' align='center' >Please select the academic year, term, class and the subject for the GradeBook</Typography>
            <ResultManager
                withSubject
                vSubject={state.subject}
                vTerm={state.term}
                vSession={state.session}
                vClass={state.class_name}
                vStream={state.class_stream}
                onValueChange={handleValueChange}
                itemAlign='column'
                subjPerTeacher={location.state.subjects}
            />
            <div className={classes.btnDiv}>
                <Button size='small' onClick={handleSubmit} variant='outlined' type='submit' style={{ color: 'forestgreen', borderColor: 'forestgreen' }} startIcon={<AddBoxIcon style={{ color: 'forestgreen' }} />} >
                    continue
                </Button>
            </div>
        </>
    )
}

export default CreateGradeBook
