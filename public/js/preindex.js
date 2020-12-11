let presentar = () =>{
    let lupulo = document.querySelector('.st1')
    let corcheteR = document.querySelector('.st2r')
    let corcheteL = document.querySelector('.st2l')
    corcheteR.classList.toggle('corchetes')
    corcheteL.classList.toggle('corchetes')
    lupulo.classList.toggle('lupuloAnim')
    setTimeout(()=>{ location.href = '/'; }, 1200);
}

let elLogo = document.querySelector('.cont__intro--logo')
let elinput = document.querySelector('.soyMayor--input')
let elform = document.querySelector('.formSoyMayor')
elinput.checked = false;


elLogo.addEventListener("click",function(){ 
     elinput.checked = true 
     elform.submit()
})