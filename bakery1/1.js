let nodo = item => document.querySelector(item)

 nodo(".content-galery").childNodes.forEach(imagen => {
   imagen.addEventListener("click",function(){
      let url = this.getAttribute("src")
      nodo(".head-product img").setAttribute("src",url)
   })
})
