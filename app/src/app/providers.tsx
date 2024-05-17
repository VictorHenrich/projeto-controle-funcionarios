'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
  colors: {
    primary: "#2B6CB0",
    secondary: "#EDF2F7"
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}