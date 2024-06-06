document.querySelector(".contenedor-productos").
   childNodes.forEach(card => {
   card.addEventListener("click",(e)=>{

      console.log("hola mundo")
      if(e.target.getAttribute("cantidad")) {
	 let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || []

	 document.querySelector("carrito-icon").
	    setAttribute("numero",dbstorage.length);
      }

   })
})

