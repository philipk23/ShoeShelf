import { html, render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from '../services/authService.js';

let template = (ctx) => html`
    <navigation-component></navigation-component>
    ${ctx.user.isAuthenticated
        ? html`
            <shoe-component></shoe-component>
        `
        : html`
            <div class="container">
                <div class="about-us">
                    <div>
                        <img src="../public/shoes.jpg" alt="">
                        <img src="../public/shoes2.jpg" alt="">
                    </div>
                    <p>
                        <a href="/register">Register Now</a> and Try it!
                    </p>
                </div>
            </div>
        `
    }
    <footer-component></footer-component>
`;

export default class Home extends HTMLElement{
    connectedCallback(){
        this.user = getUserData();
        this.render();
    }

    render(){
        render(template(this), this, { eventContext: this});
    }
}
