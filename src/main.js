import './scss/main.scss'
import './img/logo.jpg'
import './img/logo-head.jpg'
import './img/card-1.jpg'
import './img/card-2.jpg'
import './img/card-3.jpg'
import './img/card-4.jpg'

(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));

const сardsInCart = []
window.addEventListener('load',getActiveCards)
const cardsContainer = document.querySelector('.content__cards')

cardsContainer.addEventListener('click' ,async function(e){
    if(e.target.classList.contains('btn')){
        const response = await request(e)
        const btn = e.target
        const card = btn.closest('.card').id
        
        if(сardsInCart.indexOf(card) === -1){
            сardsInCart.push(card)
        }

        localStorage.setItem('cards' , JSON.stringify(сardsInCart))

        if(response === true) addClassActive(btn)
    }
})

async function request(e){
    const btn = e.target
    btn.style.color ='transparent'
    const htmlLoader = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
    btn.insertAdjacentHTML('afterbegin' , htmlLoader)
    const result = await window.fetch( 'https://jsonplaceholder.typicode.com/posts/1')
    if(result.status === 200){
        return true
    }
}

function getActiveCards(){
    const cardsActive = JSON.parse(localStorage.getItem('cards'))
    if(cardsActive !== null ){
        cardsActive.forEach(item=>{
            const card = document.getElementById(item)
            const btn = card.querySelector('.card__button')
            сardsInCart.push(item)
            addClassActive(btn)
        })
    }
    
}

function addClassActive(element){
    element.classList.add('card__button_active')
    element.textContent = "В корзине"
}



