import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './global.css'

import { Stack } from 'expo-router'

export default function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  )
}
