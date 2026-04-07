import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
//redux
import { Provider } from 'react-redux';
import { store } from './store/store';
//export const AppContext = createContext();

import '@coreui/coreui/dist/css/coreui.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS file
import '../css/style.css';
import "@fontsource/poppins";



createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
        <Provider store={store}>
            <App {...props} />
        </Provider>
    );
    },
});
