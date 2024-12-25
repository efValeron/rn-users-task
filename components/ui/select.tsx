import { cn } from '@/lib/utils'
import * as SelectPrimitive from '@rn-primitives/select'
import { Check, ChevronDown } from 'lucide-react-native'
import * as React from 'react'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

type Option = SelectPrimitive.Option

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = ({ children, className, ...props }: SelectPrimitive.TriggerProps) => (
  <SelectPrimitive.Trigger
    className={cn(
      'bg-background flex h-12 flex-row items-center justify-between rounded-md border border-[#E2E8F0] px-3 py-2 text-sm text-[#64748B] [&>span]:line-clamp-1',
      props.disabled && 'opacity-50',
      className
    )}
    {...props}
  >
    <>{children as ReactNode}</>
    <ChevronDown aria-hidden className={'opacity-50'} color={'#020817'} size={16} />
  </SelectPrimitive.Trigger>
)

const SelectContent = ({
  children,
  className,
  portalHost,
  position = 'popper',
  ...props
}: SelectPrimitive.ContentProps & { portalHost?: string }) => {
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay style={StyleSheet.absoluteFill}>
        <Animated.View className={'z-50'} entering={FadeIn} exiting={FadeOut}>
          <SelectPrimitive.Content
            className={cn(
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-1 py-2 shadow-md shadow-[#020817]/10',
              position === 'popper' &&
                'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
              className
            )}
            position={position}
            {...props}
          >
            <SelectPrimitive.Viewport
              className={cn(
                'p-1',
                position === 'popper' &&
                  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  )
}

const SelectLabel = ({ className, ...props }: SelectPrimitive.LabelProps) => (
  <SelectPrimitive.Label
    className={cn('py-1.5 pb-2 pl-8 pr-2 text-sm font-semibold text-[#020817]', className)}
    {...props}
  />
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectItem = ({ children, className, ...props }: SelectPrimitive.ItemProps) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex w-full flex-row items-center rounded-sm py-2 pl-8 pr-2 active:bg-[#F1F5F9]',
      props.disabled && 'opacity-50',
      className
    )}
    {...props}
  >
    <View className={'absolute left-3.5 flex h-3.5 w-3.5 items-center justify-center pt-px'}>
      <SelectPrimitive.ItemIndicator>
        <Check color={'#020817'} size={16} strokeWidth={3} />
      </SelectPrimitive.ItemIndicator>
    </View>
    <SelectPrimitive.ItemText className={'text-sm text-[#020817]'} />
  </SelectPrimitive.Item>
)

const SelectSeparator = ({ className, ...props }: SelectPrimitive.SeparatorProps) => (
  <SelectPrimitive.Separator className={cn('-mx-1 my-1 h-px bg-[#F1F5F9]', className)} {...props} />
)

export {
  type Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
