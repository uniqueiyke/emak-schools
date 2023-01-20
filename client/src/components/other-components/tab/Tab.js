import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
    tab: {
        width: props => props.width ? props.width : 'auto',
        height: 'inherit',
        backgroundColor: props => props.backgroundColor ? props.backgroundColor : 'inherit',
        color: props => props.textColor ? props.textColor : '#282829',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        cursor: 'pointer',
        overflow: 'visible',
        marginRight: '1px',
        padding: '0px 8px',
        border: 'none',
        textAlign: "center",
        whiteSpace: 'nowrap',
        outline: 'none',
        zIndex: 1000,
        '&:hover': {
            backgroundColor: '#d6d3d3',
            color: '#eef2f7',
        },
        '&:focus': {
            backgroundColor: '#d6d3d3',
            color: '#eef2f7',
        }
    },

    tabBtn: {
        backgroundColor: 'inherit',
        border: 'none',
        color: 'inherit',
        textAlign: 'center',
        overflow: 'inherit',
        cursor: 'pointer',
        height: 'inherit',
        padding: '0px 5px',
    },
}))


const Tab = ({ active, className, title, index, onClick, children, width, textColor, backgroundColor, ...others }) => {
    const styleProps = { active, width, textColor, backgroundColor, ...others }
    const styles = useStyles(styleProps);
    return (
        <button className={clsx(styles.tab, className)}
            data-tab-panel-index={index}
            {...others}
            onClick={onClick}
            style={{
                backgroundColor: active && '#bdb7b7',
                color: active && '#1538ac',
                borderBottom: active && 'solid',
                borderBottomColor: active && '#1538ac',
            }}
        >
            {children ? children : title ? title : ''}
        </button>
    )
}

export default Tab