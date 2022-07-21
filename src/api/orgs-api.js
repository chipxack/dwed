import {httpGet, httpPost} from "../api";

export const getOrgList = ({params}) => httpGet({
    url: '/orgs/', params
});

export const orgsValidateValue = (data) => httpPost({
    url: '/orgs/validate/', data
})

export const createMyOrganization = (data) => httpPost({
    url: '/orgs/my/', headers: {"Content-Type": "multipart/form-data"}, data
})

export const getOrgDetail = (org_slug_name) => httpGet({
    url: `/orgs/${org_slug_name}/`
});

export const getOrganizationSubscribers = (params) => httpGet({
    url: `/orgs/${params.org_slug_name}/subs/me/`, params
});

export const getOrganizationSubscriptions = (params) => httpGet({
    url: `/orgs/${params.org_slug_name}/subs/my/`, params
});

export const createOrgCatForSpec = ({organization, data}) => httpPost({
    url: `/orgs/${organization}/spec_cats/`, data
})

export const getOffersOrganization = ({organization, params}) => httpGet({
    url: `/orgs/${organization}/offerings/`, params
});

export const specJobMountCategoriesOrganization = (organization) => httpGet({
    url: `/orgs/${organization}/spec_cats/`
});

export const createSpecForOrganization = (organization, data) => httpPost({
    url: `/orgs/${organization}/specs/`, data
})

export const getSpecialistsOrganization = ({organization, params}) => httpGet({
    url: `/orgs/${organization}/specs/`, params
})

export const createOrgOfferGroup = (orgSlug, data) => httpPost({
    headers: {"Content-Type": "multipart/form-data"}, url: `/orgs/${orgSlug}/offerings_groups/`, data
})

export const getOrgOffersGroups = ({organization, params}) => httpGet({
    url: `/orgs/${organization}/offerings_groups/`, params
})

export const createOrgOffers = (organization, data) => httpPost({
    url: `/orgs/${organization}/offerings/`, data
})