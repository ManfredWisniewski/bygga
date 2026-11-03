import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const next = i18n.language === 'de' ? 'en' : 'de'
  return (
    <Button variant="text" size="sm" onClick={() => i18n.changeLanguage(next)}>
      {t('lang.switch')}
    </Button>
  )
}
