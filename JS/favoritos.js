function Favoritos(){
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if(favoritos.length == 0){
        document.getElementById("root").innerHTML = "no hay favoritos"
    }else{
        document.getElementById("root").innerHTML = generarLista(favoritos)
    }
    
}