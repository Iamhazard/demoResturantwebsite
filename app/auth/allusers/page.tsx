'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { getAlluser, selectUsers } from '@/Redux/Features/AuthSlice';

const Allusers = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(getAlluser());
    }, [dispatch]);

    useEffect(() => {
        if (users?.length > 0) {
            console.log('Fetched Users:', users);
        }
    }, [users]);

    return (
        <div>
            {users?.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    );
};

export default Allusers;
