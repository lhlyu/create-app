import { createI18n } from 'vue-i18n'

const messages = {
    zh: {}
}

const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages
})

export default i18n
