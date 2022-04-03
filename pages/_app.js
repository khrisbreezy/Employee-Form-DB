import App, {Container} from 'next/app';
import {NotificationContainer} from 'react-notifications';

import '../styles/sass/main.scss';
import 'react-notifications/lib/notifications.css';


export default class extends App {
    render() {
        const {Component, pageProps} = this.props;
            return <>
                <Component {...pageProps} />
                <NotificationContainer/>
            </>
    }
}
