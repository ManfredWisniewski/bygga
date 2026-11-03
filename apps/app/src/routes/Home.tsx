import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

export function Home() {
  const { t } = useTranslation()
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">{t('home.title')}</h1>
      <p>{t('home.body')}</p>
      <Tabs defaultValue="components">
        <TabsList>
          <TabsTrigger value="components">{t('home.components')}</TabsTrigger>
          <TabsTrigger value="tokens">{t('home.tokens')}</TabsTrigger>
        </TabsList>
        <TabsContent value="components">
          <Card>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>biti ui/card</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Button>Button</Button>
              <Button variant="outlined">Outlined</Button>
              <Badge>Badge</Badge>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tokens">
          <div className="grid grid-cols-3 gap-2">
            {['primary', 'secondary', 'accent', 'muted', 'destructive', 'card'].map((name) => (
              <div
                key={name}
                className="rounded-lg border border-border p-4 text-sm"
                style={{ background: `var(--${name})`, color: `var(--${name}-foreground)` }}
              >
                {name}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
