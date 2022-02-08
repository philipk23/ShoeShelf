import { Router } from 'https://unpkg.com/@vaadin/router'; 

import Navigation from './components/navigation.js';
import Footer from './components/footer.js';
import Home from './components/home.js';

customElements.define('navigation-component', Navigation);
customElements.define('footer-component', Footer);
customElements.define('home-component', Home);


const root = document.getElementById('app');
const router = new Router(root);

router.setRoutes([
    {
        path: '/',
        component: 'home-component'
    }
])