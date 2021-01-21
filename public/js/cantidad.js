const minusButton = document.getElementById('menos');
const plusButton = document.getElementById('mas');
const inputField = document.getElementById('input');

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