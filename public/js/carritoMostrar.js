function loadStorage(){
    let storage = localStorage.getItem('carrito')
    if (storage == null){
        storage = []
    } else {
        storage = JSON.parse(storage)
    }
    return storage
}

let storage = loadStorage()
let container = document.querySelector('.carrito_productos')


storage.forEach(id => {
    let fetchUrl = 'http://localhost:4000/api/birras/' + id
    fetch(fetchUrl)
    .then(data => data.json())
    .then(birra => 
        container.innerHTML += '<article class="carrito__producto"><img class="carrito_producto--img" src=/img/products/'
        + birra.data.imagen + '>'
        )

});
