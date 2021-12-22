import React, {useEffect} from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import DataFetchingProgress from '../other-components/DataFetchingProgress';
import { isEmptyArrayOrObject, setPageTitle } from '../../libs/utility-functions';
import Errors from '../other-components/Errors';
import { fetchScratchCards } from '../../redux/actions/admin-action';

const Cards = () => {
    setPageTitle('Cards');
    const { data, error, isFetchingScratchCard } = useSelector(state => state.admin.scratchCards)
    const dispatch = useDispatch();
    
    useEffect(()=> {
        if(data === null && error === null){
            dispatch(fetchScratchCards());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isFetchingScratchCard) {
        return <DataFetchingProgress />
    }
    else if (!isEmptyArrayOrObject(error)) {
        return <Errors errors={error} />
    }
    else if (!isEmptyArrayOrObject(data)) {
        return <Grid container spacing={1} >
            {data.map(card => <Card key={card._id} card={card} />)}
        </Grid>
    }
    else {
        return <h4>No available cards</h4>
    }


}
export default Cards
