const index = document.querySelector('#index')
const detail = document.querySelector('#detail')
const form = document.getElementById('form');
const btn = document.getElementById('btn');
const nameF = document.getElementById('nameF');
const field = document.getElementById('reviewF');
const count = document.getElementById('count');
const err = document.getElementById('errM');
var ishidden = true;


const product = [{

}]

function AddToCartS() {
  var C = document.getElementById("Cart_number").innerHTML;
  var CB = document.getElementById("number_of_items").value;
  C = Number(CB) + Number(C);
  document.getElementById("Cart_number").innerHTML = C;

  document.getElementById("number_of_items").value = 1;

}

function INC() {
  var C = document.getElementById("number_of_items").value;
  C++;
  document.getElementById("number_of_items").value = C;
}

function DEC() {
  var C = document.getElementById("number_of_items").value;
  if (C > 1) {
    C--;
    document.getElementById("number_of_items").value = C;
  }
}


$(document).ready(function () {
  $("#ReviewsSection").hide();
  $("#hidding").hide();
});
$("#DescBtn").click(function () {
  $("#ReviewsSection").hide();
  $("#DecsSection").slideToggle("slow");
});

document.getElementById('cartB').addEventListener("click", function () {
  document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function () {
  document.querySelector('.bg-modal').style.display = "none";
});
document.querySelector('.closeB').addEventListener("click", function () {
  document.querySelector('.bg-modal').style.display = "none";
});


$("#ReviewsBtn").click(function () {
  $("#DecsSection").hide();
  $("#ReviewsSection").slideToggle("slow");
});

$("#AddRevBtn").click(function () {
  $("#hidding").slideToggle("slow");
});

if (detail) {
  document.querySelector('#ReviewsBtn').addEventListener('click', async () => {
    let url = '' + window.location
    const id = url.at(url.length - 1)
    await fetch(`/detail/${id}/reviews`).then(response => response.json()).then((data) => {
      if (data.length == 0) {
        document.querySelector('#RevPic').innerHTML = `<h2>No reviews yet</h2>`
      } else {
        for (const d of data) {
          document.querySelector('#reviews').innerHTML += `
            <div class="col-xs-12 col-md-12 col-lg-7">
            <h4 class="font-size font01">${d.reviewer_name}</h4>
            <h5 class="font-size font01">${d.city} - ${d.date} &#11088; ${d.rating}</h5>
            <p class="font-size font01">${d.review}</p></div>`
        }
        console.log(data);

      }

    }).catch(function () {
      console.log('Error');
    })
  })
}



let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].setAttribute('class', 'active') = " active";
}

var animate;

function addReview() {
  if (ishidden) {
    form.style.display = "block";
    ishidden = false;
    // btn.style.backgroundColor = "#FFDD00";
    form.style.left = "100%";
    moveLeft();

    function moveLeft() {
      if (form.style.left == '0%') {
        clearTimeout(animate);
      } else {
        form.style.left = (parseInt(form.style.left) - 1) + '%';
        animate = setTimeout(moveLeft, 2);
      }
    }
  } else {
    // btn.style.backgroundColor = "#FFAA00";
    form.style.display = 'none';
    ishidden = true;
  }
}


field.onkeyup = (e) => {
  err.style.display = 'none';
  count.innerHTML = (e.target.value.length) + '/500';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (nameF.value == '') {
    nameF.value = 'Customer';
  }
  if (field.value.trim() == "") {
    err.style.display = 'inherit';
  } else {
    err.style.display = 'none';
  }
})

// char limit function
//  function limitChar (element) {
//   //  const maxChar = 500;
//   //  window.onerror = true;

//   //  let ele = document.getElementById(element.id);
//   //  var charLen = ele.value.length;

//   //  let p = document.getElementById('charCounter');
//   //  p.innerHTML =  charLen + '/500 ';

//   //  if (charLen > maxChar)
//   //  {
//   //    ele.value = ele.value.substring(0, maxChar);
//   //    p.innerHTML = 0 + ' /500';
//   //   }
//   }