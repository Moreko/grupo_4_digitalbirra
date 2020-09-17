let presentar = () =>{
    let lupulo = document.querySelector('.st1')
    let corcheteR = document.querySelector('.st2r')
    let corcheteL = document.querySelector('.st2l')
    corcheteR.classList.toggle('corchetes')
    corcheteL.classList.toggle('corchetes')
    lupulo.classList.toggle('lupuloAnim')
    setTimeout(()=>{ location.href = 'index'; }, 1200);
    
}
