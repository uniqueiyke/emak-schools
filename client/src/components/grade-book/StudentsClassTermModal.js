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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const StudentsClassTermModal = ({ open, onClose, value, }) => {
    const initialClassState = {
        session: currentAcademicYear(),
        term: currentTerm(),
        class_name: 'jss1',
        class_stream: 'A',
    }
    const [classState, setClassState] = useState(initialClassState);
    const history = useHistory()

    const handleValueChange = e => {
        setClassState({ ...classState, [e.target.name]: e.target.value });
    }

    const onSubmit = () => {
        history.push("/admin/students/class-termly", classState);
        onClose();
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title"><Typography align='center'>Get list of students in the selected class, term and session</Typography></DialogTitle>
                <DialogContent>
                    <ResultManager
                        vTerm={classState.term}
                        vSession={classState.session}
                        vClass={classState.class_name}
                        vStream={classState.class_stream}
                        onValueChange={handleValueChange}
                        itemAlign='column'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit} color="primary">
                        OK
                    </Button>
                    <Button onClick={onClose} color="primary">
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StudentsClassTermModal
