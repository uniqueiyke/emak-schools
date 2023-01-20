import {useState} from 'react';
import countries_states from '../libs/countries-states';
import ng_state_lga from '../libs/nigeria-state-lga';

const useAddressEditor = (address) => {
    
    const initialtstate = () => ({
        address: (address && address.address) ? address.address : '',
        town: (address && address.town) ? address.town : '',
        City: (address && address.City) ? address.City : '',
        postal_code: (address && address.postal_code) ? address.postal_code : '',
        lga: (address && address.lga) ? address.lga : (address && address.State) ? ng_state_lga[address.State] : 'Umuahia North',
        State: (address && address.State) ? address.State : 'Abia',
        Country: (address && address.Country) ? address.Country : 'Nigeria',
    })
    const [addressValues, setAddressValues] = useState(initialtstate())

    const handleAddressValuesChange = e => {
        if (e.target.name === 'Country') {
            if (e.target.value === "Nigeria") {
                setAddressValues({
                    ...addressValues,
                    [e.target.name]: e.target.value,
                    // State: countries_states[e.target.value].states[0],
                    State: 'Abia',
                    // lga: ng_state_lga[countries_states[e.target.value].states[0]][0]
                    lga: 'Umuahia North'
                });
            } else {
                setAddressValues({
                    ...addressValues,
                    [e.target.name]: e.target.value,
                    State: countries_states[e.target.value].states[0],
                    lga: ''
                });
            }

        } else if (e.target.name === 'State' && addressValues.Country === 'Nigeria') {
            setAddressValues({
                ...addressValues,
                [e.target.name]: e.target.value,
                lga: ng_state_lga[e.target.value][0]
            });
        } else {
            setAddressValues({
                ...addressValues,
                [e.target.name]: e.target.value
            });
        }

    }

    const resetAddressValues = () => {
        setAddressValues(initialtstate());
    }

    return {
        addressValues, handleAddressValuesChange, 
        ng_state_lga, countries_states,
        resetAddressValues,
    }
}

export default useAddressEditor