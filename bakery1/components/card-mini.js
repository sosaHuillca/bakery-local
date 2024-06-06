import "./btn-agregar2.js";

class Card extends HTMLElement {

   constructor(){super();this.attachShadow({mode:'open'});

      let precio = this.getAttribute("precio");
      let cantidad = this.getAttribute("cantidad");
      let di = this.getAttribute("di");
      let nombre = this.getAttribute("nombre");
      let imagen = this.getAttribute("imagen");

      this.shadowRoot.innerHTML =  `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	 <style>

img { width: 100%; }

.contenedor-card{
  border-radius: 10px;
  min-height: 15rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
}
.contenedor-card h2{
     grid-column: 1/-1;
  margin: 10px 3px;
  font-size: 1.2rem;
  font-family: sans-serif;
}
img + i{
   position: absolute;
  left: 50%;
  top: 20%;
  font-size: 2rem;
  transform: translate(-20%,-50%);
  text-decoration:none;
  color: #fff;
}

  section {
     position: absolute;
  width: 100%;
  bottom: 0;
  background: white;
  border-radius: 12px 10px 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
height: 136px;
  place-content: center;
  }

   h3{
     margin: 0;
  font-size: 1rem;
  align-self: center;
  justify-self: center;
  }

	 </style>
      <article class="contenedor-card" id="${di}">
	 <a href="/${di}">
	    <img src="imagenes/${imagen}"/>
	    <i class="fa-solid fa-magnifying-glass"></i>
	 </a>
	 <section>
	    <h2>${nombre}</h2>
	    <h3>s/. ${precio}</h3>
	    <btn-add-2></btn-add-2>
	 </section>
      </article>
	 `;
   }

   static get observedAttributes(){
      return ["precio","nombre","di","storage"];
   }

   connectedCallback(){
      let nombre = this.getAttribute("nombre");
      let di = this.getAttribute("di");
      let precio = this.getAttribute("precio");
      let storage = this.getAttribute("storage");
      let total = 0;

      const btn = this.shadowRoot.querySelector("btn-add-2");
      btn.addEventListener("vecesPresionado",(e)=>{
	 total = +precio * +e.detail;

	 this.setAttribute("cantidad",e.detail);

	 let dbstorage = JSON.parse(localStorage.getItem(storage)) || []
	 let itemFound = false;

	 const producto = {
	    "id":di,
	    precio,
	    "cantidad":e.detail,
	    total,
	    nombre
	 }
	 if(dbstorage.length === 0) dbstorage.push(producto);

	 for (let i = 0; i < dbstorage.length; i++) {
	    if (dbstorage[i].id === di) {
	       dbstorage[i].cantidad = e.detail;
	       dbstorage[i].total = total;
	       itemFound = true;
	       break; // Romper el bucle si ya se encontró y actualizó el objeto
	    }
	 }

	 if (!itemFound) dbstorage.push(producto);

	 localStorage.setItem(storage,  JSON.stringify(dbstorage));

      });

      /* registrando el evento del enlace */
      this.shadowRoot.querySelector("a").
	 addEventListener("click",(e)=>{
	    e.preventDefault();
	    this.dispatchEvent(new CustomEvent("direccionar", {detail: this.getAttribute("di")}))
	 })
   }
}

window.customElements.define('card-mini',Card)
