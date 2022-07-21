import React from 'react'
import {Route, Switch} from "react-router-dom";
import {ReviewsForm, ReviewsList} from "../organisms";
import {ReviewsWireframe} from "../../../UIComponents/wireframe/organisms";

export const Reviews = () => {
    return (
        <ReviewsWireframe>
            <Switch>
                <Route path='/reviews/add/:orderId' component={ReviewsForm}/>
                <Route path='/reviews' component={ReviewsList}/>
            </Switch>
        </ReviewsWireframe>
    )
}