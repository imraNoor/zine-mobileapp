import Axios, {AxiosResponse, AxiosError} from 'axios';
const baseURL = 'https://zine.accrualhub.com/public/';
const commonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const axios = Axios.create({
  baseURL: baseURL + 'api/',
  headers: commonHeaders,
});
import {Store} from '../_redux';
const getCustomHeader = (multipart: boolean = false) => {
  const {
    USER: {detail, loggedIn},
  } = Store.getState();
  return {
    //timeout,
    headers: {
      Accept: 'application/json',
      'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
      Authorization: loggedIn ? `Bearer ${detail.token}` : undefined,
    },
  };
};
const getServerImage = (pth: string) => ({uri: baseURL + pth});

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
const UploadImage = (payload: any) => {
  return axios
    .post('/update/profile/image', payload, {...getCustomHeader(true)})
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};
const UpdateInfo = (payload: any) => {
  return axios
    .post('/update/profile', payload, {...getCustomHeader()})
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};
const GiveReview = (payload: any) => {
  return axios
    .post('/appointment/rating', payload, {...getCustomHeader()})
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};
const GetAppointmentDetail = (payload: number) => {
  return axios
    .get('/appointment/' + payload, {...getCustomHeader()})
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};
const GetAllAppointments = () => {
  return axios
    .get('/appointments', {...getCustomHeader()})
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};
const GetAppointmentCounts = () => {
  return axios
    .get('/appointment-history', {...getCustomHeader()})
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};
const GetCompaignLink = () => {
  return axios
    .get('/compaign-link', {...getCustomHeader()})
    .then(({data}: AxiosResponse) => data)
    .catch(({response}: AxiosError) => {
      return response?.data;
    });
};
export default {
  Login,
  Register,
  UploadImage,
  UpdateInfo,
  GiveReview,
  GetAppointmentDetail,
  GetAllAppointments,
  getServerImage,
  GetCompaignLink,
  baseURL,
  GetAppointmentCounts,
};
