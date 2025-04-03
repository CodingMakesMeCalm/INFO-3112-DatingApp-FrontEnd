import { request } from 'umi';

export async function requestToGetUsersByCity(params: any) {
  return request(`/matching-users-city/${params.city}`, {
    method: 'GET',
  });
}

export async function requestToGetUsersByGender(params: any) {
  return request(`/matching-users-gender/${params.gender}`, {
    method: 'GET',
  });
}
