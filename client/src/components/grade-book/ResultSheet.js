import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Errors from '../other-components/Errors';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import DataFetchingProgress from '../other-components/DataFetchingProgress';
import { isEmptyArrayOrObject, setPageTitle } from '../../libs/utility-functions'
import { subjectField } from '../../libs/subjects';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  btnDiv: {
    margin: '10px 10px',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: 'auto auto',
    gap: 0,
    color: 'forestgreen',
  },
  regNumTCell: {
    position: 'sticky',
    textDecoration: 'underline',
    color: '#b14456',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  tRow: {
    position: 'relative',
  },
  btnCancel: {
    color: '#003333',
    borderColor: '#003333',
    borderStyle: 'solid',
  },
  subjectTitle: {
    color: '#ee5522',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

const ResultSheet = () => {
  const classes = useStyles();

  const history = useHistory()
  const location = useLocation();
  const results = useSelector(state => state.admin.results);

  setPageTitle(`${location.state.class_name.toUpperCase()}${location.state.class_stream} - ${location.state.term.toUpperCase()} - ${location.state.session} Result Sheet`);
  
  const { data, error, isFetchingResultSheet, isComputingResults } = results;
  let subjectKeys;
  if(data){
    subjectKeys = Object.keys(data);
    // console.log(data[subjectKeys[0]].subjects)
  }
  
  if(isFetchingResultSheet || isComputingResults ){
    return <DataFetchingProgress />
  } else
  return (
    <>
      {error && <Errors errors={error} goBack />}
      {!isEmptyArrayOrObject(data) && (<>
        <Typography align='center' variant='h5' >Result Sheet For {location.state.class_name.toUpperCase()} {location.state.class_stream.toUpperCase()}</Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="subjects table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tRow}>S/N</TableCell>
                <TableCell align="left">Reg Number</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">First Name</TableCell>
                {
                  (data && subjectKeys) && data[subjectKeys[0]].subjects
                  .sort((a, b) => parseInt(a.code) - parseInt(b.code))
                  .map((subj, i) =>{
                   return <TableCell key={subj._id} align="left" onClick={() =>  history.push(`/staff/dashboard/grade-book/${subj.title}`, {...location.state, subject: subj.title})} className={classes.subjectTitle}>{subjectField(subj.title, 'label')}</TableCell>}
                    )
                }
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Average</TableCell>
                <TableCell align="left">Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (data && subjectKeys) && (
                  subjectKeys
                  .sort((a, b) => data[b].result.average - data[a].result.average)
                  .map((s, i) => {
                    const {student, subjects, result} = data[s]
                    return(
                    <TableRow className={classes.tRow} key={student._id} onDoubleClick={() => history.push('/admin/students/result-slip', {id: student._id, ...location.state})}>
                      <TableCell >{i + 1}</TableCell>
                      <TableCell align="left" className={classes.regNumTCell} onClick={() => history.push('/admin/students/result-slip', {id: student._id, ...location.state})} >{student.reg_number}</TableCell>
                      <TableCell align="left">{student.name.last_name}</TableCell>
                      <TableCell align="left">{student.name.first_name} </TableCell>
                      {
                        subjects
                        .sort((a, b) => parseInt(a.code) - parseInt(b.code))
                        .map((subj, i) =>
                          <TableCell key={subj._id} align="center">{subj.total ? subj.total : ''}</TableCell>)
                      }
                      <TableCell align="center" component='td' >{result.total}</TableCell>
                      <TableCell align="center" component='td' >{result.average}</TableCell>
                      <TableCell align="center" component='td' >{result.position}</TableCell>
                    </TableRow>
                  )})
                )
              }
            </TableBody>
          </Table>
        </TableContainer >
      </>)}
      <Button
        variant='outlined'
        className={classes.btnCancel}
        size='small'
        onClick={() => history.goBack()}
      >Go Back
      </Button>
    </>
  );

}

export default ResultSheet
