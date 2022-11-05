import 'dayjs/locale/en';
import './main.css';

import ReactDOM from 'react-dom/client';

import Provider from './providers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider />
);
