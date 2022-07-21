import {EstetikaProgressSvg, FriendshipProgressSvg, SkillProgressSvg} from "../media";
import {RATING} from "../constants/rating";

export const ratingData = [
    {
        type: 1,
        id: RATING.PROFESSIONAL,
        color: 'var(--info-dwed)',
        shadow_color: 'var(--info-dwed-box-shadow)',
        icon: SkillProgressSvg,

    },
    {
        type: 2,
        id: RATING.ETHICS,
        color: 'var(--purple-dwed)',
        shadow_color: 'var(--purple-dwed-box-shadow)',
        icon: EstetikaProgressSvg,
    },
    {
        type: 3,
        id: RATING.AESTHETICS,
        color: 'var(--orange-dwed)',
        shadow_color: 'var(--orange-dwed-box-shadow)',
        icon: FriendshipProgressSvg,
    }
]