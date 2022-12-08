import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormFieldsValidator from '../../libs/form-fields-validator';
import { isEmptyArrayOrObject, alertMessageParser } from '../../libs/utility-functions';
import AlertMessage from '../other-components/AlertMessage';
import ResultManager from './ResultManager';
import { currentAcademicYear, currentTerm } from '../../libs/session-array';
import { resultChecker } from '../../redux/actions/student-action';
import { setPageTitle } from '../../libs/utility-functions';

const useStyles = makeStyles({
    flexBox: {
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center',
        flexDirection: 'column',
        paddingLeft: 18,
        paddingRight: 2,
    },
    flexItem: {
        // marginLeft: 20,
        // marginRight: 200,
    },
    emphasis: {
        color: '#58d3f1',
        fontWeight: 'bolder',
    },
    bolder: {
        fontWeight: 'bolder',
    },
    warning: {
        color: '#f5f5f5',
        backgroundColor: '#c5b311',
        fontSize: '13px',
        padding: '5px 10px',
        lineHeight: '12px',
        fontWeight: 'bolder',
    }
})

const ResultCheckerForm = () => {
    setPageTitle('Result Checker');
    const styles = useStyles();

    const initialClassState = {
        session: currentAcademicYear(),
        term: currentTerm(),
        class_name: 'jss1',
        class_stream: 'A',
        serial_number: '',
        pin: '',
        reg_number: '',
    };
    const initErrorState = { isError: false, errorMsg: null };
    const [stateValue, setStateValue] = useState(initialClassState);
    const [errState, setErrState] = useState(initErrorState);
    const history = useHistory();
    const dispatch = useDispatch()

    const handleValueChange = e => {
        setStateValue({ ...stateValue, [e.target.name]: e.target.value });
    }

    const onSubmit = () => {
        const formValidator = new FormFieldsValidator(stateValue)
        formValidator.field('session').isEmpty().withMessage('please choose the academic session');
        formValidator.field('class_name').isEmpty().withMessage('please choose students class');
        formValidator.field('term').isEmpty().withMessage('please choose the term');
        formValidator.field('pin').trim().matchPattern(/^\d{5,}$/).withMessage('pin is not valid');
        formValidator.field('pin').isEmpty().withMessage('pin is required');
        formValidator.field('serial_number').isEmpty().withMessage('provide the card serial number');
        formValidator.field('reg_number').trim().matchPattern(/^\d\d\d\d\/ES\d{3,4}$/i).withMessage('Enter a valide Reggistration Number');
        formValidator.field('reg_number').isEmpty().withMessage('Enter your registration number');
        const err = formValidator.errorMessage();

        if (!isEmptyArrayOrObject(err)) {
            setErrState({ isError: true, errorMsg: err });
            return;
        }

        const val = {
            session: stateValue.session.replace('/', '_'),
            term: stateValue.term,
            class_name: `${stateValue.class_name}_${stateValue.class_stream.toLowerCase()}`,
            serial_number: stateValue.serial_number.toUpperCase().trim(),
            pin: stateValue.pin.trim(),
            reg_number: stateValue.reg_number.toUpperCase().trim(),
        }
        dispatch(resultChecker(val));
        setStateValue(initialClassState);
        setErrState(initErrorState);
        history.push('/student/result-checker/result-slip', {
            session: stateValue.session,
            term: stateValue.term,
            class_name: stateValue.class_name,
            class_stream: stateValue.class_stream,
        });
    }

    return (<>
        {
            errState && <AlertMessage severity='error' open={errState.isError} onClose={() => setErrState(initErrorState)} >{alertMessageParser(errState.errorMsg)}</AlertMessage>
        }
        <Typography variant='subtitle1'>
            Please provide the <em className={styles.bolder}>correct</em> <em className={styles.emphasis}>academic year</em>, <em className={styles.emphasis}>term</em> and <em className={styles.emphasis}>class</em> including your class stream to get your results for the term.<br />
            <span className={styles.bolder}>Make sure your <em style={{color: '#a53838'}}>registration number</em> is correct</span>.<br /> 
            Provide the <span className={styles.bolder}>correct</span> <em style={{color: '#f54b4b', fontWeight: 'bolder'}}>pin</em> with matching <em style={{color: '#a37602', fontWeight: 'bolder'}}>serial number</em> as it is on your card.
            <div className={styles.warning}>
                For a better printing experience, it is advisable to check the result with a laptop or  a desktop computer not mobile device.
                <br/>
                <br/>
                It is also advisable to use Google Chrome browser, mainly when using mobile device to check result.
            </div>
        </Typography>
        <div className={styles.flexBox}>
            <FormControl fullWidth className={styles.flexItem}>
                <TextField
                    name='reg_number'
                    label='Reg. Number'
                    required
                    helperText={(errState.isError && errState.errorMsg.reg_number) && errState.errorMsg.reg_number}
                    value={stateValue.reg_number}
                    onChange={handleValueChange}
                    error={(errState.isError && errState.errorMsg.reg_number) ? true : false}
                    type='text'
                    placeholder='2012/ES001'
                />
            </FormControl>
            <FormControl fullWidth className={styles.flexItem}>
                <TextField
                    name='pin'
                    label='Pin'
                    required
                    helperText={(errState.isError && errState.errorMsg.pin) && errState.errorMsg.pin}
                    value={stateValue.pin}
                    onChange={handleValueChange}
                    error={(errState.isError && errState.errorMsg.pin) ? true : false}
                    type='password'
                />
            </FormControl>
            <FormControl fullWidth className={styles.flexItem}>
                <TextField
                    name='serial_number'
                    label='Serial Number'
                    required
                    helperText={(errState.isError && errState.errorMsg.serial_number) && errState.errorMsg.serial_number}
                    value={stateValue.serial_number}
                    onChange={handleValueChange}
                    error={(errState.isError && errState.errorMsg.serial_number) ? true : false}
                    type='text'
                />
            </FormControl>
        </div>
        <ResultManager
            vTerm={stateValue.term}
            vSession={stateValue.session}
            vClass={stateValue.class_name}
            vStream={stateValue.class_stream}
            onValueChange={handleValueChange}
            itemAlign='column'
        />
        <div >
            <Button size='small' onClick={onSubmit} variant='outlined' type='submit' >
                get result
            </Button>

        </div>
    </>)
}

export default ResultCheckerForm;