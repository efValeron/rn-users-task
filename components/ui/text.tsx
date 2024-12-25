import type { SlottableTextProps } from '@rn-primitives/types'

import { cn } from '@/lib/utils'
import * as Slot from '@rn-primitives/slot'
import * as React from 'react'
import { createContext, useContext } from 'react'
import { Text as RNText } from 'react-native'

const TextClassContext = createContext<string | undefined>(undefined)

const Text = ({ asChild = false, className, ...props }: SlottableTextProps) => {
  const textClass = useContext(TextClassContext)
  const Component = asChild ? Slot.Text : RNText

  return <Component className={cn('text-base text-[#020817]', textClass, className)} {...props} />
}

export { Text, TextClassContext }
