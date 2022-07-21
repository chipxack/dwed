import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from '../api'

export default {
  getAllOrganization: ({params}) => httpGet({url: '/orgs/', params}),
  subscribe: (organization) => httpPost({url: `/orgs/${organization}/subs/me/`}),
  getOrgDetail: ({organization}) => httpGet({url: `/orgs/${organization}/`}),
  getSpecCatList: ({organization, params}) => httpGet({
    url: `/orgs/${organization}/spec_cats/`, params
  }),
  removeSpecialistCategory: ({id, organization}) => httpDelete({
    url: `/orgs/${organization}/spec_cats/${id}/`
  }),
  getSpecCatListInfo: ({id, organization}) => httpGet({url: `/orgs/${organization}/spec_cats/${id}/`}),
  getSpecialist: ({organization, params}) => httpGet({url: `/orgs/${organization}/specs/`, params}),
  updateSpecialistCategory: ({id, organization, data}) => httpPut({
    url: `/orgs/${organization}/spec_cats/${id}/`, data
  }),
  createOrgSpecialist: ({organization, data}) => httpPost({url: `/orgs/${organization}/specs/`, data}),
  createOrgSpecialistCategory: ({organization, data}) => httpPost({
    url: `/orgs/${organization}/spec_cats/`, data
  }),
  getOrgAllOfferings: ({organization, params}) => httpGet({url: `/orgs/${organization}/offerings/`, params}),
  getOrgOffering: ({organization, id}) => httpGet({url: `/orgs/${organization}/offerings/${id}/`}),
  getOrgOfferingGroup: ({organization, params}) => httpGet({
    url: `/orgs/${organization}/offerings_groups/`, params
  }),
  createOrganization: ({data}) => httpPost({
    url: '/orgs/my/',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  }),
  validateSlugName: (data) => httpPost({url: '/orgs/validate/', data}),
  createOrgOffering: ({data, organization}) => httpPost({url: `/orgs/${organization}/offerings/`, data}),
  getOrgSpecDetail: ({id, organization}) => httpGet({url: `/orgs/${organization}/specs/${id}/`}),
  getOrgSpecPermsList: ({id, organization}) => httpGet({url: `/orgs/${organization}/specs/${id}/perms/`}),
  createOrgSpecPerms: ({id, organization, data}) => httpPost({url: `/orgs/${organization}/specs/${id}/perms/`, data}),
  removeOrgSpecPerms: (
    {
      id,
      organization,
      perm_id
    }) => httpDelete({url: `/orgs/${organization}/specs/${id}/perms/${perm_id}/`}),
  updateSpecialist: ({id, organization, data}) => httpPut({url: `/orgs/${organization}/specs/${id}/`, data}),
  removeSpecialist: ({id, organization}) => httpDelete({url: `/orgs/${organization}/specs/${id}/`}),
  getOrgOfferingGroupInfo: ({id, organization}) => httpGet({
    url: `/orgs/${organization}/offerings_groups/${id}`
  }),
  updateOrgOfferingGroup: ({id, organization, data}) => httpPatch({
    url: `/orgs/${organization}/offerings_groups/${id}/`, data, headers: {'Content-Type': 'multipart/form-data'}
  }),
  createOrgOfferingGroup: ({organization, data}) => httpPost({
    url: `/orgs/${organization}/offerings_groups/`, data, headers: {'Content-Type': 'multipart/form-data'}
  }),
  removeOfferingGroup: ({id, organization}) => httpDelete({
    url: `/orgs/${organization}/offerings_groups/${id}/`
  }),
  updateOrgInfo: ({data, organization}) => httpPatch({
    url: `/orgs/${organization}/`,
    headers: {'Content-Type': 'multipart/form-data'},
    data
  }),
  subscribeToOrg: (orgName) => httpPost({url: `/orgs/${orgName}/subs/me/`}),
  createOrgCoupon: ({organization, data}) => httpPost({
    url: `/orgs/${organization}/offerings_coupons/`, data,
    headers: {
      'org-slug-name': organization
    }
  }),
  getOrgCouponList: ({organization, params}) => httpGet({
    url: `/orgs/${organization}/offerings_coupons/`, params,
    headers: {
      'org-slug-name': organization
    }
  }),
  removeOrgCoupon: ({organization, id}) => httpDelete({
    url: `/orgs/${organization}/offerings_coupons/${id}/`,
    headers: {
      'org-slug-name': organization
    }
  }),
  updateOrgCoupon: ({organization, id, data}) => httpPatch({
    url: `/orgs/${organization}/offerings_coupons/${id}/`,
    data,
    headers: {
      'org-slug-name': organization
    }
  }),
  getOrgCoupon: ({organization, id}) => httpGet({url: `/orgs/${organization}/offerings_coupons/${id}/`}),
  getOrgCouponReceiversList: (
    {
      organization,
      id,
      params
    }) => httpGet({
    url: `/orgs/${organization}/offerings_coupons/${id}/receivers/`, params, headers: {
      'org-slug-name': organization
    }
  }),
  createOrgCouponReceiver: ({organization, id, data}) => httpPost({
    url: `/orgs/${organization}/offerings_coupons/${id}/receivers/`, data, headers: {
      'org-slug-name': organization
    }
  }),
  removeOrgCouponReceiver: (
    {
      organization,
      id,
      receiver_id
    }) => httpDelete({
    url: `/orgs/${organization}/offerings_coupons/${id}/receivers/${receiver_id}/`,
    headers: {
      'org-slug-name': organization
    }
  }),
  createOrgPaymentMethod: ({data, organization}) => httpPost({
    url: `/orgs/${organization}/payment_methods/`,
    headers: {
      'org-slug-name': organization
    },
    data
  }),
  updateOrgPaymentMethod: ({data, organization, id}) => httpPatch({
    url: `/orgs/${organization}/payment_methods/${id}/`,
    headers: {
      'org-slug-name': organization
    },
    data
  }),
  getOrgPaymentMethodList: ({params, organization}) => httpGet({
    url: `/orgs/${organization}/payment_methods/`,
    headers: {
      'org-slug-name': organization
    },
    params
  })
}
