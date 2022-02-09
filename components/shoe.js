import { html, render } from '../node_modules/lit-html/lit-html.js';
import { getAllShoes } from '../services/shoeService.js';

let template = (ctx) => html`
    ${ctx.shoes
        ? html`
            <div class="shoes">
                ${ctx.shoes.map(shoe => html`<shoe-card-component .data=${shoe}></shoe-card-component>`)}
            </div>
        `
        : html`
            <h1>No shoes to display. Be the first to create a new offer...</h1>
        `
    }
`;

export default class Shoe extends HTMLElement{
    connectedCallback(){
        getAllShoes()
            .then(shoes => {
                this.shoes = shoes;
                this.render();
            })
        this.render()
    };

    render(){
        render(template(this), this, { eventContext: this });
    }
}