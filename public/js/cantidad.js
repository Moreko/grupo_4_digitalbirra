const sumarButton = document.querySelector('.agregar')

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