import React, {  } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fatchParents } from '../../../redux/actions/admin-action';
import ParentContact from '../parents/ParentContact';

const AllParents = () => {

    const dispatch = useDispatch();
    const parents = useSelector(state => state.admin.parents.data);

  
    const onClick = () => {
        dispatch(fatchParents())
    }
    
    return (
        <>
            {
                parents && parents.filter(parent => parent.children.length > 0)
                .map((parent, index) => 
                <ParentContact key={parent._id} parent={parent} />)
            }
            <button onClick={onClick}>{parents? "Refresh": "Fetch Parents"}</button>
        </>
    )
}

export default AllParents;