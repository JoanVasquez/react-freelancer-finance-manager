'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/features'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </PersistGate>
    </Provider>
  )
}
