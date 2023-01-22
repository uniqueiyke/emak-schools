import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootDiv:{
    padding: '5px 10px',
    borderBottom: '3px solid #3b0909',
    '&:last-of-type': {
      marginBottom: '10px',
    }
  },
  span: {
    fontStyle: 'italic',
    color: '#617931',
  },
  div: {
    color: '#047c6c',
  },
  hr: {
    border: '2px solid #3b0909',
    margin: 2,
  }
}))

const ParentContact = ({parent}) => {
  const styles = useStyles();
  return (
    <div className={styles.rootDiv}>
        <div className={styles.div}><span className={styles.span}>Name:</span> {parent.name.last_name} {parent.name.first_name}</div>
        <div className={styles.div}><span className={styles.span}>Phone Number:</span> {parent.phone_number}</div>
        <div className={styles.div}><span className={styles.span}>Email:</span> {parent.email}</div>
        <div className={styles.div}><span className={styles.span}>Relationship:</span> {parent.relationship}</div>
        <div className={styles.div}><span className={styles.span}>Child's Name:</span> {parent.children[0].name.last_name}, {parent.children[0].name.first_name} {parent.children[0].name.other_names}</div>
    </div>
  )
}

export default ParentContact;