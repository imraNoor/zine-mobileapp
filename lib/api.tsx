import Axios, {AxiosResponse, AxiosError} from 'axios';
const baseURL = 'https://zine.accrualhub.com/public/api/';
const commonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const axios = Axios.create({baseURL, headers: commonHeaders});

const Login = (payload: any) => {
  return axios
    .post('/login', payload)
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};
const Register = (payload: any) => {
  return axios
    .post('/register', payload)
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};

export default {Login,Register};
