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

container.innerHTML += 'estos son los ids: '
storage.forEach(id => {
    container.innerHTML += ' '+ id
    
});
