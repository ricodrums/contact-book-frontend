import { Notify } from 'quasar';
import { Colors } from 'src/types';

export const showNotify = (
    message?: string,
    color: Colors = 'primary',
    html?: boolean,
    icon?: string,
    timeout = 500
) => {
    Notify.create({
        position: 'bottom',
        timeout,
        message,
        color,
        icon,
        html
    });
}
