import { AxiosError } from 'axios';
import { api } from 'boot/axios';
import qs from "qs";

import { API_ROUTES } from 'src/constants';
import {
  IAuthResponse,
  ILogin,
} from 'src/interfaces/auth.interface';

import { useAuthStore } from 'src/stores/auth.store';
import { useProfileStore } from 'src/stores/profile.store';

import { hideLoading, showLoading } from 'src/utils/loading';
import { IContact, IContactListResponse, IContactResponse } from 'src/interfaces/contacts.inteface';
import { formatDate } from 'src/utils/functions';

const authStore = useAuthStore();
const profileStore = useProfileStore()

export const getAll = async () => {
  showLoading();
  try {
    const { data } = await api.get<IContactListResponse>( API_ROUTES.CONTACTS_BASE);
    hideLoading();
    return data
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IAuthResponse>;
    throw response?.data.message;
  }
}

export const getOne = async (contactId: string) => {
  showLoading();
  try {
    const { data } = await api.get<IContactResponse>( API_ROUTES.CONTACTS_BASE + '/' + contactId);
    hideLoading();
    return data
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IAuthResponse>;
    throw response?.data.message;
  }
}

export const create = async (form: IContact) => {
  showLoading();
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('lastname', form.lastname);
  formData.append('email', form.email);
  formData.append('birthday', formatDate(form.birthday));
  formData.append('number', form.phone);
  formData.append('photo', form.photo ?? '');
  
  try {
    const { data } = await api.post<IContactResponse>(API_ROUTES.CONTACTS_BASE, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IContactResponse>;
    throw response?.data;
  }
};

export const edit = async (form: IContact, contactId) => {
  showLoading();
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('lastname', form.lastname);
  formData.append('email', form.email);
  formData.append('birthday', formatDate(form.birthday));
  
  try {
    const { data } = await api.put<IContactResponse>(API_ROUTES.CONTACTS_BASE + '/' + contactId, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IContactResponse>;
    throw response?.data;
  }
};

export const deleteContact = async (contactId) => {
  showLoading();
  
  try {
    const { data } = await api.delete<IContactResponse>(API_ROUTES.CONTACTS_BASE + '/' + contactId);
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IContactResponse>;
    throw response?.data;
  }
};



