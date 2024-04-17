import axios from "axios";
export function login(phone: string, password: string) {
  return axios.get(`/api/login/cellphone?phone=${phone}&password=${password}`);
}
