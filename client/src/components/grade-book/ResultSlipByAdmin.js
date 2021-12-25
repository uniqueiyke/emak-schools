import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DataFetchingProgress from '../other-components/DataFetchingProgress';
import ResultSlip from './ResultSlip';
import { getResultSlip } from '../../redux/actions/admin-action'

const ResultSlipByAdmin = () => {

    const { state } = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getResultSlip({
            session: state.session.replace('/', '_'),
            term: state.term,
            class_name: `${state.class_name}_${state.class_stream.toLowerCase()}`,
            subject: state.subject,
            stu_id: state.id,
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { isFetchingResult, data, error } = useSelector(state => state.admin.oneResult)

    if (isFetchingResult) {
        return <DataFetchingProgress />
    }
    return (
        <ResultSlip resultDetails={data} error={error} />
    )
}

export default ResultSlipByAdmin
