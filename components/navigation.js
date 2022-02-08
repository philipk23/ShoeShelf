import { html, render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from '../services/authService.js'

let template = (ctx) => html`
<header>
    <nav>
        <ul>
            ${ctx.user.isAuthenticated
                ? html`
                    <li>
                        <a href="/create">Create new offer</a>
                    </li> 
                `
                : html`
                    <li class="site-logo">Shoe</li>                
                `
            }
            <li>
                <a href="">
                    <img src="../public/sneakers.png" alt="">
                </a>
            </li> 
            ${!ctx.user.isAuthenticated
                ? html`
                    <li class="site-logo">Shelf</li>                
                `
                : html`
                    <li>Welcome, ${ctx.user.email} | 
                        <a  href="/logout">Logout</a>
                    </li>
                `
            }
        </ul>
    </nav>
</header>
`;

export default class Navigation extends HTMLElement{
    connectedCallback(){
        this.user = getUserData();

        this.render();
    }

    render(){
        render(template(this), this, { eventContext: this});
    }
}
