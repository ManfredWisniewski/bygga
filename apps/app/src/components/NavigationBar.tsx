import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { LanguageToggle } from '~/components/LanguageToggle'
import { ThemeToggle } from '~/components/ThemeToggle'

export function NavigationBar() {
  const { t } = useTranslation()
  return (
    <header className="flex items-center gap-4 border-b border-border px-6 py-3">
      <Link to="/" className="font-semibold">
        {t('app.name')}
      </Link>
      <nav className="flex gap-3 text-sm">
        <Link to="/">{t('nav.home')}</Link>
        <Link to="/about">{t('nav.about')}</Link>
      </nav>
      <div className="ms-auto flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  )
}
