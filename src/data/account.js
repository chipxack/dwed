import {TapeSvg} from "../media/tape";
import {MediaSvg} from '../media';
import {BasketSvg} from '../media';
import {JobBriefcaseSvg} from "../media/job";

export const accountMenuData = {
    tape: {
        id: 'tape',
        icon: TapeSvg,
    },
    media: {
        id: 'media',
        icon: MediaSvg
    },
    offerings: {
        id: 'offerings',
        icon: BasketSvg
    },
    jobs: {
        id: 'jobs',
        icon: JobBriefcaseSvg
    },
    statistics: {
        id: 'statistics',
        icon: false,
        path: 'statistics/finance'
    }
}

export const cardImages = [
    require('../assets/images/1.png').default,
    require('../assets/images/2.png').default,
    require('../assets/images/3.png').default,
    require('../assets/images/4.png').default,
    require('../assets/images/5.png').default,
    require('../assets/images/6.png').default,
    require('../assets/images/7.png').default,
    require('../assets/images/8.png').default,
    require('../assets/images/9.png').default,
    require('../assets/images/10.png').default
]
