import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ResultManager from './ResultManager';
import { currentAcademicYear, currentTerm } from '../../libs/session-array';
import { useHistory } from 'react-router';
import FormFieldsValidator from '../../libs/form-fields-validator';
import { isEmptyArrayOrObject, alertMessageParser } from '../../libs/utility-functions';
import AlertMessage from '../other-components/AlertMessage';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewSessionClassModal = ({ open, onClose, path, withSubject, subjPerTeacher, ...props }) => {
    const initialClassState = {
        session: currentAcademicYear(),
        term: currentTerm(),
        class_name: 'jss1',
        class_stream: 'A',
        subject: '',
    };
    const initErrorState = { isError: false, errorMsg: null };
    const [classState, setClassState] = useState(initialClassState);
    const [errState, setErrState] = useState(initErrorState);
    const history = useHistory();

    const handleValueChange = e => {
        setClassState({ ...classState, [e.target.name]: e.target.value });
    }

    const onSubmit = () => {
        const formValidator = new FormFieldsValidator(classState)
        formValidator.field('session').isEmpty().withMessage('please choose the academic session');
        formValidator.field('class_name').isEmpty().withMessage('please choose students class');
        formValidator.field('term').isEmpty().withMessage('please choose the term');
        if (withSubject) {
            formValidator.field('subject').isEmpty().withMessage('Select a subject.');
        }
        const err = formValidator.errorMessage();

        if (!isEmptyArrayOrObject(err)) {
            setErrState({ isError: true, errorMsg: err });
            return;
        }

        history.push(withSubject ? `${path}/${classState.subject}` : path, classState);
        setClassState(initialClassState);
        onClose();
        setErrState(initErrorState);
    }

    const handleClose = () => {
        setClassState(initialClassState);
        onClose();
        setErrState(initErrorState);
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <>
                        {
                            errState && <AlertMessage severity='error' open={errState.isError} onClose={() => setErrState(initErrorState)} >{alertMessageParser(errState.errorMsg)}</AlertMessage>
                        }
                        <Typography align='center'>{props.children}</Typography>
                    </>

                </DialogTitle>
                <DialogContent>
                    <ResultManager
                        vTerm={classState.term}
                        vSession={classState.session}
                        vClass={classState.class_name}
                        vStream={classState.class_stream}
                        onValueChange={handleValueChange}
                        itemAlign='column'
                        withSubject={withSubject}
                        vSubject={classState.subject}
                        subjPerTeacher={subjPerTeacher}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit} color="primary">
                        OK
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewSessionClassModal
