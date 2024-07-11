import { ThemeProvider } from 'styled-components'

import { Button } from "./components/Button";
import { defaultTheme } from './styles/themes/default';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <h2>Hello word</h2>
        <Button color="primary" />
        <Button color="secondary" />
        <Button color="sucess" />
        <Button color="danger" />
        <Button />
      </ThemeProvider>
  )
}
