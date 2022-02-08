import { html, render } from '../node_modules/lit-html/lit-html.js';

let template = () => html` 
    <footer>
        <p><a href="https://softuni.bg">Software University</a> - JS Applications @ 2020</p>
    </footer>
`;

export default class Footer extends HTMLElement{
    connectedCallback(){
        this.render();
    }

    render(){
        render(template(this), this, { eventContext: this});
    }
}