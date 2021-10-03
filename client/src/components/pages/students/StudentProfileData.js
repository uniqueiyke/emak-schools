import React from 'react';
import {
    Typography,
    Container,
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileContent from '../others/ProfileContent';
import ProfileNamePage from '../others/ProfileNamePage';
import { 
    genotypes, 
    bloodGroups, 
    classes as studentClass, 
    gender, studentStatus,
} from '../../../libs/students-data'

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

export default function StaffProfileData({ profileData }) {

    const data = profileData.data;
    const classes = useStyles();
    return (
        <Container >
            <Typography component='h5' variant='subtitle1' align='right'>
                Registered on:
                <Typography component='em' variant='subtitle1' color='secondary' >
                    {new Date(data.reg_date).toDateString()}
                </Typography>
            </Typography>
            <Typography component='h5' variant='subtitle1' align='right'>
                Reg. Number: <span className={classes.textGreen}>{data.reg_number}</span>
            </Typography>
            <Typography component='h5' variant='h5' align='center'>
                {data && `${data.name.last_name} ${data.name.first_name} ${data.name.other_names}`}
            </Typography>
            <Grid container spacing={1}>
                <ProfileNamePage
                    profileData={profileData}
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
                <ProfileContent
                    profileData={profileData}
                    select
                    listOptions={gender}
                    fieldLabel='Select Your Gender'
                    fieldName='gender'
                    title='Gender'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                    labelId='gender'
                />
                <ProfileContent
                    profileData={profileData}
                    select
                    listOptions={studentStatus}
                    fieldLabel='Change Status'
                    fieldName='status'
                    title='Status'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                    labelId='status'
                />
                {(profileData && profileData.data && profileData.data.status === 'student') &&
                    <ProfileContent
                    profileData={profileData}
                    select
                    listOptions={studentClass}
                    fieldLabel='Change Current Class'
                    fieldName='current_class'
                    title='Current Class'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                    labelId='currentclass'
                />
                }
                <ProfileContent
                    profileData={profileData}
                    select
                    listOptions={studentClass}
                    fieldLabel='Change Class Of Registration'
                    fieldName='reg_class'
                    title='Class Of Registration'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                    labelId='regclass'
                />
                <ProfileContent
                    profileData={profileData}
                    fieldLabel='Date of Birth'
                    fieldType='date'
                    fieldName='date_of_birth'
                    title='Born on'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
                <ProfileContent
                    profileData={profileData}
                    fieldLabel='Last School Attended'
                    fieldType='text'
                    fieldName='last_sch_attend'
                    title='Last School Attended'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
                <ProfileContent
                    profileData={profileData}
                    select
                    listOptions={bloodGroups}
                    fieldLabel='Select Your blood group'
                    fieldName='blood_group'
                    labelId='bloodgroup'
                    rootStyle={classes.root}
                    titleStyle={classes.title}
                    title='Blood Group'
                />
                <ProfileContent
                    profileData={profileData}
                    select
                    listOptions={genotypes}
                    fieldLabel='Select Your Genotype'
                    fieldName='genotype'
                    labelId='genotype'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                    title='Genotype'
                />
                <ProfileContent
                    profileData={profileData}
                    fieldLabel='Registration Date'
                    fieldType='date'
                    fieldName='reg_date'
                    title='Registered on'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
                <ProfileContent
                    profileData={profileData}
                    fieldLabel='Height'
                    fieldType='number'
                    fieldName='height'
                    title='Height'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
                <ProfileContent
                    profileData={profileData}
                    fieldLabel='Weight'
                    fieldType='number'
                    fieldName='weight'
                    title='Weight'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
            </Grid>
        </Container>
    )
}
