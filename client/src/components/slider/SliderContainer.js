import React, { useState, useEffect, useRef } from 'react';
import SliderButton from './SliderButton';
import useStyles from './sliderStyle';
import clsx from 'clsx';
import Slider from './Slider';
import img1 from './img/calis1.png';
import img3 from './img/cul_dan.png';
import img4 from './img/jur_grad.png';
import img6 from './img/pri_grad.png';
import img5 from './img/pri_grad1.png';
import img7 from './img/teachers.png';
import schLogo from '../../images/sch-logo-250x180.png'

const dataItems = [
    {
        item: schLogo,
        text: 'School Logo'
    },
    {
        item: img7,
        text: 'Teachers'
    },
    {
        item: img4,
        text: 'Teachers with Graduants'
    },
    {
        item: img1,
        text: 'Students dancing calistenics'
    },
    {
        item: img3,
        text: 'Cultural dance'
    },
    {
        item: img5,
        text: 'Teachers with Graduants'
    },
    {
        item: img6,
        text: 'Graduants'
    },
]

const SliderContainer = () => {
    const styles = useStyles();

    const [slideIndex, setSlideIndex] = useState(1);
    const timerRef = useRef();

    const nextSlide = () => {
        if (slideIndex !== dataItems.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === dataItems.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(dataItems.length)
        }
    }

    const sliderInterval = () => {
        timerRef.current = setInterval(nextSlide, 3000)
    }

    useEffect(() => {
        sliderInterval();
        const cls = timerRef.current;
        return () => {
            clearInterval(cls);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slideIndex])

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className={styles.containerSlider}>
            
            {
                dataItems.map((item, index) => <Slider
                key={index}
                    slideIndex={slideIndex}
                    index={index}
                    src={item.item}
                    alt={item.text}
                    text={item.text}
                />)
            }
            <SliderButton direction='next' moveSlide={nextSlide} />
            <SliderButton direction='prev' moveSlide={prevSlide} />
            <div className={styles.containerDots}>
                {Array.from({ length: dataItems.length }).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? clsx(styles.dot, styles.dotActive) : styles.dot}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default SliderContainer;
