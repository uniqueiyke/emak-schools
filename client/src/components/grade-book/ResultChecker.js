import React from 'react';
import { useSelector } from 'react-redux';
import DataFetchingProgress from '../other-components/DataFetchingProgress';
import ResultSlip from './ResultSlip';

const ResultChecker = () => {
    const { isFetchingResult, data, error } = useSelector(state => state.student.result)
    if (isFetchingResult) {
        return <DataFetchingProgress />
    }
    return (
        <ResultSlip resultDetails={data} error={error} />
    )
}

export default ResultChecker
