import "../components/item-list.js";

let navegador = navigator.userAgent;
let useAndroid = false;
if (navigator.userAgent.match(/Android/i) ||
   navigator.userAgent.match(/webOS/i) ||
   navigator.userAgent.match(/iPhone/i) ||
   navigator.userAgent.match(/iPad/i) ||
   navigator.userAgent.match(/iPod/i) ||
   navigator.userAgent.match(/BlackBerry/i) ||
   navigator.userAgent.match(/Windows Phone/i)) {
   useAndroid = true;
}

/* renderizar localStorage */
let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || [];
const main = document.querySelector(".contenedor-storage");

if(dbstorage.length == 0) main.innerHTML = "<p>No hay productos</p>";
else{
   const collection = dbstorage.map(product => {
      return `<item-list 
      nombre="${product.nombre}"
      di=${product.id}
      cantidad=${product.cantidad}
      total=${product.total}
      precio=${product.precio}>
      </item-list>` }).join("");
/* insertando en html */
   main.innerHTML=collection;

   /*-- calculando el total para pagar --*/
   const contenedorTotal = document.createElement("section")
   const total = document.createElement("p");
   let numeroTelefonico = "923909419";
   let btnWhatsapp = document.createElement("a");
   btnWhatsapp.textContent = "pedir por whatsapp";

   let stringTotal_whatsapp = "";

   function sumarTodo(){
     let precioTotal = 0;

     main.childNodes.forEach(item => {
       total.innerHTML = ''
       let subtotal = +(item.getAttribute("total"));
       precioTotal += subtotal;

       if(precioTotal === 0) stringTotal_whatsapp = "";
       else {
         total.textContent = "total: .s/ "+precioTotal.toFixed(2);
         stringTotal_whatsapp += `%0A*${item.getAttribute("nombre")}%28${subtotal}%29`;
       }
     });

     if(stringTotal_whatsapp == "") window.location.href = '/';

     if(useAndroid){
       /*plantilla para movil*/
       btnWhatsapp.setAttribute("href",`whatsapp://send?phone=+51${numeroTelefonico}&text=${stringTotal_whatsapp}%0ATotal=${precioTotal.toFixed(2)}`);
     } else {
       /*plantilla para escritorio*/
       btnWhatsapp.setAttribute("href",`https://wa.me/+51${numeroTelefonico}?text=${stringTotal_whatsapp}%0ATotal=${precioTotal.toFixed(2)}`);
     }
      contenedorTotal.append(total,btnWhatsapp)
     main.appendChild(contenedorTotal)
   }

   /*sumando el total antes de modificar las cantidades*/
   sumarTodo();

   /*-- capturando evento del de <item-list> --*/
   main.childNodes.forEach(item=>{
      item.addEventListener("del",(e)=>{
	 let id = e.detail;
	 const indice = dbstorage.findIndex(objeto => objeto.id === id);

	 // Si es -1, eliminarlo
	 if (indice !== -1) {
	    dbstorage.splice(indice, 1);
	    if(dbstorage.length == 0){
	       main.innerHTML = "<p>No hay productos</p>";
	    }
	    localStorage.setItem("canasta_1",  JSON.stringify(dbstorage));
	    sumarTodo()
	 }

      })

      item.addEventListener("actionItemList",(e)=>{
	 let dbstorage = JSON.parse(localStorage.getItem("canasta_1")) || []

	 let itemFound = false;

	 if(dbstorage.length === 0) return;

	 for (let i = 0; i < dbstorage.length; i++) {
	    if (dbstorage[i].id === e.detail.id) {
	       dbstorage[i].cantidad = e.detail.cantidad;
	       dbstorage[i].total = e.detail.total;
	       itemFound = true;
	       break; // Romper el bucle si ya se encontró y actualizó el objeto
	    }
	 }

	 localStorage.setItem("canasta_1",JSON.stringify(dbstorage));
	 sumarTodo()
      })

   })

}
