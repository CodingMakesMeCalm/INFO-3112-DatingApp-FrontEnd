export interface PersonalMessage {
  send_from: number;
  send_from_name: string;
  send_to: number;
  send_to_name: string;
  message: string;
  read: boolean;
}

export interface UserInfo {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  gender: string;
  address: string;
  city: string;
  province: string;
  lat: number;
  lng: number;
}
