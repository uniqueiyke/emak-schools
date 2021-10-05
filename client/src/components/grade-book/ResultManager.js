import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SingleSelect from '../other-components/SingleSelect';
import { terms, subjects } from '../../libs/subjects';
import { sessions, classStream } from '../../libs/session-array';
import { classes } from '../../libs/students-data';


const useStyles = makeStyles({
    flexBox: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: props => props.itemAlign || 'row',
        textAlign: 'center'
    },
    flexItem: {
        margin: '0px 10px',
        color: 'blue',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '15px 0px',
    },
})
const sessionsList = sessions();
const classStreams = classStream();
const ResultManager = ({ vSession, vTerm, vClass, onValueChange, vStream, vSubject, withSubject, ...props }) => {
    const styles = useStyles(props);

    return (
        <div className={styles.flexContainer} >
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
        </div>
    )
}


ResultManager.prototype = {
    vSession: PropTypes.string.isRequired,
    vTerm: PropTypes.string.isRequired,
    vClass: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    vStream: PropTypes.string.isRequired,
}

export default ResultManager
