window.customElements.define('item-list',
   class WebComponent extends HTMLElement {

      static get observedAttributes(){ return ["nombre","di","cantidad","total","precio"] }


      constructor(){super(); this.attachShadow({mode:'open'});
	 const get = name => this.getAttribute(name);

	 const nombre = get("nombre");
	 const id = get("di");
	 const cantidad = get("cantidad");
	 const total = get("total");
	 const precio = get("precio")

	 this.shadowRoot.innerHTML =  `
<style>
div{
   display: flex;
  align-items: center;
  justify-content: space-around;
  background-color:red;
}
input{
   width:40px;
   height:32px;
   font-size:1.2rem;
}
button{
   font-size:1.5rem;
   min-width: 35px;
}
</style>

<div class="list">
   <span>${nombre}</span>
   <span>${precio}</span>
   <section>
      <button id="minus">-</button>
      <input value="${cantidad}" type="number" />
      <button id="add">+</button>
   </section>
   <h3>s./<span id="total">${total}</span></h3>
   <button id="del">X</button>
</div>
<hr>
   `;
      }

      div(name){ return this.shadowRoot.querySelector(name) }

      connectedCallback(){
	 this.div("#add").addEventListener("click",()=> this.add())
	 this.div("#minus").addEventListener("click",()=> this.minus())
	 this.div("input").addEventListener("input",()=> this.insertInput())
	 this.div("#del").addEventListener("click",()=> this.removeC())
      }

      removeC(){
	 this.remove()
	 const id = this.getAttribute("di")
	 this.dispatchEvent(new CustomEvent("del", {detail:id }))
      }

      insertInput(e){
	 let cantidadInput = +(this.div("input").value)
	 this.setAttribute("cantidad",cantidadInput)

	 const precio = +(this.getAttribute("precio"));
	 let total = (cantidadInput*precio).toFixed(2);

	 this.setAttribute("total",total);
	 this.div("#total").textContent = total;
	 this.dispatchEvent(new CustomEvent("inputIncrement", {detail: total}))

      }

      add(){
	 let cantidad = +(this.div("input").value);
	 cantidad++;
	 this.setAttribute("cantidad",cantidad)

	 const precio = +(this.getAttribute("precio"));
	 let total = (cantidad*precio).toFixed(2);

	 this.setAttribute("total",total);
	 this.div("#total").textContent = total;
	 this.dispatchEvent(new CustomEvent("btnIncrement", {detail: total}))
      }

      minus(){
	 let cantidad = +(this.div("input").value);
	 cantidad--;
	 this.setAttribute("cantidad",cantidad)

	 const precio = +(this.getAttribute("precio"));
	 let total = (cantidad*precio).toFixed(2);

	 this.setAttribute("total",total);
	 this.div("#total").textContent = total;
	 this.dispatchEvent(new CustomEvent("btnIncrement", {detail: total}))
      }
      attributeChangedCallback(prop, oldVal, newVal){ 
	 if("cantidad" == prop){
	    this.shadowRoot.querySelector("input").value = newVal
	 }
      }

})
