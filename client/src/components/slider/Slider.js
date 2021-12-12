import React from 'react';
import clsx from 'clsx';
import useStyles from './sliderStyle';

const Slider = ({slideIndex, index, src, alt, text, slideIn, slideOut }) => {
    const styles = useStyles();
    return (
        <div className={slideIndex === index + 1 ? clsx(styles.slide, styles.activeAnim,  {
            [styles.imgAnimationIn]: slideIn,
          }) : styles.slide}>
            <img src={src} alt={alt} className={styles.slideImg} />
            {text}
        </div>
    )
}

export default Slider
