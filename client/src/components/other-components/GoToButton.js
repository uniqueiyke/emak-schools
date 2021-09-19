import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GoToButton({ to, onClick, ...props }) {
    const history = useHistory()

    return (
        <div>
            <Button
                onClick={onClick ? () => onClick(to) : () => history.push(to)}
                color='primary'
                {...props}
                // classes={
                //     {
                //         text:
                //     }
                // }
            ></Button>
        </div>
    )
}

GoToButton.prototypes = {
    to: PropTypes.string.isRequired,
    props: PropTypes.object,
    onClick: PropTypes.func,
}