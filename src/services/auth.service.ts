import { AxiosError } from 'axios';
import qs from "qs";
import { api } from 'boot/axios';

import { API_ROUTES } from 'src/constants';
import {
  IAuthResponse,
  ILogin,
  IRegister,
} from 'src/interfaces/auth.interface';

import { useAuthStore } from 'src/stores/auth.store';
import { useProfileStore } from 'src/stores/profile.store';

import { hideLoading, showLoading } from 'src/utils/loading';

const authStore = useAuthStore();
const profileStore = useProfileStore()

export const register = async (form: IRegister) => {
  showLoading();
  try {
    const { data } = await api.post<IAuthResponse>( API_ROUTES.REGISTER, form );
    
    authStore.setAuth(data.accessToken, data.typeToken, data.refreshToken);
    profileStore.setProfile({ username: form.username, email: form.email })

    hideLoading();
    return data.message;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IAuthResponse>;
    throw response?.data.message;
  }
};

export const login = async (form: ILogin) => {
  showLoading();
  try {
    const { data } = await api<IAuthResponse>({
      method: 'POST',
      url: API_ROUTES.LOGIN,
      data: qs.stringify(form),
    });
        
    authStore.setAuth(data.accessToken, data.typeToken, data.refreshToken);
    profileStore.setProfile({ username: form.username })

    hideLoading();
    return data.message;
  } catch (error) {
    hideLoading();
    const { response } = error as AxiosError<IAuthResponse>;
    throw response?.data.message;
  }
};

export const logout = async () => {
  showLoading();
  authStore.removeAuth();
  profileStore.removeProfile();
  hideLoading();
}
