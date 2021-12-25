import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import { setPageTitle } from '../../libs/utility-functions';
import SliderContainer from '../slider/SliderContainer';
import { useHistory } from 'react-router';
import DashBoardButtonImg from '../other-components/DashBoardButtonImg';
import resultSlip from '../../images/result-slip.png';
import resultSlip1 from '../../images/result-slip1.png';

export default function Home() {

    // const classes = useStyles();
    const history = useHistory();
    setPageTitle('Home');
    return (
        <Fragment>
            <Typography variant='h6' align='center'>
                Welcome to Emak God's own schools. <br />
                Home of academic excellent.
            </Typography>
            <SliderContainer />
            <br />
            <DashBoardButtonImg
                onClick={() => history.push("/student/result-checker")}
                src1={resultSlip}
                src2={resultSlip1}
            >Check Result</DashBoardButtonImg>
        </Fragment>
    )
}
