import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    imgContainer: {
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
    },
    img1: {
        zIndex: '2',
        objectFit: 'fill',
        position: 'relative',
    },
    img2: {
        zIndex: '0',
        objectFit: 'fill',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    text: {
        color: '#0973b1',
        width: 'inherit',
        position: 'relative',
        left: '15%',
        [theme.breakpoints.down('xs')]: {
            left: '5%',
        },
    },
}))

const DashBoardButtonImg = ({ src1, src2, alt1, alt2, ...props }) => {
    const styles = useStyles();

    return (
        <div className={styles.gridContainer}>
            <span className={styles.imgContainer} {...props} >
                <img className={styles.img1} src={src1} alt='first-img' width={120} />
                <img className={styles.img2} src={src2} alt='first-img' width={120} />
                <br />
                <span className={styles.text}>{props.children}</span>
            </span>
            <br />
        </div>
    )
}

export default DashBoardButtonImg;
