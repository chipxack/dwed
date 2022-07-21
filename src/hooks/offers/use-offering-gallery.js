import {useEffect} from 'react'
import {offeringGalleryMount} from '../../models/offering-model'

export function useOfferingGallery(id) {
    useEffect(() => {
        if(id) {
            offeringGalleryMount(id)
        }
    }, [])
}