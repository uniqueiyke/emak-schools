import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DataFetchingProgress from '../other-components/DataFetchingProgress';
import { isEmptyArrayOrObject, setPageTitle } from '../../libs/utility-functions';
import Errors from '../other-components/Errors';
import { fetchScratchCards, fetchAllScratchCards } from '../../redux/actions/admin-action';
import Button from '@material-ui/core/Button';

const Cards = ({ all }) => {
    setPageTitle('Cards');
    const [selected, setSelected] = useState([])
    const { data, error, isFetchingScratchCard } = useSelector(state => state.admin.scratchCards);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        if (!all) {
            dispatch(fetchScratchCards());
        } else {
            dispatch(fetchAllScratchCards());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSelected = e => {
        if (e.target.checked) {
            setSelected([...selected, e.target.id]);
        } else {
            const newSelecte = selected.filter(id => id !== e.target.id)
            setSelected(newSelecte);
        }
    }

    if (isFetchingScratchCard) {
        return <DataFetchingProgress />
    }
    else if (!isEmptyArrayOrObject(error)) {
        return <Errors errors={error} />
    }
    else if (!isEmptyArrayOrObject(data)) {
        return <>
            <Grid container spacing={1} >
                {data.map(card => <Card
                    key={card._id}
                    card={card}
                    onClick={onSelected}
                />)}
            </Grid>
            <Button disabled={selected.length <= 0} onClick={() =>  history.push('/admin/print-cards', { ids: selected })}>Print Cards</Button>
        </>
    }
    else {
        return <h4>No available cards</h4>
    }


}
export default Cards
