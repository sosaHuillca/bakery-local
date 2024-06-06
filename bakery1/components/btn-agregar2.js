class BtnAdd extends HTMLElement {

   static get observedAttributes(){ return ["cantidad"] }

   constructor(){super(); this.attachShadow({mode:'open'});
      this.contador = +(this.getAttribute("cantidad"));
     this.estado = "";

     if(this.contador === 0) this.estado = "Agregar";
     else this.estado = "Agregado";

      this.shadowRoot.innerHTML =  `
<style>
button{
  padding:7px;
  background-color: blue;
  color:white;
  border-radius:10px;
  border:none;
  font-weight:bold;
}
</style>
      <button id="${this.codigo}">${this.estado}(${this.contador || 0})</button>
   `}

   connectedCallback(){
      this.shadowRoot.querySelector("button").
	 addEventListener("click",() => this.add());
   }

   add(){
      this.contador++
      this.setAttribute("contador",this.contador)
      this.shadowRoot.querySelector("button").
	 textContent = "Agregado "+this.contador;

      const btnStyle = this.shadowRoot.querySelector("button");
      btnStyle.style.backgroundColor = "green";
      setTimeout(()=>{
	 btnStyle.style.backgroundColor = "blue";
      },200);
      this.dispatchEvent(new CustomEvent("vecesPresionado", {detail: this.contador}))
   }

}
window.customElements.define('btn-add-2',BtnAdd)
