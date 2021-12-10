import React, { useState, useEffect, useRef } from 'react';
import SliderButton from './SliderButton';
import useStyles from './sliderStyle';
import clsx from 'clsx';
import Slider from './Slider';
import img1 from './sch/calistenics1.png';
import img2 from './sch/com_typing.png';
import img3 from './sch/cul_dan1.png';
import img4 from './sch/gra1.png';
import img6 from './sch/jur_gra.png';
import img5 from './sch/gra2.png';
import img7 from './sch/tea.png';

const dataItems = [
    {
        item: img7,
        text: 'Teachers'
    },
    {
        item: img4,
        text: 'Graduants'
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
        text: 'Graduants'
    },
    {
        item: img6,
        text: 'Graduants'
    },
    {
        item: img2,
        text: 'Working with computer'
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
        timerRef.current = setInterval(nextSlide, 2000)
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
