import {Linking} from 'react-native';
import {getLinkPreview} from 'link-preview-js';
import ToastMessage from '../components/ToastMessage';

export const urlInfoParser = (url) => {
    try {
        const URL = url.includes('https://') ? url : `https://${url}`
        return getLinkPreview(URL)
    } catch (error) {
        ToastMessage('error', 'Invalid', 'Entered URL is invalid')
    }
}

export const UUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, (x) => {
        var randomNumber = Math.random() * 16 | 0,
            generatedKeyValues = x == 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);
        return generatedKeyValues.toString(16);
    });
}

export const openInBrowser = (url) => {
    Linking.openURL(url).catch(() => ToastMessage('error', 'Something went wrong!', 'Please try again'));
}
