import { createHashRouter } from 'react-router'
import { App } from '~/App'
import { About } from '~/routes/About'
import { Home } from '~/routes/Home'

export const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
    ],
  },
])
