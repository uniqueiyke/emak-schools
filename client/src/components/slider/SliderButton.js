import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './sliderStyle';
import clsx from 'clsx';

const SliderButton = ({ direction, moveSlide }) => {
    const styles = useStyles();
    return (
        <button
            className={direction === 'next' ? clsx(styles.btnSlide, styles.next) : clsx(styles.btnSlide, styles.prev)}
            onClick={moveSlide}
        >
            {direction === 'next' ?
                <ArrowForwardIosIcon className={styles.btnSlideImg} />
                :
                <ArrowBackIosIcon className={styles.btnSlideImg} />}
        </button>
    )
}

export default SliderButton
