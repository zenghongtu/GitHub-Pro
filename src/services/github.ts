import { IDefaultParams } from '@/constants';
import request from '@/utils/request';

export const getEvents = (_, params: IDefaultParams) => {
  return request.get<any | null>('/events', params);
};
