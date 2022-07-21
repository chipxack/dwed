import React from 'react'
import {Redirect, Route} from "react-router-dom";
import {usePermission} from "../hooks/account";
import {useStore} from "effector-react";
import {$appModel} from "../models/app";


export const PrivateRoute = ({component: Component, redirectPath, permission, ...rest}) => {
    const {loading} = usePermission({redirectPath, permission, path: rest.path})
    const {$app} = useStore($appModel)
    const token = $app.token

    const getComponent = (props) => {
        return token ? !loading && <Component {...props}/> : <Redirect to={'/sign-in'}/>
    }

    return (
        <Route
            {...rest}
            render={getComponent}
        />
    )
}