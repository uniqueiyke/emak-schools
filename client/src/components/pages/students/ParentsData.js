import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { isEmptyString } from '../../../libs/utility-functions';
import SingleSelect from '../../other-components/SingleSelect';

const ParentsData = ({styles, parentData, inputErrMsg, handleDataChange}) => {
    return (
        <>
        <FormControl fullWidth className={styles.formField}>
                <TextField
                    name="parent_last_name"
                    label="Parent's Last Name"
                    value={parentData.parent_last_name}
                    required
                    onChange={handleDataChange}
                    variant="outlined"
                    error={(inputErrMsg && inputErrMsg.parent_last_name) ? !isEmptyString(inputErrMsg.parent_last_name) : false}
                    helperText={(inputErrMsg && inputErrMsg.parent_last_name) && inputErrMsg.parent_last_name}
                />
            </FormControl>
            <FormControl fullWidth className={styles.formField}>
                <TextField
                    name="parent_first_name"
                    label="Parent's Fisrt Name"
                    value={parentData.parent_first_name}
                    required
                    onChange={handleDataChange}
                    variant="outlined"
                    error={(inputErrMsg && inputErrMsg.parent_first_name) ? !isEmptyString(inputErrMsg.parent_first_name) : false}
                    helperText={(inputErrMsg && inputErrMsg.parent_first_name) && inputErrMsg.parent_first_name}
                />
            </FormControl>
            <SingleSelect
                listOptions={[{label: 'Father', value: 'father'}, {label: 'Mother', value: 'mother'}, {label: 'Guardian', value: 'guardian'}]}
                name='relationship'
                value={parentData.relationship}
                label={'Relationship with Student'}
                labelId='relationshipId'
                required
                onChange={handleDataChange}
                className={styles.formField}
                error={(inputErrMsg && inputErrMsg.relationship) ? !isEmptyString(inputErrMsg.relationship) : false}
                    helperText={(inputErrMsg && inputErrMsg.relationship) && inputErrMsg.relationship}
            />
            <FormControl fullWidth className={styles.formField}>
                <TextField name="parent_phone_number"
                    label="Phone Number"
                    type="tel"
                    value={parentData.parent_phone_number}
                    onChange={handleDataChange}
                    variant="outlined"
                    required
                    error={(inputErrMsg && inputErrMsg.parent_phone_number) ? !isEmptyString(inputErrMsg.parent_phone_number) : false}
                    helperText={(inputErrMsg && inputErrMsg.parent_phone_number) && inputErrMsg.parent_phone_number}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><PhoneIcon className={styles.iconColor} /></InputAdornment>
                    }}
                />
            </FormControl>
            <FormControl fullWidth className={styles.formField}>
                <TextField name="parent_email"
                    label="Email"
                    type="email"
                    value={parentData.parent_email}
                    onChange={handleDataChange}
                    variant="outlined"
                    error={(inputErrMsg && inputErrMsg.parent_email) ? !isEmptyString(inputErrMsg.parent_email) : false}
                    helperText={(inputErrMsg && inputErrMsg.parent_email) && inputErrMsg.parent_email}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><EmailIcon className={styles.iconColor} /></InputAdornment>
                    }}
                />
            </FormControl>
            <FormControl fullWidth className={styles.formField}>
                <TextField
                    name="parent_occpation"
                    label="Parent's Occpation"
                    value={parentData.parent_occpation}
                    required
                    onChange={handleDataChange}
                    variant="outlined"
                    error={(inputErrMsg && inputErrMsg.parent_occpation) ? !isEmptyString(inputErrMsg.parent_occpation) : false}
                    helperText={(inputErrMsg && inputErrMsg.parent_occpation) && inputErrMsg.parent_occpation}
                />
            </FormControl>
            
        </>
    )
}

export default ParentsData
