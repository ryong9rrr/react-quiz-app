import React, { PropsWithChildren } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import type { PreloadedState } from '@reduxjs/toolkit'

import { AppStore, RootState, setupStore } from '@/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  // eslint-disable-next-line
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
