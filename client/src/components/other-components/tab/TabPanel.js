import React from 'react';

const TabPanel = ({ children, className, index, currentIndex, marginTop, ...others }) => {

    return (
        <div className={className}
            data-tab-panel-index={index}
            style={{
                display: currentIndex === index ? 'block' : 'none'
            }}
            {...others}
        >{children}</div>
    )
}

export default TabPanel