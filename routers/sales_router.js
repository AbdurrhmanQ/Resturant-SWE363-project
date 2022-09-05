const cookieParser = require('cookie-parser');
const { query } = require('express');
const express = require('express');
const bodyParser = require('body-parser')


const router = express.Router();
router.use(express.static('./public'));
var urlencodedParser = bodyParser.urlencoded({extended: false})
router.use(cookieParser())


router.get('/', (req, res) => {
  const cookies = req.cookies['cart']
  const cookie = '' + cookies;
  // console.log(cookies);
  if(cookies == null){
    res.cookie('cart', [req.query.id])
  }else{
    cookie.valueOf(cookie)
    res.cookie('cart', [cookie + req.query.id])
  }
  const path = req.query.back
  // console.log(req.query.back);
    res.redirect(path)
  

})
router.post('/', urlencodedParser , (req, res) => {
  const cart = '' + req.cookies['cart']
  var dub = '' + cart.at(0)
    for(var i = 1; i < cart.length; i++ ){
      if(!dub.includes(cart[i]))
        dub += cart.at(i)
    }
  res.cookie('recent-bought', dub)
  res.clearCookie('cart')
  res.redirect('/')
})



module.exports = {
  router: router,}