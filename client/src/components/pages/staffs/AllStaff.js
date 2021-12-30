import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import Staff from './Staff';
import { fetchAllStaffs } from '../../../redux/actions/admin-action';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import Errors from '../../other-components/Errors';


const AllStaff = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllStaffs())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { data, error, isFetchingAllStaffs } = useSelector(state => state.admin.staffs);
    return (
        <>
            {
                error && <Errors errors={error} goBack />
            }
            {
                isFetchingAllStaffs && <DataFetchingProgress />
            }
            {
                data && <List>
                    {
                        data.map(staff => <ListItem key={staff._id}>
                            <Staff staff={staff} />
                        </ListItem>)
                    }
                </List>
            }
        </>
    )
}

export default AllStaff
