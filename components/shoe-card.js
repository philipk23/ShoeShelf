import { html, render } from '../node_modules/lit-html/lit-html.js';

let template = (ctx) => html`
    <div class="shoe">
        <img src="${ctx.data.imageUrl}">
        <h3>${ctx.data.name}</h3>
        <a>Buy it for $${ctx.data.price}</a>
    </div>
`;

export default class ShoeCard extends HTMLElement{
    connectedCallback(){
        this.render()
    };

    render(){
        render(template(this), this, { eventContext: this });
    }
}