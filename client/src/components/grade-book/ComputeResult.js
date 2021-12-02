import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ResultManager from './ResultManager';
import { currentAcademicYear, currentTerm } from '../../libs/session-array';
import FormFieldsValidator from '../../libs/form-fields-validator';
import { isEmptyArrayOrObject, alertMessageParser } from '../../libs/utility-functions';
import { computeResults, fetchResults } from '../../redux/actions/admin-action';
import AlertMessage from '../other-components/AlertMessage';

const useStyles = makeStyles(theme => ({
    btnDiv: {
        margin: '0px 10px',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'space-between',
        gridTemplateColumns: 'auto auto',
        gap: 5,
        color: 'forestgreen',
    },
    containerDiv: {
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    }
}));

const ComputResult = () => {
    const classes = useStyles();
    const initialState = {
        session: currentAcademicYear(),
        term: currentTerm(),
        class_name: 'jss1',
        class_stream: 'A',
    }

    const initErrorState = { isError: false, errorMsg: null }

    const [state, setState] = useState(initialState);
    const [errState, setErrState] = useState(initErrorState);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleValueChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        const formValidator = new FormFieldsValidator(state)
        formValidator.field('session').isEmpty().withMessage('please choose the academic session');
        formValidator.field('class_name').isEmpty().withMessage('please choose students class');
        formValidator.field('term').isEmpty().withMessage('please choose the term');
        const err = formValidator.errorMessage();

        if (!isEmptyArrayOrObject(err)) {
            setErrState({ isError: true, errorMsg: err });
            return;
        }

        dispatch(computeResults({
            session: state.session.replace('/', '_'),
            term: state.term,
            class_name: `${state.class_name}_${state.class_stream.toLowerCase()}`,
        }))
        setState(initialState);
        history.push("/admin/students/result-sheet", state);
    }

    const fetchResultSheet = () => {
        const formValidator = new FormFieldsValidator(state)
        formValidator.field('session').isEmpty().withMessage('please choose the academic session');
        formValidator.field('class_name').isEmpty().withMessage('please choose students class');
        formValidator.field('term').isEmpty().withMessage('please choose the term');
        const err = formValidator.errorMessage();

        if (!isEmptyArrayOrObject(err)) {
            setErrState({ isError: true, errorMsg: err });
            return;
        }

        dispatch(fetchResults({
            session: state.session.replace('/', '_'),
            term: state.term,
            class_name: `${state.class_name}_${state.class_stream.toLowerCase()}`,
        }))
        setState(initialState);
        history.push("/admin/students/result-sheet", state);
    }

    return (
        <div className={classes.containerDiv}>
            {
                errState && <AlertMessage severity='error' open={errState.isError} onClose={() => setErrState(initErrorState)} >{alertMessageParser(errState.errorMsg)}</AlertMessage>
            }
            <Typography variant='h6' align='center' >Please select the academic year and term to compute results</Typography>
            <ResultManager
                vTerm={state.term}
                vSession={state.session}
                vClass={state.class_name}
                vStream={state.class_stream}
                onValueChange={handleValueChange}
                itemAlign='column'
            />
            <div className={classes.btnDiv}>
                <Button size='small' onClick={handleSubmit} variant='outlined' type='submit' style={{ color: 'forestgreen', borderColor: 'forestgreen' }} startIcon={<AddBoxIcon style={{ color: 'forestgreen' }} />} >
                    create result sheet
                </Button>
                <Button size='small' onClick={fetchResultSheet} variant='outlined' type='submit' style={{ color: 'goldenrod', borderColor: 'goldenrod' }}  >
                    fetch result sheet
                </Button>
            </div>
        </div>
    )
}

export default ComputResult
