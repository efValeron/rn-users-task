import { cn } from '@/lib/utils'
import * as React from 'react'
import { ReactNode } from 'react'
import { Pressable, PressableProps } from 'react-native'

import { Text } from './text'

type ButtonProps = PressableProps & {
  children: ReactNode
  className?: string
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Pressable
      className={cn(
        props.disabled && 'opacity-50',
        'native:py-3 group flex h-12 items-center justify-center rounded-md bg-[#2563EB] px-5 py-2 active:opacity-90',
        className
      )}
      role={'button'}
      {...props}
    >
      <Text className={'text-base font-medium text-[#F8FAFC]'}>{children}</Text>
    </Pressable>
  )
}

Button.displayName = 'Button'

export { Button }
