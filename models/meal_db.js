const Sqlite = require('better-sqlite3');
const db = new Sqlite('./Restaurant.db', { verbose: console.log });


function getMealReviews(id) {
  const row = db.prepare('SELECT * FROM reviews WHERE meal_id = ? ').all(id)
  return row
}

function getAllMeals() {
  const table = db.prepare('SELECT * FROM Meals').all()
  // console.log(table);
  return table
}

function getMealByID(id) {
  const row = db.prepare('SELECT * FROM Meals WHERE id = ?').get(id)
  return row

}

function addMealReview(record) {
  addReviewValidator(record)
  let date = (new Date().toLocaleDateString())
  const { name, city, rating, review, image, meal_id } = record

  db.prepare('INSERT INTO reviews (reviewer_name, city, date , rating, review, image, meal_id) VALUES (?, ?,?, ? ,? ,? ,?)')
    .run(name, city, date, rating, review, image, meal_id)
}
function mealRating(id){
  const row = (db.prepare(`SELECT avg(rating) FROM reviews WHERE meal_id = ?`).get(id));
  return row
}


function addReviewValidator(review) {
  let messages = [];

  if (!review) {
    messages.push('No review was provided')
  }
  if (!review.name) {
    messages.push('No name for a reviewer was provided')
  }
  if (!review.city) {
    messages.push('No city was provided')
  }
  if (!review.rating) {
    messages.push('No rating was provided')
  }
  if (!review.review) {
    messages.push('No review was provided')
  }

  if (messages.length) {
    throw new Error(messages.join(', '))
  }
}


module.exports = {
  getAllMeals,
  getMealByID,
  getMealReviews,
  addMealReview,
  mealRating,
}