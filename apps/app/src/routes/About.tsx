import { useTranslation } from 'react-i18next'

export function About() {
  const { t } = useTranslation()
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">{t('about.title')}</h1>
      <p>{t('about.body')}</p>
    </div>
  )
}
