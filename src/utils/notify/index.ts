import { Notify } from 'quasar';
import { Colors } from 'src/types';

export const showNotify = (
    message?: string,
    color: Colors = 'primary',
    progress = true,
    html?: boolean,
    icon?: string,
    multiLine?: boolean,
    timeout = 1500
) => {
    Notify.create({
        position: 'bottom',
        progress,
        timeout,
        message,
        color,
        icon,
        multiLine,
        html
    });
}
