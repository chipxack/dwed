import React from "react";
import {Radio} from "antd";
import {ErrorMessage} from "../atoms";


export const RadioGroupSystem = (props) => {
    const {
        options,
        style,
        value,
        change,
        error
    } = props


    return (
        <div>
            <Radio.Group
                style={style}
                value={value}
                onChange={(e) => change(e.target.value)}
            >
                {
                    options && options.length > 0 &&
                    options.map(item => <Radio key={item.value} value={item.value}>{item.name}</Radio>)
                }
            </Radio.Group>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    )
}