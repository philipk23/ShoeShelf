import { html, render } from '../node_modules/lit-html/lit-html.js';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { addShoe } from '../services/shoeService.js';
import { getUserData } from '../services/authService.js';

let template = (ctx) => html`
    <navigation-component></navigation-component>
    <h1>Create New Offer</h1>
    <p class="message"></p>
    <form method="POST" @submit="${ctx.onSubmit}">
        <div>
            <input type="text" placeholder="Name..." name="name">
        </div>
        <div>
            <input type="text" placeholder="Price..." name="price">
        </div>
        <div>
            <input type="text" placeholder="Image url..." name="imageUrl">
        </div>
        <div>
            <textarea placeholder="Give us some description about this offer..." name="description"></textarea>
        </div>
        <div>
            <input type="text" placeholder="Brand..." name="brand">
        </div>
        <div>
            <button>Create</button>
        </div>
    </form>
    <footer-component></footer-component>
`;

export default class Create extends HTMLElement{
    connectedCallback(){
        this.render();
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let offer = {
            name: formData.get('name'),
            price: formData.get('price'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
            brand: formData.get('brand'),
            creator: getUserData().email,
            buyers: [],
        };

        addShoe(offer)
            .then(res => {
                Router.go('/');
            })

    }

    render(){
        render(template(this), this, { eventContext: this});
    }
}