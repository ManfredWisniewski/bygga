import { Outlet } from 'react-router'
import { NavigationBar } from '~/components/NavigationBar'

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationBar />
      <main className="mx-auto max-w-3xl p-6">
        <Outlet />
      </main>
    </div>
  )
}
