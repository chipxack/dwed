import i18n from '../config/i18n'

export const statisticsNav = [
    {
        id: 'finance',
        value: i18n.t('finance'),
        short: i18n.t('income_expenses')
    },
    {
        id: 'requests',
        value: i18n.t('requests'),
        short: i18n.t('most_visited_clients')
    },
    {
        id: 'clients',
        value: i18n.t('clients'),
        short: i18n.t('most_visited_clients')
    },
    {
        id: 'offer',
        value: i18n.t('offerings'),
        short: i18n.t('best_offers')
    },
    {
        id: 'employees',
        value: i18n.t('employees'),
        short: i18n.t('best_employees')
    }
]