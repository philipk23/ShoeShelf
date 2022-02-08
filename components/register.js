import { html, render } from '../node_modules/lit-html/lit-html.js';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { register } from '../services/authService.js';

let template = (ctx) => html`
    <navigation-component></navigation-component>
    <h1>Register</h1>
        <p class="form-info">Already registered?
            <a href="/login">Login now</a> and have some fun!
        </p>

    <form action="" method="POST" @submit="${ctx.onSubmit}">
        <div>
            <input type="email" placeholder="Email..." name="email">
        </div>
        <div>
            <input type="password" placeholder="Password" name="password">
        </div>
        <div>
            <input type="password" placeholder="Re-password" name="re-password">
        </div>
        <div>
            <p class="message"></p>
            <button>Register</button>
        </div>
    </form>
    <footer-component></footer-component>
`;

export default class Register extends HTMLElement{
    connectedCallback(){
        this.render();
    }
    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);
        
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('re-password');
        
        if(email.length < 1){
            return;
        }
        
        if (password != repeatPassword) {
            return;
        }

        if (password.length < 6) {
            return;
        }

        register(email, password)
            .then(res => {
                Router.go('/');
            })

    }
    render(){
        render(template(this), this, { eventContext: this});
    }
}