import React, { Fragment } from 'react';
import Typography  from '@material-ui/core/Typography';
import { setPageTitle } from '../../libs/utility-functions';


export default function Contacts() {

    setPageTitle('Contacts');
    return (
        <Fragment>
            <Typography variant='h4'>
                This the Contacts page
            </Typography>
        </Fragment>
    )
}
