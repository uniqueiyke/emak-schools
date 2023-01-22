import React from 'react';
import ProfileNamePage from '../others/ProfileNamePage';
import ProfileContent from '../others/ProfileContent';
import { makeStyles } from '@material-ui/core/styles';
import { updateParentData } from '../../../redux/actions/student-action'
import Address from '../others/Address';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    title: {
        fontSize: '0.8rem',
        color: '#ff9800',
        fontStyle: 'italic'
    },
    formField: {
        marginTop: 10,
        marginBottom: 10
    },
    textGreen: {
        color: 'green',
    },

}));

const Parent = ({ parent }) => {
    const classes = useStyles();
    return (
        <>
            <ProfileNamePage profileData={
                {
                    data: { name: parent.name, _id: parent._id },
                    error: null,
                }}
                titleStyle={classes.title}
                rootStyle={classes.root}
                onUpdate={updateParentData}
            />
            <ProfileContent
                profileData={{
                    data: parent
                }}
                select
                listOptions={[{label: 'Father', value: 'father'}, {label: 'Mother', value: 'mother'}, {label: 'Guardian', value: 'guardian'}]}
                fieldName='relationship'
                fieldLabel={'Relationship'}
                title='Relationship'
                titleStyle={classes.title}
                rootStyle={classes.root}
                onUpdate={updateParentData}
            />
            <ProfileContent
                profileData={{
                    data: parent
                }}
                fieldName='phone_number'
                fieldLabel={'Phone Number'}
                title='Phone Number'
                titleStyle={classes.title}
                rootStyle={classes.root}
                onUpdate={updateParentData}
            />
            <ProfileContent
                profileData={{
                    data: parent
                }}
                fieldName='email'
                fieldLabel={'Email'}
                title='Email'
                titleStyle={classes.title}
                rootStyle={classes.root}
                onUpdate={updateParentData}
            />
            <ProfileContent
                profileData={{
                    data: parent
                }}
                fieldName='occpation'
                fieldLabel={'Occpation'}
                title='Occpation'
                titleStyle={classes.title}
                rootStyle={classes.root}
                onUpdate={updateParentData}
            />
            <Address
                address={parent.office}
                addressLabel='Office Address'
                titleStyle={classes.title}
                rootStyle={classes.root}
                onUpdate={updateParentData}
                id={parent._id}
            />
        </>
    )
}

export default Parent