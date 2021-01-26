    const addButton = document.querySelector('.btn--agregar')
    const pathArray = window.location.pathname.split('/');
    const elId = pathArray[pathArray.length - 1]


    function loadStorage() {
        let storage = localStorage.getItem('carrito')
        if (storage == null) {
            storage = []
        } else {
            storage = JSON.parse(storage)
        }
        return storage
    }

    function inicio() {
        let storage = loadStorage()
        if (storage.includes(elId)) {
            addButton.innerText = 'Remover'
        }
    }

    inicio()

    function addBirra(unId, e) {
        let storage = loadStorage()
        if (!storage.includes(unId)) {
            let newStorage = JSON.stringify([...storage, unId])
            localStorage.setItem('carrito', newStorage)
            e.target.innerText = 'Remover'
        } else {
            storage = storage.filter(birra => birra != unId)
            let newStorage = JSON.stringify(storage)
            localStorage.setItem('carrito', newStorage)
            e.target.innerText = 'Agregar'
        }
    }


    addButton.addEventListener('click', function(e) {
        e.preventDefault()
        addBirra(elId, e)
        console.log(localStorage)
    })