import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom';
import Errors from '../other-components/Errors';
import schLogo from '../../images/sch-logo-250x180.png';
import stamp from '../../images/stamp-141x100.png';
import { getSchoolFromClass } from '../../libs/students-data';

import { subjectField } from '../../libs/subjects';
import printResultSlip from '../../libs/print-result-slip';
import { setPageTitle, teachersRemake } from '../../libs/utility-functions';

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
        margin: '0px auto',
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

    },
    printBtnDiv: {
        display: 'grid',
        gridTemplateColumns: '100px 150px',
        justifyContent: 'space-between',
    },
    printBtn1: {
        justifySelf: 'left',
        backgroundColor: '#8a1325',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    printBtn2: {
        justifySelf: 'right',
        backgroundColor: '#23285e',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    stamp: {
        borderRadius: '100px',
        margin: 'auto auto',
    },
    stampContainer: {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const ResultSlip = ({ resultDetails, error }) => {

    const styles = useStyles();
    const { state } = useLocation();


    if (resultDetails) {
        setPageTitle(`${resultDetails.student.reg_number} Result Slip`);
    }


    if (error) {
        return <Errors errors={error} goBack />
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
                                                <th className={styles.thr} scope="row">{subjectField(subject.title, 'label')}</th>
                                                <td className={styles.td}>{subject.c_a}</td>
                                                <td className={styles.td}>{subject.exam}</td>
                                                <td className={styles.td}>{subject.total}</td>
                                                <td className={styles.td}>{subject.position}</td>
                                                <td className={styles.td}>{teachersRemake(subject.total)}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <p className={styles.container}>
                                <span className={styles.outerGroup}>
                                    <span>
                                        <span className={styles.lowerCap}>Total Mark:</span>
                                        <em className={styles.otherSpan}>{resultDetails.result.total}</em>
                                    </span>
                                    <span className={styles.innerGroup}>
                                        <span className={styles.lowerCap}>Average:    </span>
                                        <em className={styles.otherSpan}>{resultDetails.result.average}</em>
                                    </span>
                                </span>
                                <span className={styles.outerGroup}>
                                    <span>
                                        <span className={styles.lowerCap}>Class Position:    </span>
                                        <em>{resultDetails.result.position}         </em>
                                        <span className={styles.lowerCap}>out of    </span>
                                        <em>{resultDetails.number_of_students + 10}</em>
                                    </span>
                                    <span className={styles.innerGroup}>
                                        <span className={styles.lowerCap}>Status:  </span>
                                        <span className={styles.otherSpan}>{resultDetails.result.average >= 40 ? 'Passed' : 'Failed'}</span>
                                    </span>
                                </span>
                            </p>

                            <div className={styles.stampContainer}>
                                <span className={styles.signSpan}>Approved and Signed by the Proprietress, Deaconess Mercy Kalu</span>
                                <img src={stamp} alt='school stamp' height={70} className={styles.stamp} />
                            </div>
                            <p className={styles.mottoDiv}>Encourage and build you child up in the he should go</p>
                            <div className={styles.printBtnDiv}>
                                <button className={styles.printBtn1} onClick={() => printResultSlip(resultDetails, state)}>Print</button>
                                <button className={styles.printBtn2} onClick={() => window.print()}>Mobile Device Print</button>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
}

export default ResultSlip
