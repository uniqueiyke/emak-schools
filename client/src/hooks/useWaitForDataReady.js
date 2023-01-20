import {useEffect, useRef, useState} from 'react';

export default function useWaitForDataReady(data) {
    const intervalIDRef = useRef(null);
    const [isDataReady, setIsDataReady] = useState(false);
    const waitForDataToLoad = () => {
        if (data !== null) {
            setIsDataReady(true)
            clearInterval(intervalIDRef.current);
        }
    }

    useEffect(() => {
        intervalIDRef.current = setInterval(waitForDataToLoad, 300);
        return () => {
            clearInterval(intervalIDRef.current);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return isDataReady;
}
