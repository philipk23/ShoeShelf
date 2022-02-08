import { html, render } from '../node_modules/lit-html/lit-html.js';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { login } from '../services/authService.js';

let template = (ctx) => html`
    <navigation-component></navigation-component>
    <h1>Login</h1>
        <p class="form-info">Don't have account?
            <a href="/register">Register now</a> and fix that!
        </p>
    <form action="" method="" @submit=${ctx.onSubmit}>
        <div>
            <input type="email" placeholder="Email..." name="email">
        </div>

        <div>
            <input type="password" placeholder="Password..." name="password">
        </div>
        <div> 
            <button>Login</button>
        </div>
    </form>
    <footer-component></footer-component>
`;

export default class Login extends HTMLElement{
    connectedCallback(){
        this.render()
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');

        login(email, password)
            .then(res => {
                Router.go('/');
            })

    }

    render(){
        render(template(this), this, { eventContext: this});
    }
}
