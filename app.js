import { Router } from 'https://unpkg.com/@vaadin/router'; 

import Navigation from './components/navigation.js';
import Footer from './components/footer.js';
import Home from './components/home.js';
import Register from './components/register.js';

customElements.define('navigation-component', Navigation);
customElements.define('footer-component', Footer);
customElements.define('home-component', Home);
customElements.define('register-component', Register);

const root = document.getElementById('app');
const router = new Router(root);

router.setRoutes([
    {
        path: '/',
        component: 'home-component'
    },
    {
        path: '/register',
        component: 'register-component'
    }
])