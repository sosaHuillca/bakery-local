window.customElements.define('carrito-icon',
   class WebComponent extends HTMLElement {

      constructor(){super(); this.attachShadow({mode:'open'});
	 this.shadowRoot.innerHTML =  `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
</style>
      <div>
	 <i class="fa-solid fa-cart-shopping"></i>
	 <span>${this.getAttribute("numero")}</span>
      </div>
   `;
      }

      div(name){ return this.shadowRoot.querySelector(name) }

      static get observedAttributes(){ return ["numero"] }

      attributeChangedCallback(attr, oldVal, newVal){ 
	 if(attr == "numero"){
	    const span = this.div("span");
	    const div = this.div("div");
	    span.textContent = newVal;

	    div.style.color = "yellow";
	    div.style.transform = "scale(1.5)";
	    div.style.transition = "ease-in-out";
	    setTimeout(()=>{
	       div.style.color = "white";
	       div.style.transform = "scale(1)";
	       div.style.transition = "none";
	    },200);
	 }
      }

      connectedCallback(){
      }

})

