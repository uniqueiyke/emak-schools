import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import SingleSelect from '../../other-components/SingleSelect';
import { isEmptyString } from '../../../libs/utility-functions';


const useStyle = makeStyles({
    formField: {
        marginTop: 10,
        marginBottom: 10
    },
    iconColor: {
        color: '#008800',
    },
})

const AddressEditor = ({ addressLabel, inputErrMsg, countries_states, ng_state_lga, addressValues, handleAddressValuesChange }) => {
    const states = Object.keys(ng_state_lga);
    const styles = useStyle();
    const countries = Object.keys(countries_states)

    return (
        <>
            <FormControl fullWidth className={styles.formField}>
                <TextField
                    name="address"
                    label={addressLabel}
                    value={addressValues.address}
                    required
                    onChange={handleAddressValuesChange}
                    variant="outlined"
                    error={(inputErrMsg && inputErrMsg.address) ? !isEmptyString(inputErrMsg.address) : false}
                    helperText={(inputErrMsg && inputErrMsg.address) && inputErrMsg.address}
                />
            </FormControl>
            <FormControl fullWidth className={styles.formField}>
                <TextField
                    name="town"
                    label="Town"
                    value={addressValues.town}
                    onChange={handleAddressValuesChange}
                    variant="outlined"
                    error={(inputErrMsg && inputErrMsg.town) ? !isEmptyString(inputErrMsg.town) : false}
                    helperText={(inputErrMsg && inputErrMsg.town) && inputErrMsg.town}
                />
            </FormControl>
            <FormControl fullWidth className={styles.formField}>
                <TextField
                    name="City"
                    label="City"
                    value={addressValues.City}
                    onChange={handleAddressValuesChange}
                    variant="outlined"
                    error={(inputErrMsg && inputErrMsg.City) ? !isEmptyString(inputErrMsg.City) : false}
                    helperText={(inputErrMsg && inputErrMsg.City) && inputErrMsg.City}
                />
            </FormControl>
            <FormControl fullWidth className={styles.formField}>
                <TextField
                    name="postal_code"
                    label="Postal Code"
                    value={addressValues.postal_code}
                    onChange={handleAddressValuesChange}
                    variant="outlined"
                    error={(inputErrMsg && inputErrMsg.postal_code) ? !isEmptyString(inputErrMsg.postal_code) : false}
                    helperText={(inputErrMsg && inputErrMsg.postal_code) && inputErrMsg.postal_code}
                />
            </FormControl>
            <SingleSelect
                listOptions={countries}
                name='Country'
                value={addressValues.Country}
                label={'Country'}
                labelId='countryId'
                onChange={handleAddressValuesChange}
                required
                className={styles.formField}
                error={(inputErrMsg && inputErrMsg.Country) ? !isEmptyString(inputErrMsg.Country) : false}
                helperText={(inputErrMsg && inputErrMsg.Country) && inputErrMsg.Country}
            />
            <SingleSelect
                listOptions={
                    (addressValues && addressValues.Country === 'Nigeria') ?
                        states : countries_states[addressValues.Country].states
                }
                name='State'
                value={addressValues.State}
                label={'State'}
                labelId='stateId'
                onChange={handleAddressValuesChange}
                required
                className={styles.formField}
                error={(inputErrMsg && inputErrMsg.State) ? !isEmptyString(inputErrMsg.State) : false}
                helperText={(inputErrMsg && inputErrMsg.State) && inputErrMsg.State}
            />
            {
                (addressValues && addressValues.Country === 'Nigeria') ?
                    <SingleSelect
                        listOptions={ng_state_lga[addressValues.State]}
                        name='lga'
                        value={addressValues.lga}
                        label={'L.G.A'}
                        labelId='lgaId'
                        onChange={handleAddressValuesChange}
                        required
                        className={styles.formField}
                        error={(inputErrMsg && inputErrMsg.lga) ? !isEmptyString(inputErrMsg.lga) : false}
                        helperText={(inputErrMsg && inputErrMsg.lga) && inputErrMsg.lga}
                    />
                    :
                    <FormControl fullWidth className={styles.formField}>
                        <TextField
                            name="lga"
                            label="Province"
                            value={addressValues.lga}
                            required
                            onChange={handleAddressValuesChange}
                            variant="outlined"
                            error={(inputErrMsg && inputErrMsg.lga) ? !isEmptyString(inputErrMsg.lga) : false}
                            helperText={(inputErrMsg && inputErrMsg.lga) && inputErrMsg.lga}
                        />
                    </FormControl>
            }

        </>
    )
}

export default AddressEditor