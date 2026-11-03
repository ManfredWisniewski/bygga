import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useThemeChoice } from '~/lib/theme'

const CYCLE = ['system', 'light', 'dark'] as const

export function ThemeToggle() {
  const { t } = useTranslation()
  const [choice, setChoice] = useThemeChoice()
  const next = CYCLE[(CYCLE.indexOf(choice) + 1) % CYCLE.length] ?? 'system'
  return (
    <Button
      variant="outlined"
      size="sm"
      onClick={() => setChoice(next)}
      aria-label={t('theme.toggle')}
    >
      {t(`theme.${choice}`)}
    </Button>
  )
}
