import "./btn-agregar2.js";

window.customElements.define('card-expand',
   class WebComponent extends HTMLElement {

      static get observedAttributes(){ return ["di","nombre","precio","imagen","descripcion","cantidad","categoria","storage"] }

      constructor(){super(); this.attachShadow({mode:'open'});
	 let nombre = this.getAttribute("nombre");
	 let cantidad = this.getAttribute("cantidad");
	 let di = this.getAttribute("di");
	 let precio = this.getAttribute("precio");
	 let imagen = this.getAttribute("imagen");
	 let listImagen = imagen.split(",")
	 let descripcion = this.getAttribute("descripcion");
	 let categoria = this.getAttribute("categoria");

	 this.shadowRoot.innerHTML =  `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
img { width: 100%; height:100%; }

.head-product{
   height:40vh;
   position:relative;
}

.fa-arrow-left{
   position: absolute;
   top:.5rem;
   left:.5rem;
   width:40px;
   height:40px;
   background: blueviolet;
   display: flex;
   justify-content: center;
   align-items:center;
   border-radius:6px;
   color:white;
}

.content-galery{
   display: flex;
  width: 60%;
  height: 4rem;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid greenyellow;
  transform: translateX(-50%);
}

.body-product{
   display: grid;
   grid-template-columns:1fr 1fr;
   place-items: center;
   padding:10px;
}

.title-producto{
   grid-column:1/2;
   grid-row:1/2;
   font-family:sans-serif;
   font-weight: normal;
   font-size: 1.3rem;
   margin:0;
}

.title-categoria{
  grid-column:2/3; 
  grid-row:1/2;
  margin:0;
  font-family:sans-serif;
  font-weight:500;
}

.title-descripcion{
   grid-column:1/2; 
  grid-row:2/3;
  font-family: sans-serif;
  font-weight:600;
  margin-top:20px;
}

.content-descripcion{
   grid-column:1/-1;
  grid-row:3/4;
}

.title-precio{
   grid-row:1/2;
  grid-row:4/5;
}

.btn-agregar{
   grid-column:2/3;
   padding:10px;
   height:40px;
  grid-row:4/5;
}

.number-precio{
   font-weight:bold;
   font-size: 1.5rem;
}

h3,h2 { margin-top:0; }
p{margin-top:0;}

</style>
      <article class="content-product">
	 <header class="head-product">
	    <a href="/" id="borrar">
	       <i class="fa-solid fa-arrow-left"></i>
	    </a>
	    <img id="imgMain" src="imagenes/${listImagen[0]}"/>
	    <nav class="content-galery">
	       <img src="imagenes/${listImagen[1]}"/>
	       <img src="imagenes/${listImagen[2]}"/>
	       <img src="imagenes/${listImagen[3]}"/>
	       <img src="imagenes/${listImagen[4]}"/>
	    </nav>
	 </header>
	 <section class="body-product">
	    <h2 class="title-producto">${nombre}</h2>
	    <h3 class="title-categoria">Categoria: ${categoria}</h3>
	    <h3 class="title-descripcion">Descripcion:</h3>
	    <p class="content-descripcion">${descripcion}</p>
      <p class="title-precio"><strong>Precio:</strong>
	 <span class="number-precio">s/. ${precio}</span>
      </p>
	    <btn-add-2 class="btn-agregar" cantidad="${cantidad}"></btn-add-2>
	 </section>
      </article>
   `;
      }
      div(name){ return this.shadowRoot.querySelector(name) }

      connectedCallback(){
	 const mainImg = this.shadowRoot.querySelector("#imgMain");
	 const imgs = this.shadowRoot.querySelector(".content-galery").childNodes
	 imgs.forEach(img => {
	    img.addEventListener("click",(e)=>{
	       let srcNew = e.target.getAttribute("src");
	       mainImg.setAttribute("src",srcNew)
	    })
	  })
 
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

	 localStorage.setItem(storage,JSON.stringify(dbstorage));

      });

      /* registrando el evento del enlace */
      this.shadowRoot.querySelector("a").
	 addEventListener("click",(e)=>{
	 e.preventDefault();
	 this.remove()
	 this.dispatchEvent(new CustomEvent("actionQuitarCardDetails", {detail: true}))
	 })
      }


})

