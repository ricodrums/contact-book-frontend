import { Loading, QSpinnerGrid } from 'quasar';

export const showLoading = (message = '') => {
    Loading.show({
        spinner: QSpinnerGrid,
        spinnerColor: 'indigo-4',
        message
    });
}

export const hideLoading = () => {
    Loading.hide();
}
