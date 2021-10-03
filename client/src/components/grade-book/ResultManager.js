import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SingleSelect from '../other-components/SingleSelect';
import { terms, subjects } from '../../libs/subjects';
import { sessions, classStream } from '../../libs/session-array';
import { classes } from '../../libs/students-data';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles({
    flexBox: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    flexItem: {
        margin: '0px 10px',
        color: 'blue',
    },
    btnDiv: {
        margin: '0px 10px',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: 'auto auto',
        gap: 0,
        color: 'forestgreen',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
})
const sessionsList = sessions();
const classStreams = classStream();
const ResultManager = ({ vSession, onSubmit, vTerm, vClass, onValueChange, vStream, vSubject, withSubject }) => {
    const styles = useStyles();

    return (
        <form className={styles.flexContainer} onSubmit={onSubmit} >
            <div className={styles.flexBox}>
                <div className={styles.flexItem}>
                    <SingleSelect
                        listOptions={sessionsList}
                        label="Session"
                        labelId="academic"
                        name="session"
                        value={vSession}
                        onChange={onValueChange}
                        className={styles.flexItem}
                        fullWidth={false}
                        variant={'standard'}
                    />
                </div>
                <div className={styles.flexItem}>
                    <SingleSelect
                        listOptions={terms}
                        label="Term"
                        labelId="term"
                        name="term"
                        value={vTerm}
                        onChange={onValueChange}
                        className={styles.flexItem}
                        fullWidth={false}
                        variant={'standard'}
                    />
                </div>
            </div>
            <div className={styles.flexBox}>
                <div className={styles.flexItem}>
                    <SingleSelect
                        listOptions={classes}
                        label="Class"
                        labelId="classes"
                        name="class_name"
                        value={vClass}
                        onChange={onValueChange}
                        className={styles.flexItem}
                        fullWidth={false}
                        variant={'standard'}
                    />
                </div>
                <div className={styles.flexItem}>
                    <SingleSelect
                        listOptions={classStreams}
                        label="Stream"
                        labelId="stream"
                        name="class_stream"
                        value={vStream}
                        onChange={onValueChange}
                        className={styles.flexItem}
                        fullWidth={false}
                        variant={'standard'}
                    />
                </div>
                {
                    withSubject &&
                    (<div className={styles.flexItem}>
                        <SingleSelect
                            listOptions={subjects}
                            label="Subject"
                            labelId="subject"
                            name="subject"
                            value={vSubject}
                            onChange={onValueChange}
                            variant='standard'
                            fullWidth={false}
                        />
                    </div>)
                }
                
            </div>
            <div className={styles.btnDiv}>
                <Button size='small' variant='outlined' type='submit' style={{ color: 'forestgreen', borderColor: 'forestgreen' }} startIcon={<AddBoxIcon style={{ color: 'forestgreen' }} />} >
                    add
                </Button>
            </div>
        </form>
    )
}


ResultManager.prototype = {
    vSession: PropTypes.string.isRequired,
    vTerm: PropTypes.string.isRequired,
    vClass: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    vStream: PropTypes.string.isRequired,
}

export default ResultManager
