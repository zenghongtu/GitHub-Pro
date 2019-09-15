import request from '@/utils/request'
import { IDefaultParams } from '@/constants'

export const getEvents = (_, params: IDefaultParams) => {
  return request.get<any | null>('/events', params)
}
