import { serverUrl } from '@/main';

export const getFileRealUrl = (qname: string) =>
  `${serverUrl}/storage/download/${qname}`;