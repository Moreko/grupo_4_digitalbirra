function submitForm(form) {
    const submitFormFunction = Object.getPrototypeOf(form).submit;
    submitFormFunction.call(form);
}

const eliminarBirra = document.getElementById('eliminar')
const modifBirra = document.getElementById('modificar')

eliminarBirra.addEventListener('click', (e) => {
    e.preventDefault()
    Swal.fire({
        title: 'Estas seguro de que queres eliminar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: ' #61892F',
        cancelButtonColor: ' #ff6347',
        confirmButtonText: 'Sí, borrá nomás!'
    }).then((result) => {
        if (result.isConfirmed) {
            const elForm = document.getElementById('elFormDelete')
            submitForm(elForm)
        }
    })
})

modifBirra.addEventListener('click', (e) => {
    e.preventDefault()
    Swal.fire({
        title: 'Estas seguro de que queres modificar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: ' #61892F',
        cancelButtonColor: ' #ff6347',
        confirmButtonText: 'Sí, modificá nomás!'
    }).then((result) => {
        if (result.isConfirmed) {
            const elForm = document.getElementById('elFormModif')
            submitForm(elForm)
        }
    })
})