import React from 'react';
import clsx from 'clsx';
import useStyles from './sliderStyle';

const Slider = ({slideIndex, index, src, alt, text }) => {
    const styles = useStyles();
    return (
        <div className={slideIndex === index + 1 ? clsx(styles.slide, styles.activeAnim) : styles.slide}>
            <img src={src} alt={alt} width={400}  height={200}/>
            {text}
        </div>
    )
}

export default Slider
