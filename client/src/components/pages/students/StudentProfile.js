import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudent } from '../../../redux/actions/student-action';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import StudentProfileData from './StudentProfileData'
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyle = makeStyles({
    backBtn: {
        position: 'fixed',
        bottom: '25vh',
        right: '10vw',
        zIndex: 10,
        color: 'purple',
    }
})


const StudentProfile = () => {
    const classes = useStyle();
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { student } = useSelector(state => state.student);
    useEffect(() => {
        if (id) {
            dispatch(fetchStudent(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (student.isFetchingStudents || (!student.data && !student.error)) {
        return (
            <DataFetchingProgress />
        )
    } else {
        return (
            <>
                <StudentProfileData profileData={student} />
                <IconButton onClick={() => history.push('/admin/students/list')} className={classes.backBtn}> <ArrowBackIosIcon /> </IconButton>
            </>
        )
    }
}

export default StudentProfile
