function submitForm(form) {
    const submitFormFunction = Object.getPrototypeOf(form).submit;
    submitFormFunction.call(form);
}

document.querySelectorAll('.sarasa').forEach(item => {
    item.addEventListener('click', event => {

        event.preventDefault()
        Swal.fire({
            html: '<pre class="elAlert">' + 'Sumado al carrito nomás' + '</pre>',
            icon: 'correct',
            background: '#000',
            width:"50%",
            showCancelButton: false,
            confirmButtonColor: ' #61892F',
            confirmButtonText: 'Ok',
            customClass: {
                popup: 'elAlert'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const elForm = item.parentElement
                submitForm(elForm)
            }
        })

    })
})