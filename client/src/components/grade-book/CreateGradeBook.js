import React, { useState } from 'react';
// import { useDispatch } from 'react-redux'
import ResultManager from '../grade-book/ResultManager';
// import { createResultManager } from '../../redux/actions/admin-action'
import { currentAcademicYear, currentTerm } from '../../libs/session-array';
import GradeScoreForm from './GradeScoreForm';

const CreateGradeBook = () => {
    
    const initialSubmitValueState = {
        session: currentAcademicYear(),
        term: currentTerm(),
        class_name: 'jss1',
        class_stream: 'A',
        subject: '',
    }

    const [state, setState] = useState(initialSubmitValueState);
    // const dispatch = useDispatch();

    const handleValueChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(state);
        // dispatch(createResultManager(state))
        setState(initialSubmitValueState);
    }

    return (
        <>
        <ResultManager
            withSubject
            vSubject={state.subject}
            vTerm={state.term}
            vSession={state.session}
            vClass={state.class_name}
            vStream={state.class_stream}
            onValueChange={handleValueChange}
            onSubmit={handleSubmit}
        />
        <GradeScoreForm />
        </>
    )
}

export default CreateGradeBook
