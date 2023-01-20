import React, { useEffect, useRef, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    tapWrapper: {
        position: props => props.position ? props.position : 'fixed',
        width: props => props.width ? props.width : '100%',
        height: props => props.height ? props.height : '50px',
        top: props => props.top ? props.top : '65px',
        bottom: props => props.bottom,
        left: props => props.left,
        right: props => props.right,
        zIndex: 1000,
        backgroundColor: props => props.backgroundColor ? props.backgroundColor : '#afafaf',
    },
    scrollContainer: {
        width: '100%',
        height: 'inherit',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollBehavior: 'smooth',
        backgroundColor: 'inherit',
        padding: '0px 20px',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        zIndex: 1000,
        '&::-webkit-scrollbar': {
            display: 'none',
            '-webkit-appearance': 'none',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#aca9a9',
        }
    },
    scrollBtn: {
        position: 'absolute',
        border: 'none',
        backgroundColor: 'inherit',
        padding: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        height: 'inherit',
        color: '#ffffff',
        zIndex: 1000,
    },

    left: {
        left: 0,
    },

    right: {
        right: 0,
    },
}))

const TabWrapper = ({ className, children, onIndexChange, position, width, height, top, bottom, left, right, backgroundColor, scrollButtons, ...others }) => {
    const stylsProps = { position, width, height, top, bottom, left, right, backgroundColor, scrollButtons, ...others }
    const styles = useStyles(stylsProps);
    const tabsRef = useRef();
    const scrollContainerRef = useRef();
    const currentIndexRef = useRef(0);

    const [endLeft, setEndLeft] = useState(false)
    const [endRight, setEndRight] = useState(true)
    const [isScrollable, setIsScrollable] = useState(false)


    const callbackRef = useCallback(node => {
        if (node !== null) {
            scrollContainerRef.current = node;
            tabsRef.current = [...node.childNodes];
            for (let n = 0; n < tabsRef.current.length; n++) {
                tabsRef.current[n].addEventListener('click', e => selectTapPanel(e, n))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const clientWidth = scrollContainerRef.current.clientWidth
        const isOverflow = () => {
            if (scrollWidth > clientWidth) {
                setIsScrollable(true)
            }
        }
        isOverflow();

        return () => {
            for (let n = 0; n < tabsRef.current.length; n++) {
                tabsRef.current[n].removeEventListener('click', e => selectTapPanel(e, n))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkScrollEnds = () => {
        if (currentIndexRef.current <= 0) {
            setEndLeft(false)
        } else {
            setEndLeft(true)
        }

        if (currentIndexRef.current >= tabsRef.current.length - 1) {
            setEndRight(false)
        } else {
            setEndRight(true)
        }


        // const pNode = scrollContainerRef.current;
        // const {left, width, right} = pNode.getBoundingClientRect();
        // if (parseInt(tabsRef.current[0].getBoundingClientRect().left - (left + 20)) < pNode.clientLeft) {
        //     setEndLeft(true)
        // } else {
        //     setEndLeft(false)
        // }

        // if (parseInt(tabsRef.current[tabsRef.current.length - 1].getBoundingClientRect().right + 20) > pNode.clientWidth) {
        //     setEndRight(true)
        // } else {
        //     setEndRight(false)
        // }
    }

    const scrollLeftBtn = e => {
        e.stopPropagation();
        if (currentIndexRef.current > 0) {
            --currentIndexRef.current;
        } else {
            currentIndexRef.current = tabsRef.current.length - 1;
        }

        const pNode = scrollContainerRef.current;
        const cNode = tabsRef.current[currentIndexRef.current];
        const { width, left } = cNode.getBoundingClientRect();
        const pNodeClientRect = pNode.getBoundingClientRect(); 

        if (parseInt(left - (pNodeClientRect.left + 20)) < pNode.clientLeft) {
            pNode.scrollBy(Math.ceil(left - pNodeClientRect.left) - 20, 0);
            checkScrollEnds();
        }

        if (currentIndexRef.current === 0 || currentIndexRef.current === tabsRef.current.length - 1) {
            
            if (pNode.scrollWidth > pNode.clientWidth) {
               
                if (currentIndexRef.current === 0) {
                    pNode.scrollBy(-width, 0);
                }
                if (currentIndexRef.current === tabsRef.current.length - 1) {
                    pNode.scrollBy(width, 0);
                }

            }
            checkScrollEnds();
        }
        
        cNode.focus();
    }

    const scrollRightBtn = e => {
        e.stopPropagation();
        if (currentIndexRef.current < tabsRef.current.length - 1) {
            ++currentIndexRef.current;
        } else {
            currentIndexRef.current = 0;
        }
        const pNode = scrollContainerRef.current;
        const pNodeClientRect = pNode.getBoundingClientRect();
        const cNode = tabsRef.current[currentIndexRef.current];
        const { width, right } = cNode.getBoundingClientRect();

        if (parseInt((right + 20) - pNodeClientRect.left) > pNode.clientWidth) {
            pNode.scrollBy(Math.ceil(right - pNodeClientRect.right) + 20, 0);
            checkScrollEnds();
        }

        if (currentIndexRef.current === 0 || currentIndexRef.current === tabsRef.current.length - 1) {
            if (pNode.scrollWidth > pNode.clientWidth) {
                
                if (currentIndexRef.current === 0) {
                    pNode.scrollBy(-width, 0);
                }
                if (currentIndexRef.current === tabsRef.current.length - 1) {
                    pNode.scrollBy(width, 0);
                }
            }
            checkScrollEnds();
        }

        // checkScrollEnds()
        cNode.focus();
    }

    function selectTapPanel(e, index) {
        e.preventDefault();
        e.stopPropagation()

        if (onIndexChange && typeof (onIndexChange) === 'function') {
            const tab = e.target;
            const { right, left } = tab.getBoundingClientRect();
            const pNode = scrollContainerRef.current;
            const pNodeClientRect = pNode.getBoundingClientRect(); 
            onIndexChange(parseInt(tab.dataset.tabPanelIndex));
         
            if (parseInt(index) >= 0) {
                currentIndexRef.current = parseInt(index);
            }
            if (parseInt((right + 20) - pNodeClientRect.left) > pNode.clientWidth) {
                pNode.scrollBy(Math.ceil(right - pNodeClientRect.right) + 20, 0);
                checkScrollEnds();
            }
            if (parseInt(left - (pNodeClientRect.left + 20)) < pNode.clientLeft) {
                pNode.scrollBy(Math.ceil(left - pNodeClientRect.left) - 20, 0);
                checkScrollEnds();
            }
            // checkScrollEnds()
            tab.focus();
        }
    }

    function onKeyDownEvents(e) {
        e.preventDefault()
        if (e.key === 'ArrowLeft') {
            scrollLeftBtn(e)

        }
        if (e.key === 'ArrowRight') {
            scrollRightBtn(e)
        }
        if (e.key === 'Enter') {
            selectTapPanel(e)
        }

    }

    return (
        <div className={clsx(styles.tapWrapper, className)}
            onClick={e => e.stopPropagation()}
        >
            <div className={styles.scrollContainer}
                ref={callbackRef}
                onClick={e => e.stopPropagation()}
                onKeyDown={onKeyDownEvents}
            >
                {children}
            </div>
            {
                children && isScrollable && <>
                    {
                        endLeft && <button onClick={scrollLeftBtn} tabIndex="-1" className={clsx(styles.scrollBtn, styles.left)}> {'<'} </button>
                    }
                    {
                        endRight && <button onClick={scrollRightBtn} tabIndex="-1" className={clsx(styles.scrollBtn, styles.right)}> {'>'} </button>
                    }
                </>
            }
        </div>
    )
}

export default TabWrapper