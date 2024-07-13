import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutComponent } from './styles'

export function DefaultLayout() {
  return (
    <LayoutComponent>
      <Header />
      <Outlet />
    </LayoutComponent>
  )
}
