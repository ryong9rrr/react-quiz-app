import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import App from './App'

describe('App basic', () => {
  test('홈 렌더링', () => {
    renderWithRouter(<App />, { route: '/' })
  })
})

function renderWithRouter(Component: ReactNode, options: { route: string }) {
  return render(<MemoryRouter initialEntries={[options.route]}>{Component}</MemoryRouter>)
}
