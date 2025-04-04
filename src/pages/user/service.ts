import { request } from 'umi';

export async function requestToGetAllUsers() {
  return request(`/all-users`, {
    method: 'GET',
  });
}

export async function requestToLogin(params: {
  username: string;
  password: string;
}) {
  return request('/login', {
    method: 'POST',
    data: params,
  });
}

export async function requestToRegister(params: {
  username: string;
  password: string;
  name: string;
  email: string;
  gender: string;
  address: string;
  city: string;
  province: string;
}) {
  return request(`/register`, {
    method: 'POST',
    data: params,
  });
}

export async function requestToUpdateUserProfile(params: {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  gender: string;
  address: string;
  city: string;
  province: string;
}) {
  return request(`/update-user`, {
    method: 'PUT',
    data: params,
  });
}

export async function requestToAddNewPost(params: {
  author_id: number;
  author_name: string;
  title: string;
  content: string;
}) {
  return request(`/new-post`, {
    method: 'POST',
    data: params,
  });
}

export async function requestToGetPersonalMessage(params: any) {
  return request(`/personal-message/${params.userId}`, {
    method: 'GET',
  });
}

export async function requestToSetMessageRead(params: {
  userId: number;
  messageId: number;
}) {
  return request('/set-message-read', {
    method: 'PUT',
    data: params,
  });
}
