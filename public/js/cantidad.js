const minusButton = document.getElementById('menos');
const plusButton = document.getElementById('mas');
const inputField = document.getElementById('input');

document.querySelectorAll('.agregar').forEach(item => {
    item.addEventListener('click', event => {
     const sumar= item.parentElement
    sumar.querySelector('input').stepUp()
     

    })
  })

  document.querySelectorAll('.menos').forEach(item => {
    item.addEventListener('click', event => {
      const restar = item.parentElement
      restar.querySelector('input').stepDown()
    })
  })
