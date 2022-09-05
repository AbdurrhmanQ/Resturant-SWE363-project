const express = require('express');
const meals = require('../models/meal');
const Mdb = require('../models/meal_db');
const multer = require('multer')
const storage = multer.diskStorage({ destination: './public/reviewImages/' })

let cartLen = 0
const upload = multer({ storage: storage })


const router = express.Router()
router.use(express.static('./public'))

router.use(express.json())

//default detail page
router.get('/', (req, res) => {
  res.redirect('./2')
})


//deatail with paramter as a meal id
router.get('/:id', (req, res) => {

  const r = '' + req.cookies['cart']
  const cart = []
  let total = 0
  if (req.cookies['cart'])
    cartLen = r.length

  const id = req.params.id
  //TODO: change meals to Mdb
  const meal = Mdb.getMealByID(id);
  const mealFact = meals.getByID(id)
  if (req.cookies['cart']) {
    for (let i = 0; i < r.length; i++) {
      //TODO: change meals to Mdb
      cart.push(Mdb.getMealByID(r.at(i)))
      total += cart.at(i).price
    }
  }
  total = total.toFixed(1)

  res.render('detail', {
    title: meal.title + ' detail',
    meal: meal,
    mealFact,
    cartN: cartLen,
    cartItems: cart,
    TPrice: total,
  })
})


router.get('/:id/reviews', (req, res) => {
  const id = req.params.id
  const revs = Mdb.getMealReviews(id)
  //meal database Object here //for accessing the json encoded array
  if (!revs) {
    res.send('NO Reviews yet!')
  }

  res.send(revs)
})


router.post('/:id/reviews', upload.single('image'), (req, res) => {
  const {city, name, rating, review} = req.body
  const record = {
    name,
    city,
    rating,
    review,
    image: req.file.originalname,
    meal_id: req.params.id
  };

  try {
    Mdb.addMealReview(record)
  } catch (error) {
    res.status(401).send(error.message)
  }

  res.redirect('/detail/' + req.params.id)
})



module.exports = router