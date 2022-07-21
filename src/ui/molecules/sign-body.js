import React from 'react';
import {SignBody} from "../atoms";
import dwed from '../../assets/images/DWED.png'

export const SignBodyTemplate = (props) => {
    const {children} = props;
    return (
        <SignBody>
            <div className='dwed-text'>
                <img src={dwed} alt='dwed'/>
            </div>
            {children}
        </SignBody>
    )
};
