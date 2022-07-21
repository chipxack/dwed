const SPECIALIST_MESSAGES = {
    SPECIALIST_ADDED: "specialist_added",
    SPECIALIST_EDITED: "specialist_edited",
    SPECIALIST_REMOVED: 'specialist_removed',
    SPECIALIST_CATEGORY_ADDED: 'specialist_category_added',
    SPECIALIST_CATEGORY_EDITED: 'specialist_category_edited',
    SPECIALIST_CATEGORY_REMOVED: "specialist_category_removed"
}

const OFFERING_MESSAGES = {
    OFFERING_ADDED: "offering_added",
    OFFERING_EDITED: "offering_edited",
    OFFERING_REMOVED: 'offering_removed',
    OFFERINGS_GROUP_ADDED: "offerings_group_added",
    OFFERINGS_GROUP_EDITED: "offerings_group_edited",
    OFFERINGS_GROUP_REMOVED: "offerings_group_removed",
    OFFERINGS_PARAMS_ADDED: "offerings_params_added",
    OFFERINGS_PARAMS_EDITED: "offerings_params_edited",
    OFFERING_PARAMS_REMOVED: 'offering_params_removed'
}

export const MESSAGES = {
    ...OFFERING_MESSAGES,
    ...SPECIALIST_MESSAGES,
    DONOT_HAVE_ACCESS: 'do_not_have_access',
    UNIDENTIFiED_ACCOUNT: 'unidentified_account',
    ORGANIZATION_SENT_TO_MODERARION: "organization_has_been_sent_for_moderation",
    SPECIALIST_ADDED: "specialist_added",
    DATA_SENT_FOR_MODERATION: "data_sent_for_moderation",
    CHANNEL_CREATED: "channel_created",
    CHANNEL_UPDATED: "channel_updated",
    ANNOUNCEMENT_CREATED: "announcement_created"
}