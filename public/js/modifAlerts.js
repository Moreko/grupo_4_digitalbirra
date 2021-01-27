function submitForm(form) {
    const submitFormFunction = Object.getPrototypeOf(form).submit;
    submitFormFunction.call(form);
}

const eliminarBirra = document.getElementById('eliminar')
const modifBirra = document.getElementById('modificar')

eliminarBirra.addEventListener('click', (e) => {
    e.preventDefault()
    Swal.fire({
        html: '<pre class="elAlert">' + '¿Estas seguro de que queres eliminar?' + '</pre>',
        icon: 'question',
        showCancelButton: true,
        background: '#000',
        width:"80%",
        confirmButtonColor: ' #61892F',
        cancelButtonColor: ' #ff6347',
        confirmButtonText: '<pre class="elAlert">' + 'Sí, desde ya' + '</pre>',
        cancelButtonText: '<pre class="elAlert">' + 'No' + '</pre>'
      }).then((result) => {
        if (result.isConfirmed) {
            const elForm = document.getElementById('elFormDelete')
            submitForm(elForm)
        }
    })
})

modifBirra.addEventListener('click', (e)=>{
  e.preventDefault()
  Swal.fire({
      html: '<pre class="elAlert">' + '¿Estas seguro de que queres modificar?' + '</pre>',
      icon: 'question',
      showCancelButton: true,
      background: '#000',
      width:"80%",
      confirmButtonColor: ' #61892F',
        cancelButtonColor: ' #ff6347',
        confirmButtonText: '<pre class="elAlert">' + 'Sí, modificá nomás' + '</pre>',
        cancelButtonText: '<pre class="elAlert">' + 'No' + '</pre>'
    }).then((result) => {
        if (result.isConfirmed) {
            const elForm = document.getElementById('elFormModif')
            submitForm(elForm)
        }
    })
})