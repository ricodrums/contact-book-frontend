import { AxiosError } from 'axios';
import { api } from 'boot/axios';

import { API_ROUTES } from 'src/constants';
import { IAuthResponse } from 'src/interfaces/auth.interface';

import { hideLoading, showLoading } from 'src/utils/loading';
import {
  IContact,
  IContactListResponse,
  IContactResponse,
} from 'src/interfaces/contacts.inteface';
import { formatDate } from 'src/utils/functions';
import { IParamsPaginate } from 'src/interfaces/base.interface';

export const getAll = async (options: IParamsPaginate) => {
  showLoading();
  const {
    page = 1,
    limit = 100,
    delete: deleted = false,
    search = '',
  } = options;
  const params: IParamsPaginate = { page, limit, delete: deleted };
  if (search.length > 3) params['search'] = search;
  try {
    const { data } = await api.get<IContactListResponse>(
      API_ROUTES.CONTACTS_BASE,
      {
        params,
      }
    );
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IAuthResponse>;
    throw response?.data.message;
  }
};

export const getOne = async (contactId: string) => {
  showLoading();
  try {
    const { data } = await api.get<IContactResponse>(
      API_ROUTES.CONTACTS_BASE + '/' + contactId
    );
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IAuthResponse>;
    throw response?.data.message;
  }
};

export const create = async (form: IContact) => {
  showLoading();
  const formData = new FormData();
  formData.append('name', form.name as string);
  formData.append('lastname', form.lastname as string);
  formData.append('email', form.email as string);
  formData.append('birthday', formatDate(form.birthday as string));
  formData.append('number', form.phone as string);
  formData.append('photo', form.photo ?? '');

  try {
    const { data } = await api.post<IContactResponse>(
      API_ROUTES.CONTACTS_BASE,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IContactResponse>;
    throw response?.data;
  }
};

export const changeImage = async (photo: any, contactId: string) => {
  const form = new FormData();
  form.append('photo', photo);
  try {
    const { data } = await api.patch(
      `${API_ROUTES.CONTACTS_BASE}/${contactId}`,
      form,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return data;
  } catch (error) {
    const { response } = error as AxiosError<IContactResponse>;
    throw response?.data;
  }
};

export const edit = async (form: IContact, contactId: string) => {
  showLoading();
  form.birthday = formatDate(form.birthday as string);
  try {
    const { data } = await api.put<IContactResponse>(
      `${API_ROUTES.CONTACTS_BASE}/${contactId}`,
      form
    );
    if (form.photo) {
      const da = await changeImage(form.photo, contactId);
      data.photo = da.photo;
    }
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IContactResponse>;
    throw response?.data;
  }
};

export const deleteContact = async (contactId: string) => {
  showLoading();

  try {
    const { data } = await api.delete<IContactResponse>(
      API_ROUTES.CONTACTS_BASE + '/' + contactId
    );
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IContactResponse>;
    throw response?.data;
  }
};
