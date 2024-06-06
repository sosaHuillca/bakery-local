class BtnAdd extends HTMLElement {

   constructor(){super(); this.attachShadow({mode:'open'});
      this.contador = 0;
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
      <button id="${this.codigo}">Agregar</button>
   `;
   }

   //static get observedAttributes(){ return [] }

   connectedCallback(){
      this.shadowRoot.querySelector("button").
	 addEventListener("click",() => this.add());
   }

   add(){
      this.contador++
      this.setAttribute("contador",this.contador)
      const btnStyle = this.shadowRoot.querySelector("button");
      btnStyle.style.backgroundColor = "green";
      setTimeout(()=>{
	 btnStyle.style.backgroundColor = "blue";
      },200);
      this.dispatchEvent(new CustomEvent("vecesPresionado", {detail: this.contador}))
   }

}
window.customElements.define('btn-add',BtnAdd)
