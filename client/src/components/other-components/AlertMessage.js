import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export default function AlertMessage({ open, severity, onClose, children, alertTitle, ...props }) {
    return (
        <>
            {
                open &&
                <Alert
                    component='div'
                    variant='filled'
                    onClose={onClose}
                    severity={severity ? severity : 'success'}
                    {...props}
                >
                    <AlertTitle>
                        {
                            alertTitle ? alertTitle
                                : severity ? severity.toUpperCase()
                                    : 'SUCCESS'
                        }
                    </AlertTitle>
                    {children}
                </Alert>
            }
        </>
    )
}
