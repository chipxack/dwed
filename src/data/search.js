import { URL_VALUES } from '../constants'
import { LiveCommonSvg } from '../media'
import { allOfferingsMount } from '../models/offering-model'
import { allOrganizationMount } from '../models/organization-models'
import { TapeSvg } from '../media/tape'
import { getCommonApiParams } from '../utils/app-utils'
import { allStreamMount } from '../models/user-models'
import { BriefcaseCustomSvg, OfferingCustomSvg } from '../media/briefcase'

const params = getCommonApiParams()

export const searchFilters = [
  {
    id: URL_VALUES.TAPE,
    title: 'tape',
    icon: TapeSvg,
    onClick: () => false
  },
  {
    id: URL_VALUES.OFFERINGS,
    title: 'offerings',
    icon: OfferingCustomSvg,
    onClick: () => {
      allOfferingsMount(params)
    },
    check: true
  },
  {
    id: URL_VALUES.ORGANIZATION,
    title: 'organizations',
    icon: BriefcaseCustomSvg,
    onClick: () => allOrganizationMount(params),
    check: true
  },
  // {
  //     id: URL_VALUES.PEOPLE,
  //     title: 'people',
  //     icon: PeopleCustomSvg,
  //     onClick: () => getUserListEvent(params)
  // },
  {
    id: URL_VALUES.STREAM,
    title: 'stream',
    icon: LiveCommonSvg,
    onClick: () => allStreamMount(params)
  }
]