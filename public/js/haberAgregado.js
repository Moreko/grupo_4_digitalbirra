function submitForm(form) {
    const submitFormFunction = Object.getPrototypeOf(form).submit;
    submitFormFunction.call(form);
}

document.querySelectorAll('.sarasa').forEach(item => {
    item.addEventListener('click', event => {
   
        event.preventDefault()
        Swal.fire({
            title: 'Agregaste al carrito',
            icon: 'correct',
            showCancelButton: false,
            confirmButtonColor: ' #61892F',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
             const elForm= item.parentElement
             submitForm(elForm)
            }
          })

    })
  })