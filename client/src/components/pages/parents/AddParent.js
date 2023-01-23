import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import ParentsData from '../students/ParentsData';
import { makeStyles } from '@material-ui/core/styles';
import AddressEditor from '../others/AddressEditor';
import {  isEmptyArrayOrObject, formatPhoneNumber } from '../../../libs/utility-functions';
import { validateFormFields } from '../../../libs/form-fields-validator';
import useAddressEditor from '../../../hooks/useAddressEditor';
import { addParentData } from '../../../redux/actions/student-action';

const useStyle = makeStyles({
    formField: {
        marginTop: 10,
        marginBottom: 10
    },
    iconColor: {
        color: '#008800',
    },
})
const AddParent = ({ student_id }) => {
    const styles = useStyle();
    const dispatch = useDispatch()
    const { addressValues, resetAddressValues, handleAddressValuesChange, ng_state_lga, countries_states } = useAddressEditor();
    const initialDataState = {
        parent_last_name: '',
        parent_first_name: '',
        parent_phone_number: '',
        parent_email: '',
        parent_occpation: '',
        relationship: 'father',
    };


    const [pData, setPData] = useState(initialDataState);
    const [formSubmitErr, setFormSubmitErr] = useState(null);

    const handleDataChange = (e) => {
        setPData({
            ...pData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        const parentDataErr = validateFormFields({...pData, ...addressValues}, {
            parent_last_name: 'min_length',
            parent_first_name: 'min_length',
            parent_phone_number: 'phone',
            parent_email: 'email',
            relationship: 'select',
            address: 'min_length',
            town: 'min_length',
            City: 'min_length',
            postal_code: 'min_length',
            parent_occpation: 'min_length',
            State: 'select',
            lga: 'select',
            Country: 'select',
        }, { optionalFields: ['parent_email', 'town', 'City', 'postal_code'], minLength: 3 });

        if (isEmptyArrayOrObject(parentDataErr)) {
            dispatch(addParentData({
              ...pData, ...addressValues,
              parent_phone_number: formatPhoneNumber(pData.parent_phone_number)
            }, student_id));
            
            setPData(initialDataState)
            resetAddressValues()
            setFormSubmitErr(null)
        } else {
            console.log(parentDataErr)
            setFormSubmitErr(parentDataErr)
        }
    }

    return (
        <>
            <ParentsData
                parentData={pData}
                styles={styles}
                inputErrMsg={formSubmitErr}
                handleDataChange={handleDataChange}
            />
            <AddressEditor
                inputErrMsg={formSubmitErr}
                addressValues={addressValues}
                handleAddressValuesChange={handleAddressValuesChange}
                ng_state_lga={ng_state_lga}
                countries_states={countries_states}
                addressLabel='Office Address'
            />
            <Button onClick={onSubmit} >Submit</Button>
        </>
    )
}

export default AddParent