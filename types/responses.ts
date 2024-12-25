import { Users } from './instances'

export type GetUsersResponse = {
  limit: number
  skip: number
  total: number
  users: Users[]
}
