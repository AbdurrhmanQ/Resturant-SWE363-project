const express = require('express');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const mealsRouter = require('./routers/meal_router');
const salesRouter = require('./routers/sales_router').router;
// const meal = require('./models/meal');
//new meal
const mealDB = require('./models/meal_db')
let cartLen = 0
let cartPH = []




const app = express();

// setup the templating engine
app.set('views', './views')
app.set('view engine', 'njk')
nunjucks.configure('views', {
  autoescape: true,
  express: app
});


app.use(express.static('public'));
app.use((req, res, next) => {
  res.removeHeader('x-powered-by')
  next()
})
app.use(cookieParser())


// endpoints
app.get('/', (req, res) => {
  const cartContent = '' + req.cookies['cart']
  const recent = '' + req.cookies['recent-bought']
  const cart = []
  const recentITems = []
  let total = 0
  if(req.cookies['cart'])
  cartLen = cartContent.length
  else
  cartLen = 0


  
  // require the module at top of the file 
  // console.log(meals)
  // get all meals and save them to a constant
  // ...
  const meals = mealDB.getAllMeals();
  const mealsRating = [];
  for (let i = 1; i < 4; i++) {
    const mealRating = mealDB.mealRating(i)
      // mealsRating.push(mealRating.charAt(mealRating.length - 2));
      
    }
    console.log(meals);
  
  
  if(req.cookies['cart']){
    for(let i = 0; i < cartContent.length ;i++){
      cart.push(mealDB.getMealByID(cartContent.at(i)))
      total += cart.at(i).price
    }
  }
  total = total.toFixed(1)

  if(req.cookies['recent-bought']){
    for(let i = 0; i < recent.length ;i++){
        recentITems.push(mealDB.getMealByID(recent.at(i)))
    }
  }
  //pass the meals that was saved in the constant = to the template 
  res.render('index', {
    title: 'Home',
    meals: meals,
    mealsRating,
    cartN: cartLen,
    cartItems: cart,
    TPrice: total,
    recents: recentITems,
    ifRecent: req.cookies['recent-bought']
  })
})

app.post('/', (req, res) =>{
 

})

// routers
app.use('/detail', mealsRouter);

app.use('/sales/cart', salesRouter);


// run the server
app.listen(3000, () => {
  console.log('Running on port: http://localhost:3000');
})