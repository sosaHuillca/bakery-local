import "../components/card-mini.js"
import "../components/card-expand.js"

// Cargar el archivo JSON
fetch('../db_products.json')
   .then(response => response.json())
   .then(data => {
      // Manipular los datos JSON
      const allProductos = data.productos.map(producto => `<card-mini
      nombre='${producto.nombre}'
      precio='${producto.precio}'
      di='${producto.id}'
      imagen='${producto.imagen[0]}'
      storage='${"canasta_1"}'
      ></card-mini>`).join("");

      const main = document.querySelector(".contenedor-productos");
      main.insertAdjacentHTML('beforeend', allProductos);

      main.childNodes.forEach(card => {
	 card.addEventListener("click",(e)=>{

	    if(e.target.getAttribute("cantidad")) {
	       let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || []

	       document.querySelector("carrito-icon").
		  setAttribute("numero",dbstorage.length);
	    }

	 })

	 card.addEventListener("direccionar",(e)=>{
	    main.style.display = "none";
	    document.querySelector("header").style.display="none";

	    const mainProducto = document.querySelector('#contenedor-producto')
	    fetch('../db_products.json')
	       .then(response => response.json())
	       .then(data => {
		  let item = data.productos.filter(producto => producto.id == e.detail).map(p => {
		     return `<card-expand
			nombre="${p.nombre}"
			di=${p.id}
			precio="${p.precio}"
			imagen="${p.imagen}"
			descripcion="${p.descripcion}"
			categoria=${p.categoria}
			storage=${"canasta_1"}
			></card-expand>`
		  }).join("")
		  
		  mainProducto.innerHTML=item;
	       });

	 })
      })

   })

document.addEventListener("DOMContentLoaded",()=>{

   let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || []

   document.querySelector("carrito-icon").
      setAttribute("numero",dbstorage.length);
})
