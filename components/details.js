import { Router } from 'https://unpkg.com/@vaadin/router'; 
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from '../services/authService.js';
import { getOneById, buyShoe, deleteShoe } from '../services/shoeService.js';

const getShoe = async(shoeId, email) => {
    let shoeData = await getOneById(shoeId);

    const buyers = Object.values(shoeData.buyers || {});
    const hasBought = await hasAlreadyBought(buyers, email);
    const buyersCount = buyers.length;

    Object.assign(shoeData, {
        hasBought,
        buyersCount
    });

    return shoeData;
}

const hasAlreadyBought = async (buyers, email) => {
    return Object.values(buyers).some(buyer => buyer.email == email);
}

let template = (ctx) => html`
    <navigation-component></navigation-component>
    <div class="offer-details">
        <h1>${ctx.shoe.name}</h1>
        <div class="info">
            <img src="${ctx.shoe.imageUrl}"
                alt="">
            <div class="description">${ctx.shoe.description}
                <br>
                <br>
                <p class="price">$${ctx.shoe.price}</p>
            </div>
        </div>
        <div class="actions">
            ${ctx.shoe.creator == ctx.user
                ? html`
                    <a href="${location.pathname}/edit">Edit</a>
                    <a @click="${ctx.onDelete}">Delete</a>
                `
                : html`
                    ${ctx.shoe.hasBought
                        ? html`<span>You bought it</span>`
                        : html`<a @click="${ctx.onBuy}">Buy</a>`
                    }
                `
            }
        </div>
    </div>
    <footer-component></footer-component>
`;

export default class Details extends HTMLElement{
    connectedCallback(){
        this.user = getUserData().email;

        this.render();
    }

    onDelete(e){
        e.preventDefault();

        let shoeId = location.pathname.replace('/details/', '');

        deleteShoe(shoeId)
            .then(res => {
                Router.go('/');
            })
    }

    onBuy(e){
        e.preventDefault();

        let shoeId = location.pathname.replace('/details/', '');

        buyShoe(shoeId, getUserData().email)
            .then(data => {
                render()
            });
    }

    render(){
        getShoe(this.location.params.id, getUserData().email)
            .then(shoe => {
                this.shoe = shoe;
                render(template(this), this, { eventContext: this});
            })
    }
}