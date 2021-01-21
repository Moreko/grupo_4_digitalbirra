const minusButton = document.getElementById('menos');
const plusButton = document.getElementById('mas');
const inputField = document.getElementById('input');

<<<<<<< HEAD
minusButton.addEventListener('click', event => {
  event.preventDefault();
  const currentValue = Number(inputField.value);
  if (currentValue >1){
    inputField.value = currentValue - 1;
  }
});

plusButton.addEventListener('click', event => {
  event.preventDefault();
  const currentValue = Number(inputField.value);
  if (currentValue < 20){

    inputField.value = currentValue + 1;
  }
});
=======
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
>>>>>>> 4f72dfeae087e03037ddaa7dd75c41c5c60373e4
