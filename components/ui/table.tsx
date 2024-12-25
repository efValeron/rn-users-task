import { cn } from '@/lib/utils'
import * as TablePrimitive from '@rn-primitives/table'
import { ArrowDown01, ArrowDownAZ, ArrowDownUp, ArrowUp01, ArrowUpAZ } from 'lucide-react-native'
import * as React from 'react'
import { ReactNode } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import { Text, TextClassContext } from './text'

const Table = ({ className, ...props }: TablePrimitive.RootProps) => (
  <TablePrimitive.Root className={cn('w-full caption-bottom text-sm', className)} {...props} />
)

const TableHeader = ({ className, ...props }: TablePrimitive.HeaderProps) => (
  <TablePrimitive.Header className={cn('border-slate-200 [&_tr]:border-b', className)} {...props} />
)

const TableBody = ({ className, style, ...props }: TablePrimitive.BodyProps) => (
  <TablePrimitive.Body
    className={cn('flex-1 border-slate-200 [&_tr:last-child]:border-0', className)}
    style={[{ minHeight: 2 }, style]}
    {...props}
  />
)

const TableFooter = ({ className, ...props }: TablePrimitive.FooterProps) => (
  <TablePrimitive.Footer
    className={cn('bg-slate-100/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
)

const TableRow = ({ className, ...props }: TablePrimitive.RowProps) => (
  <TablePrimitive.Row className={cn('flex-row border-b border-slate-200', className)} {...props} />
)

const TableHead = ({
  children,
  className,
  numberSort,
  onSort,
  sortable,
  sortDirection = 'none',
  ...props
}: TablePrimitive.HeadProps & {
  children: ReactNode
  className?: string
  numberSort?: boolean
  onSort?: () => void
  sortable?: boolean
  sortDirection?: 'asc' | 'desc' | 'none'
}) => {
  const renderSortIcon = () => {
    if (!sortable) {
      return null
    }

    const iconColor = '#64748b'
    const iconSize = 10

    if (sortDirection === 'none') {
      return <ArrowDownUp color={iconColor} size={iconSize} />
    }

    let icon

    if (sortDirection === 'asc') {
      icon = numberSort ? (
        <ArrowDown01 color={iconColor} size={iconSize} />
      ) : (
        <ArrowDownAZ color={iconColor} size={iconSize} />
      )
    } else {
      icon = numberSort ? (
        <ArrowUp01 color={iconColor} size={iconSize} />
      ) : (
        <ArrowUpAZ color={iconColor} size={iconSize} />
      )
    }

    return icon
  }

  return (
    <TextClassContext.Provider value={'text-slate-500'}>
      <TouchableWithoutFeedback onPress={sortable ? onSort : undefined}>
        <TablePrimitive.Head
          className={cn(
            'h-12 cursor-pointer justify-center px-4',
            sortDirection !== 'none' && 'bg-slate-200',
            className
          )}
          {...props}
        >
          <Text>
            {children} {renderSortIcon()}
          </Text>
        </TablePrimitive.Head>
      </TouchableWithoutFeedback>
    </TextClassContext.Provider>
  )
}

const TableCell = ({
  className,
  sorted,
  ...props
}: TablePrimitive.CellProps & { sorted: boolean }) => (
  <TablePrimitive.Cell
    className={cn('p-4 align-middle', sorted && 'bg-slate-200/25', className)}
    {...props}
  />
)

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow }
