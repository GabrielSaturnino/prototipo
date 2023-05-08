import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const ProtectedRoutes = () => {
    const user = Meteor.user();

    const protected = user != undefined;
    return (
        <>
            {protected != false ? <Outlet /> : <Navigate to={'/'} />}
        </>
    );
}
