function submitForm(form) {
    const submitFormFunction = Object.getPrototypeOf(form).submit;
    submitFormFunction.call(form);
}

const eliminarBirra = document.getElementById('eliminar')


eliminarBirra.addEventListener('click', (e)=>{
    console.log('blabla')
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