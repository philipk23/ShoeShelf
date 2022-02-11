import { Router } from 'https://unpkg.com/@vaadin/router'; 

import Navigation from './components/navigation.js';
import Footer from './components/footer.js';
import Home from './components/home.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Create from './components/create.js';
import Shoe from './components/shoe.js';
import ShoeCard from './components/shoe-card.js';
import Details from './components/details.js';
import Edit from './components/edit.js';
import { logout } from './services/authService.js';

customElements.define('navigation-component', Navigation);
customElements.define('footer-component', Footer);
customElements.define('home-component', Home);
customElements.define('register-component', Register);
customElements.define('login-component', Login);
customElements.define('create-component', Create);
customElements.define('shoe-component', Shoe);
customElements.define('shoe-card-component', ShoeCard);
customElements.define('details-component', Details);
customElements.define('edit-component', Edit)

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
    },
    {
        path: '/login',
        component: 'login-component'
    },
    {
        path: '/logout',
        action: (context, commands) => {
            logout()
                .then(() => {
                    console.log('Successfully logged out');
                })
                .catch(err => console.error('Oops, something went wrong'));
            console.log('Not redirecting');
            return commands.redirect('/login');
        }
    },
    {
        path: '/create',
        component: 'create-component'
    },
    {
        path: '/details/:id',
        component: 'details-component'
    },
    {
        path: '/details/:id/edit',
        component: 'edit-component',
    },
])