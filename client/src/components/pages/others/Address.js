import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import AddressEditor from './AddressEditor';
import { Card, CardActions, CardContent, CardHeader, Hidden, IconButton, Typography } from '@material-ui/core';
import useAddressEditor from '../../../hooks/useAddressEditor';
import { validateFormFields } from '../../../libs/form-fields-validator';
import { isEmptyArrayOrObject } from '../../../libs/utility-functions';
import { updateStudentData } from '../../../redux/actions/student-action';
import { updateParentData } from '../../../redux/actions/student-action'

const useStyle = makeStyles({
  header: {
    color: 'purple',
    backgroundColor: 'darkgray',
    borderBottom: '2px solid black',
    textAlign: 'center',
  },
  title: {
    color: '#a79601',
    fontWeight: 'bold',
  },
  text: {
    color: '#11c59e'
  },
  linkBtn: {
    cursor: 'pointer',
    float: 'right',
  }
})

const Address = ({ address, addressType, onUpdate, id, addressLabel }) => {
  const styles = useStyle();
  const { addressValues, handleAddressValuesChange, ng_state_lga, countries_states } = useAddressEditor(address);
  const [editAddress, isEditAddress] = useState(false);
  const [isAddressUpdating, setAddressUpdating] = useState(false);
  const [formSubmitErr, setFormSubmitErr] = useState(null);
  const dispatch = useDispatch();

  const renderFieldText = field => {
    if (!field) return <Typography component={'em'} color={"error"} >Please Provide this information</Typography>
    return <Typography className={styles.text} component={'em'}>{field}</Typography>
  }
  
  useEffect(() => {
    setAddressUpdating(false);
  }, [address])

  const onSubmit = () => {
    const dataErr = validateFormFields(addressValues, {
      address: 'min_length',
      town: 'min_length',
      City: 'min_length',
      postal_code: 'min_length',
      State: 'select',
      lga: 'select',
      Country: 'select',
    }, { optionalFields: ['town', 'City', 'postal_code'], minLength: 3 });

    if (isEmptyArrayOrObject(dataErr)) {
      if (addressType === 'res_home') {
        dispatch(updateStudentData({...addressValues, address_type: 'res_home'}, id));
      }else if (addressType === 'pert_home') {
        dispatch(updateStudentData({...addressValues, address_type: 'pert_home'}, id));
      } else {
        dispatch(updateParentData(addressValues, id));
      } 
      setFormSubmitErr(null);
      isEditAddress(false);
      setAddressUpdating(true);
    } else {
      setFormSubmitErr(dataErr);
    }

  }

  return (
    <>
      <Card >
        <CardHeader title={addressLabel} className={styles.header} />
        <CardContent >
          {
            editAddress ? <AddressEditor
              addressValues={addressValues}
              handleAddressValuesChange={handleAddressValuesChange}
              ng_state_lga={ng_state_lga}
              countries_states={countries_states}
              inputErrMsg={formSubmitErr}
              addressLabel={addressLabel}
            />
              : <>
                <Typography className={styles.title}>Address: {renderFieldText(address.address)}</Typography>
                <Typography className={styles.title}>Town: {renderFieldText(address.town)}</Typography>
                <Typography className={styles.title}>City: {renderFieldText(address.City)}</Typography>
                <Typography className={styles.title}>Postal Code: {renderFieldText(address.postal_code)}</Typography>
                <Typography className={styles.title}>L.G.A.: {renderFieldText(address.lga)}</Typography>
                <Typography className={styles.title}>State: {renderFieldText(address.State)}</Typography>
                <Typography className={styles.title}>Country: {renderFieldText(address.Country)}</Typography>
              </>
          }
        </CardContent>
        <CardActions>
          {
            editAddress ?
              <>
                <IconButton
                  color='primary'
                  edge='end'
                  onClick={onSubmit}
                  className={styles.linkBtn}
                >
                  <Hidden xsDown>
                    <Typography variant='body1' component='span'>
                      Send
                    </Typography>
                  </Hidden>
                  <SendIcon />
                </IconButton>
                <IconButton
                  edge='end'
                  color='primary'
                  onClick={() => isEditAddress(false)}
                >
                  <Hidden xsDown>
                    <Typography variant='body1' component='span'>
                      Cancel
                    </Typography>
                  </Hidden>
                  <CancelIcon />
                </IconButton>
              </>
              : <IconButton
                disabled={isAddressUpdating}
                color='primary'
                edge='end'
                onClick={() => isEditAddress(true)}
              >
                <Hidden xsDown>
                  <Typography variant='body1' component='span'>
                    Edit
                  </Typography>
                </Hidden>
                <EditIcon />
              </IconButton>
          }
        </CardActions>
      </Card>
    </>
  )
}

export default Address;