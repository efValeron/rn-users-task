import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { GetUsersResponse } from '@/types/responses'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useMemo, useState } from 'react'
import { ActivityIndicator, ScrollView, useWindowDimensions, View } from 'react-native'

export const baseApi = axios.create({
  baseURL: 'https://dummyjson.com',
})

const MIN_COLUMN_WIDTHS = [120, 120, 300, 80, 120]

const fetchUsers = async ({
  filter,
  limit,
  skip,
  sortConfig,
}: {
  filter?: null | { key: string; value: string }
  limit?: number
  skip?: number
  sortConfig?: { direction: 'asc' | 'desc' | 'none'; key: string }
}) => {
  const urlParams = new URLSearchParams()

  if (sortConfig && sortConfig.direction !== 'none') {
    urlParams.set('sortBy', sortConfig.key)
    urlParams.set('order', sortConfig.direction)
  }
  const filterParam =
    filter && filter.value !== 'all' ? `/filter?key=${filter.key}&value=${filter.value}` : ''

  const res = await baseApi.get<GetUsersResponse>(
    `/users?${limit && skip ? `limit=${limit}&skip=${skip}` : ''}${
      urlParams.toString() ? `&${urlParams.toString()}` : ''
    }${filterParam}`
  )

  return res.data
}

export default function Index() {
  const { width } = useWindowDimensions()
  const [sortConfig, setSortConfig] = useState<{
    direction: 'asc' | 'desc' | 'none'
    key: string
  }>({ direction: 'none', key: '' })
  const [filter, setFilter] = useState<null | { key: string; value: string }>(null)

  const [page, setPage] = useState(1)
  const limit = 30
  const skip = (page - 1) * limit

  const columnWidths = useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length

      return evenWidth > minWidth ? evenWidth : minWidth
    })
  }, [width])

  const handleSort = (key: string) => {
    setSortConfig((prevState) => {
      let newDirection: 'asc' | 'desc' | 'none' = 'asc'

      if (prevState.key === key) {
        if (prevState.direction === 'asc') {
          newDirection = 'desc'
        } else if (prevState.direction === 'desc') {
          newDirection = 'none'
        }
      }

      return { direction: newDirection, key }
    })
  }

  const { data, error, isLoading, refetch } = useQuery({
    queryFn: () => fetchUsers({ filter, limit, skip, sortConfig }),
    queryKey: ['users', sortConfig, filter, page, limit, skip],
  })

  const totalPages = data ? Math.ceil(data.total / limit) : 1

  return (
    <View className={'flex flex-1 items-center justify-center bg-[#FFFFFF]'}>
      <ScrollView>
        <View className={'flex w-full flex-col gap-4 p-4'}>
          <Select
            onValueChange={(option) => {
              setSortConfig({ direction: 'none', key: '' })
              setFilter({ key: 'role', value: option ? option['value'] : '' })
              setPage(1)
            }}
            value={{
              label: filter?.value
                ? `${filter.value.charAt(0).toUpperCase()}${filter.value.slice(1)}`
                : 'All',
              value: filter?.value || 'all',
            }}
          >
            <SelectTrigger className={'w-[150px]'}>
              <SelectValue
                className={'text-foreground native:text-lg text-sm'}
                placeholder={'Select a role'}
              />
            </SelectTrigger>
            <SelectContent className={'w-[150px]'}>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem label={'All'} value={'all'}>
                  All
                </SelectItem>
                <SelectItem label={'Admin'} value={'admin'}>
                  Admin
                </SelectItem>
                <SelectItem label={'Moderator'} value={'moderator'}>
                  Moderator
                </SelectItem>
                <SelectItem label={'User'} value={'user'}>
                  User
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  onSort={() => handleSort('firstName')}
                  sortable={filter === null || filter?.value === 'all'}
                  sortDirection={sortConfig.key === 'firstName' ? sortConfig.direction : 'none'}
                  style={{ width: columnWidths[0] }}
                >
                  First Name
                </TableHead>
                <TableHead
                  onSort={() => handleSort('username')}
                  sortable={filter === null || filter?.value === 'all'}
                  sortDirection={sortConfig.key === 'username' ? sortConfig.direction : 'none'}
                  style={{ width: columnWidths[1] }}
                >
                  Username
                </TableHead>
                <TableHead style={{ width: columnWidths[2] }}>Email</TableHead>
                <TableHead
                  numberSort
                  onSort={() => handleSort('age')}
                  sortable={filter === null || filter?.value === 'all'}
                  sortDirection={sortConfig.key === 'age' ? sortConfig.direction : 'none'}
                  style={{ width: columnWidths[3] }}
                >
                  Age
                </TableHead>
                <TableHead
                  onSort={() => handleSort('role')}
                  sortable={filter === null || filter?.value === 'all'}
                  sortDirection={sortConfig.key === 'role' ? sortConfig.direction : 'none'}
                  style={{ width: columnWidths[4] }}
                >
                  Role
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow className={'items-center justify-center'}>
                  <TableCell>
                    <ActivityIndicator color={'#000'} size={'large'} />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow className={'items-center justify-center'}>
                  <TableCell>
                    <Text className={'text-red-500'}>Something went wrong. Please try again.</Text>
                    <Button className={'mt-4'} onPress={() => refetch()}>
                      Try again
                    </Button>
                  </TableCell>
                </TableRow>
              )}
              {data &&
                data.users.map((user, index) => (
                  <TableRow className={cn(index % 2 && 'bg-slate-100/40')} key={user.id}>
                    <TableCell
                      sorted={sortConfig.key === 'firstName' && sortConfig.direction !== 'none'}
                      style={{ width: columnWidths[0] }}
                    >
                      <Text>{user.firstName}</Text>
                    </TableCell>
                    <TableCell
                      sorted={sortConfig.key === 'username' && sortConfig.direction !== 'none'}
                      style={{ width: columnWidths[1] }}
                    >
                      <Text>{user.username}</Text>
                    </TableCell>
                    <TableCell
                      sorted={sortConfig.key === 'email' && sortConfig.direction !== 'none'}
                      style={{ width: columnWidths[2] }}
                    >
                      <Text>{user.email}</Text>
                    </TableCell>
                    <TableCell
                      sorted={sortConfig.key === 'age' && sortConfig.direction !== 'none'}
                      style={{ width: columnWidths[3] }}
                    >
                      <Text>{user.age}</Text>
                    </TableCell>
                    <TableCell
                      sorted={sortConfig.key === 'role' && sortConfig.direction !== 'none'}
                      style={{ width: columnWidths[4] }}
                    >
                      <Text>{user.role}</Text>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollView>
        <View className={'flex flex-row items-center justify-center p-4'}>
          <Button disabled={page === 1 || isLoading} onPress={() => setPage((prev) => prev - 1)}>
            Previous
          </Button>
          <Text className={'px-4'}>
            {page} of {totalPages} page
          </Text>
          <Button
            disabled={page === totalPages || totalPages === 0 || isLoading}
            onPress={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
