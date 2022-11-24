import { AxiosError } from 'axios';
import { api } from 'boot/axios';

import { API_ROUTES } from 'src/constants';

import { hideLoading, showLoading } from 'src/utils/loading';
import { IPhone } from 'src/interfaces/contacts.inteface';

export const getOne = async (contactId: string) => {
  showLoading();
  try {
    const { data } = await api.get<IPhone>(
      API_ROUTES.PHONES_BASE + '/' + contactId,
    );
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IPhone>;
    throw response?.data;
  }
};

export const create = async (form: IPhone, contactId: string) => {
  showLoading();
  try {
    const { data } = await api.post<IPhone>(
      API_ROUTES.PHONES_BASE,
      form,
      {
        headers: { 'X-Contact-ID': contactId },
      }
    );
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IPhone>;
    throw response?.data;
  }
};

export const edit = async (form: IPhone, contactId: string, phoneId: string) => {
  showLoading();
  try {
    const { data } = await api.put<IPhone>(
      `${API_ROUTES.PHONES_BASE}/${phoneId}`,
      form,
      {
        headers: { 'X-Contact-ID': contactId },
      }
    );
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IPhone>;
    throw response?.data;
  }
};

export const deletePhone = async (contactId: string, phoneId: string) => {
  showLoading();
  try {
    const { data } = await api.delete<IPhone>(
      API_ROUTES.PHONES_BASE + '/' + phoneId,
      {
        headers: { 'X-Contact-ID': contactId },
      }
    );
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IPhone>;
    throw response?.data;
  }
};
