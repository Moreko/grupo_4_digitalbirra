function submitForm(form) {
    const submitFormFunction = Object.getPrototypeOf(form).submit;
    submitFormFunction.call(form);
}

const eliminarBirra = document.getElementById('eliminar')
const modifBirra = document.getElementById('modificar')

eliminarBirra.addEventListener('click', (e)=>{
    e.preventDefault()
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
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
      title: 'Estas seguro de que queres modificar?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desde ya!'
    }).then((result) => {
      if (result.isConfirmed) {
       const elForm = document.getElementById('elFormModif')
       submitForm(elForm)
      }
    })
})