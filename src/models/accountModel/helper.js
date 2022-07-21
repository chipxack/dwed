import {PERMISSIONS, PROFILE_TYPE} from "../../constants";

export const getSpecialisms = (data, accountSlug) => {
    const tmp = []
    if (data && data.length > 0) {
        for (let spec of data) {
            tmp.push({
                id: spec.id,
                name: spec.org.name,
                avatar: spec.org.logo,
                text: spec.job.name,
                url: `/@${accountSlug}/jobs?job_id=${spec.id}`,
                slug_name: accountSlug,
                isOfficial: spec.org.is_official,
                category: spec.org.category ? spec.org.category.name : '',
                settings: {
                    auto_mode: spec.auto_mode,
                    is_working: spec.is_working,
                    accepted: spec.accepted
                }
            })
        }
    }
    return tmp
}

export const getAccountName = (item) => {
    if((item.lastname && item.lastname.length > 0) || (item.name && item.name.length > 0)) {
        return `${item.lastname} ${item.name}`
    }else {
        return  item.username
    }
}

export const getAccountInfo = (data, accountSlug) => ({
    name: getAccountName(data),
    avatar: data.avatar,
    perms: [PERMISSIONS.GRAND],
    slug_name: accountSlug,
    url: `/@${accountSlug}`,
    type: PROFILE_TYPE.USER,
    category: data.main_cat || null,
    region: data.region || null,
    lang: data.user_lang,
    status: data.status,
    isOfficial: data.is_official,
    currency: data.currency || null
})

export const getSpecOrg = (data, userInfo) => {
    const tmp = []
    if (data && data.length > 0) {
        for (let spec of data) {
            if (spec.perms && spec.perms.length > 0) {
                tmp.push({
                    name: spec.org.name,
                    avatar: spec.org.logo,
                    status: spec.org.status,
                    currency: userInfo.currency,
                    url: `/${spec.org.slug_name}`,
                    slug_name: spec.org.slug_name,
                    type: PROFILE_TYPE.ORGANIZATION,
                    region: spec.org.region || null,
                    isOfficial: spec.org.is_official,
                    category: spec.org.category || null,
                    perms: spec.perms.map(item => item.permission),
                    lang: userInfo.user_lang
                })
            }
        }
    }
    return tmp
}

export const getOrganizations = (data, userInfo) => {
    const tmp = []
    if (data && data.length > 0) {
        for (let org of data) {
            tmp.push({
                name: org.name,
                avatar: org.logo,
                status: org.status,
                text: org.category.name,
                url: `/${org.slug_name}`,
                slug_name: org.slug_name,
                perms: [PERMISSIONS.GRAND],
                region: org.region || null,
                isOfficial: org.is_official,
                currency: userInfo.currency,
                category: org.category || null,
                type: PROFILE_TYPE.ORGANIZATION,
                lang: userInfo.user_lang
            })
        }
    }
    return tmp
}

export const getLinkedUsers = (data) => {
    const tmp = []

    if(data && data.length > 0) {
        for(let user of data) {
            tmp.push({
                name: user.full_name.trim().length > 0 ? user.full_name : user.username,
                avatar: user.avatar,
                url: `/@${user.username}`,
                slug_name: user.username,
                type: PROFILE_TYPE.USER,
                perms: [PERMISSIONS.GRAND],
                category: user.main_cat || null,
                isOfficial: user.is_official,
                status: user.status
            })
        }
    }

    return tmp
}

export const getUpdated = (data, slug_name, newData) => {
    const idx = data.findIndex(item => item.slug_name === slug_name)
    const item = data.find(item => item.slug_name === slug_name)

    return [...data.slice(0, idx), {...item, ...newData}, ...data.slice(idx + 1)]
}