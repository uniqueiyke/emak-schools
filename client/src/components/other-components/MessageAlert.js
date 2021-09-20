import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export default function MessageAlert( {data, error, children, ...props} ) {
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        if(data || error)
            setIsOpen(true)
        
    }, [data, error])

    return (
        <>
            {
                isOpen &&
                <Alert
                    variant='filled'
                    onClose={() => setIsOpen(!isOpen)}
                    severity={error ? 'error' : data ? 'success' : ''}
                    {...props}
                >
                    <AlertTitle>{error ? 'Error' : data ? 'Success' : ''}</AlertTitle>
                    { children }
                </Alert>
            }
        </>
    )
}