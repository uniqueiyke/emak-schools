import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DataFetchingProgress from '../other-components/DataFetchingProgress';
import Errors from '../other-components/Errors';
import tokenConfig from '../../redux/actions/token-config';
import schLogo from '../../images/sch-logo-250x180.png';
import { getSchoolFromClass } from '../../libs/students-data'
// import placeHoderImg from '../../images/placeholder1.png';
import printResultSlip from '../../libs/print-result-slip';
const useStyles = makeStyles({
    container: {
        // padding: 0,
        // margin: 0,
    },
    thead: {
        backgroundColor: '#3f87a6',
        color: '#fff',
    },
    tbody: {
        backgroundColor: '#e4f0f5',
    },
    caption: {
        padding: 10,
        captionSide: 'bottom',
    },
    table: {
        borderCollapse: 'collapse',
        border: '2px solid rgb(200, 200, 200)',
        letterSpacing: 1,
        fontFamily: 'sans-serif',
        fontSize: '.8rem',
    },
    th: {
        border: '1px solid rgb(190, 190, 190)',
        padding: '5px 10px',
    },
    thr: {
        border: '1px solid rgb(190, 190, 190)',
        padding: '5px 10px',
        textAlign: 'left',
    },
    td: {
        textAlign: 'center',
        border: '1px solid rgb(190, 190, 190)',
        padding: '5px 10px',
    },
    titleDiv: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    titleP: {
        textAlign: 'center',
        fontFamily: 'Algerian, Arial, Helvetica, sans-serif',
        fontSize: '1rem',
        paddingTop: 10,
        textTransform: 'uppercase',
    },
    stuImgDiv: {
        border: 'solid 1px',
        height: 100,
        textAlign: 'center',
        maxHeight: 100,
    },
    cap: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 'bolder',
        textTransform: 'uppercase',
    },
    lowerCap: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 'bold',
    },
    subTitle: {
        fontWeight: 'bolder',
        color: 'goldenrod',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    nameSpan: {
        color: '#1d5a1d',
        fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    regSpan: {
        color: '#076374',
        fontWeight: 'bold',
    },
    otherSpan: {
        textTransform: 'uppercase',
    },
    outerGroup: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
    },
    outerGroup1: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
    },
    innerGroup: {
        justifySelf: 'end',
    },
    centerGroup: {
        justifySelf: 'center',
    },
    signSpan: {
        fontWeight: 'bolder',
    },
    mottoDiv: {
        display: 'grid',
        justifyContent: 'center',
        fontWeight: 'bolder',
        textTransform: 'uppercase',
        color: '#ffc0cbd2',
        fontSize: '1.1rem'

    }
})

