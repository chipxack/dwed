import {useCallback, useEffect} from "react";
import {orgCartMount} from "../../models/order-models";
import {useParams} from "react-router-dom";
import {useStore} from "effector-react";
import {$appModel} from "../../models/app";

export const useAccountCart = () => {
    const {$app: {token}} = useStore($appModel)
    const {organization} = useParams()

    const getCart = useCallback((params) => {
        if (organization) {
            orgCartMount({organization, ...params})
        }
    }, [organization])

    useEffect(() => {
        if (token) {
            const data = {
                clear: true,
                params: {
                    limit: 20,
                    offset: 0
                }
            }
            getCart(data)
        }
    }, [getCart, token])
}