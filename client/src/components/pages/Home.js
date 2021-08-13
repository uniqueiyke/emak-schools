import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import { setPageTitle } from '../../libs/utility-functions';


export default function Home() {
    setPageTitle('Home');
    return (
        <Fragment>
            <Typography variant='h3'>
                Welcome Home
            </Typography>
        </Fragment>
    )
}
