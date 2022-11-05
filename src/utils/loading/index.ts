import { Loading, QSpinnerRings } from 'quasar';

export const showLoading = (message = '') => {
    Loading.show({
        spinner: QSpinnerRings,
        spinnerColor: 'primary',
        spinnerSize: 500,
        message
    });
}

export const hideLoading = () => {
    Loading.hide();
}
