import {GridSvg, OfferSvg, PeopleSvg, PersonUnFillSvg} from "../media";

export function dropdownMenu(path, type) {
    return [
        {
            hidden: type !== 'organization',
            id: 'add_specialist_category',
            path: `/${path}/offerings/specialist_category/add`,
            icon: PeopleSvg,
            type: 'specialists',
            pathType: 'offerings'
        },
        {
            hidden: type !== 'organization',
            id: 'add_specialist',
            path: `/${path}/offerings/specialist/add`,
            icon: PersonUnFillSvg,
            type: 'specialists',
            pathType: 'offerings'
        },
        {
            hidden: false,
            id: 'add_offer_group',
            path: `/${path}/offerings/offerings_group/add`,
            icon: GridSvg,
            type: 'offerings',
            pathType: 'offerings'
        },
        {
            hidden: false,
            id: 'add_offer',
            path: `/${path}/offerings/add`,
            icon: OfferSvg,
            type: "offerings",
            pathType: 'offerings'
        }
    ]
}