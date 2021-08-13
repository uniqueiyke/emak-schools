import React, { Fragment } from 'react';
import Typography  from '@material-ui/core/Typography';
import { setPageTitle } from '../../libs/utility-functions';


export default function About() {

    setPageTitle('About');
    return (
        <Fragment>
            <Typography variant='h4'>
                This About page
            </Typography>
        </Fragment>
    )
}
