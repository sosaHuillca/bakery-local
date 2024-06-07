import "../components/card-mini.js"
import "../components/card-expand.js"

let url = "https://github.com/sosaHuillca/bakery-local/blob/gh-pages"
// Cargar el archivo JSON
fetch(url+'/db_products.json')
   .then(response => response.json())
   .then(data => {
      // Manipular los datos JSON
      const allProductos = data.productos.map(producto =>{

	 let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || []

	 let cantidad = 0;

	 for (let i = 0; i < dbstorage.length; i++) {
	    if (dbstorage[i].id == producto.id) {
	       cantidad = dbstorage[i].cantidad
	       break; // Romper el bucle si ya se encontró y actualizó el objeto
	    }
	 }
	 //console.log(cantidad)

	 return `<card-mini
      nombre='${producto.nombre}'
      precio='${producto.precio}'
      di='${producto.id}'
      imagen='${producto.imagen[0]}'
      storage='${"canasta_1"}'
      cantidad=${cantidad}
      ></card-mini>`
      }).join("");

      const main = document.querySelector(".contenedor-productos");
      main.insertAdjacentHTML('beforeend', allProductos);

      main.childNodes.forEach(card => {
	 /* render card-mini component */
	 card.addEventListener("click",(e)=>{

	    if(e.target.getAttribute("cantidad")) {
	       let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || []

	       document.querySelector("carrito-icon").
		  setAttribute("numero",dbstorage.length);
	    }

	 })

	 card.addEventListener("contadorCardMini",(e)=>{
	    console.log(e.detail)
	 });

	 card.addEventListener("direccionar",(e)=>{
	    main.style.display = "none";

	    const mainProducto = document.querySelector('#contenedor-producto')

	    /* render details products*/
	    fetch(url+'/db_products.json')
	       .then(response => response.json())
	       .then(data => {
		  let item = data.productos.filter(producto => producto.id == e.detail).map(p => {
		     let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || []

		     let cantidad = 0;

		     for (let i = 0; i < dbstorage.length; i++) {
			if (dbstorage[i].id == p.id) {
			   cantidad = dbstorage[i].cantidad
			   break; // Romper el bucle si ya se encontró y actualizó el objeto
			}
		     }
		     return `<card-expand
			nombre="${p.nombre}"
			di=${p.id}
			precio="${p.precio}"
			imagen="${p.imagen}"
			descripcion="${p.descripcion}"
			categoria=${p.categoria}
			storage=${"canasta_1"}
			cantidad=${cantidad}
			></card-expand>`
		  }).join("")

		  mainProducto.innerHTML=item;

		  mainProducto.childNodes.forEach(product => {
		     product.addEventListener("actionQuitarCardDetails",(e)=>{
			const Main = document.querySelector(".contenedor-productos");
			Main.style.display = "grid"
		     })
		  })
	       });

	 })

      })

   })

document.addEventListener("DOMContentLoaded",()=>{

   let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || []

   document.querySelector("carrito-icon").
      setAttribute("numero",dbstorage.length);
})
