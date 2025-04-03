import { request } from 'umi';

export async function requestToGetAllPosts() {
  return request('/all-posts', {
    method: 'GET',
  });
}

export async function requestToSendMessage(params: {
  send_from: number;
  send_from_name: string;
  send_to: number;
  send_to_name: string;
  message: string;
}) {
  return request(`/new-message`, {
    method: 'POST',
    data: params,
  });
}
