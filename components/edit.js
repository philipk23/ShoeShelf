import { Router } from 'https://unpkg.com/@vaadin/router'; 
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { getOneById, editShoe } from '../services/shoeService.js';

let template = (ctx) => html`
    <h1>Edit Offer</h1>
    <p class="message"></p>
    <form @submit="${ctx.onSubmit}">
        <div>
            <input type="text" placeholder="Name..." value="${ctx.shoe.name}" name="name">
        </div>
        <div>
            <input type="text" placeholder="Price..." value="${ctx.shoe.price}" name="price">
        </div>
        <div>
            <input type="text" placeholder="Image url..." value="${ctx.shoe.imageUrl}" name="imageUrl">
        </div>
        <div>
            <textarea placeholder="Give us some description about this offer..." name="description">${ctx.shoe.description}"</textarea>
        </div>
        <div>
            <input type="text" placeholder="Brand..." value="${ctx.shoe.brand}" name="brand">
        </div>
        <div>
            <button>Edit</button>
        </div>
    </form>
`;

export default class Edit extends HTMLElement{
    connectedCallback(){
        this.render()
    }

    onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.target);

        let shoeData = {
            name: formData.get('name'),
            price: formData.get('price'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
            brand: formData.get('brand'),
        };

        let shoeId = location.pathname.replace('/details/', '').replace('/edit', '');

        editShoe(shoeId, shoeData)
            .then(res => {
                Router.go(`/details/${shoeId}`)
            })
    }

    render(){
        getOneById(this.location.params.id)
            .then(shoe => {
                this.shoe = shoe;
                render(template(this), this, { eventContext : this });
            })
    }
}