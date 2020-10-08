const birras = [{
    nombre:'Ipa',
    precio: 100,
    graduacion: '14%',
    descripcion:  function() {
      return 'La ' + this.nombre + " es la primera de ... ";
    },
    mililitros: 500,
    ibu: 30,
  }, {
    nombre:'Rubia',
    precio: 120,
    graduacion: '10%',
    descripcion:  function() {
      return 'La ' + this.nombre + " es una gran idea... ";
    },
    mililitros: 500,
    ibu: 40,
  },{
    nombre:'Negra',
    precio: 120,
    graduacion: '15%',
    descripcion:  function() {
      return 'La ' + this.nombre + " fue pensada... ";
    },
    mililitros: 500,
    ibu: 60,
  },{
    nombre:'Roja',
    precio: 140,
    graduacion: '11%',
    descripcion:  function() {
      return 'La ' + this.nombre + " es una de nuestras favoritas... ";
    },
    mililitros: 500,
    ibu: 45,
  }]


  module.exports = {
      index: (req,res)=>{
        res.render('producto', {birra : birras[1]})
      },

      detalle: (req, res) =>{
        let birra = birras.find(unaBirra => unaBirra.nombre == req.params.nombre)
        res.render('producto', { birra: birra })
      },

      createForm: (req, res) =>{
        res.render("sumar_producto");
      },

      modificarProducto: (req, res) =>{
        res.render("modif_producto");
      }
}