const ResultSlip = () => {

    const styles = useStyles();
    const { state } = useLocation();
    const [resultDetails, setResultDetails] = useState();
    const [resultError, setResultError] = useState();
    const [isResultFetching, setIsResultFetching] = useState(false);

    const getResultSlip = async () => {
        setIsResultFetching(true);
        try {
            const responds = await axios({
                url: '/gradebooks/result-slip',
                method: 'GET',
                params: {
                    session: state.session.replace('/', '_'),
                    term: state.term,
                    class_name: `${state.class_name}_${state.class_stream.toLowerCase()}`,
                    subject: state.subject,
                    stu_id: state.id,
                },
                headers: tokenConfig('application/json'),
            });
            return responds.data;
        } catch (errors) {
            return errors.response;
        }
    }

    console.log(resultDetails);
    useEffect(() => {
        getResultSlip().then(data => {
            setIsResultFetching(false);
            setResultDetails(data);
        })
            .catch(err => {
                setIsResultFetching(false);
                setResultError(err);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isResultFetching) {
        return <DataFetchingProgress />
    } else if (resultError) {
        return <Errors errors={resultError} />
    } else {
        return (
            <>
                {
                    resultDetails && (
                        <div className={styles.container}>
                            <div className={styles.titleDiv}>
                                <div>
                                    <img src={schLogo} alt='school logo' height='100' />
                                </div>
                                <p className={styles.titleP}>
                                    EMAK GOD'S OWN SCHOOLS
                                    <br />
                                    20 OJIKE STREET, UMUAHIA, ABIA STATE
                                </p>
                                <div className={styles.stuImgDiv} >
                                    <img src={''} alt='Student passport' height='100' />
                                </div>
                            </div>
                            <p className={styles.container}>
                                <span className={styles.subTitle}>Student Result Slip for {getSchoolFromClass(state.class_name)}</span>

                                <span className={styles.cap}>Addmission Number:</span>  <em className={styles.regSpan}>{resultDetails.student.reg_number}</em>
                                <br />
                                <span className={styles.cap}>Name:</span>  <em className={styles.nameSpan} >{resultDetails.student.name.last_name}, {resultDetails.student.name.first_name} {resultDetails.student.name.other_names}</em>
                                <span className={styles.outerGroup}>
                                    <span>
                                        <span className={styles.cap}>Gender:</span>
                                        <em className={styles.otherSpan}>{resultDetails.student.gender}</em>
                                    </span>
                                    <span className={styles.innerGroup}>
                                        <span className={styles.cap}>Class:    </span>
                                        <span className={styles.otherSpan}>{state.class_name}{state.class_stream}</span>
                                    </span>
                                </span>
                                <span className={styles.outerGroup1}>
                                    <span>
                                        <span className={styles.cap}>Term:    </span>
                                        <span>{state.term}</span>
                                    </span>
                                    <span className={styles.centerGroup}>
                                        <span className={styles.cap}>Academic Year:    </span>
                                        <span className={styles.otherSpan}>{state.session}</span>
                                    </span>
                                    <span className={styles.innerGroup}>
                                        <span className={styles.cap}>ED. Zone:    </span>
                                        <span className={styles.otherSpan}>Umuahia North</span>
                                    </span>
                                </span>
                            </p>
                            <table className={styles.table} >
                                <thead className={styles.thead}>
                                    <tr className={styles.tr}>
                                        <th className={styles.th} scope="col"></th>
                                        <th className={styles.th} scope="col">Continious Assessment</th>
                                        <th className={styles.th} scope="col">Exam</th>
                                        <th className={styles.th} scope="col">Total</th>
                                        <th className={styles.th} scope="col">Subject Position</th>
                                        <th className={styles.th} scope="col">Remark</th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tbody}>
                                    {
                                        resultDetails.subjects.map(subject =>
                                            <tr key={subject._id} className={styles.tr} >
                                                <th className={styles.thr} scope="row">{subject.title}</th>
                                                <td className={styles.td}>{subject.c_a}</td>
                                                <td className={styles.td}>{subject.exam}</td>
                                                <td className={styles.td}>{subject.total}</td>
                                                <td className={styles.td}>{subject.position}</td>
                                                <td className={styles.td}></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <p className={styles.container}>
                                <span className={styles.outerGroup}>
                                    <span>
                                        <span className={styles.lowerCap}>Total Mark:</span>
                                        <em className={styles.otherSpan}>{resultDetails.total}</em>
                                    </span>
                                    <span className={styles.innerGroup}>
                                        <span className={styles.lowerCap}>Average:    </span>
                                        <em className={styles.otherSpan}>{resultDetails.average}</em>
                                    </span>
                                </span>
                                <span className={styles.outerGroup}>
                                    <span>
                                        <span className={styles.lowerCap}>Class Position:    </span>
                                        <em>{resultDetails.position}         </em>
                                        <span className={styles.lowerCap}>out of    </span>
                                        <em>{resultDetails.number_of_students + 10}</em>
                                    </span>
                                    <span className={styles.innerGroup}>
                                        <span className={styles.lowerCap}>Status:  </span>
                                        <span className={styles.otherSpan}>{resultDetails.average >= 40 ? 'Passed' : 'Failed'}</span>
                                    </span>
                                </span>
                            </p>
                            <p className={styles.signSpan}>Approved and Signed by the Proprietress, Deaconess Mercy Kalu</p>
                            <p className={styles.mottoDiv}>Encourage and build you child up in the he should go</p>
                            <button onClick={() => printResultSlip(resultDetails, state, '../../images/sch-logo-250x180.png')}>Print</button>
                        </div>
                    )
                }
            </>
        )
    }
}

export default ResultSlip
