const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");
closeIcon.style.display = "none";
function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

// Création classe d'objet restaurant

class Restaurant {
  constructor(
    category,
    popularity,
    cost,
    delivery,
    takeaway,
    distance,
    halal,
    vege,
    filter
  ) {
    this.category = category;
    this.popularity = popularity;
    this.cost = cost;
    this.delivery = delivery;
    this.takeaway = takeaway;
    this.distance = distance;
    this.halal = halal;
    this.vege = vege;
    this.filter = filter;
  }
}

const near1 = new Restaurant("", "", "", true, true, 0, false, true, []);
const near2 = new Restaurant("", "", "", false, true, 0, false, true, []);

const italian1 = new Restaurant("italian", 4, 2, true, true, 2, true, true, []);
const italian2 = new Restaurant("italian", 5, 3, true, true, 1, true, true, []);

const asian1 = new Restaurant("asian", 3, 2, true, true, 1, true, true, []);
const asian2 = new Restaurant("asian", 4, 2, true, true, 2, true, true, []);

const fastFood1 = new Restaurant(
  "fastfood",
  3,
  1,
  false,
  true,
  1,
  true,
  true,
  []
);
const fastFood2 = new Restaurant(
  "fastfood",
  2,
  2,
  true,
  true,
  2,
  true,
  true,
  []
);

const french1 = new Restaurant("french", 5, 4, false, false, 4, true, true, []);
const french2 = new Restaurant("french", 4, 3, false, false, 2, true, true, []);

const texmex1 = new Restaurant("texmex", 3, 3, false, true, 1, true, true, []);
const texmex2 = new Restaurant("texmex", 4, 2, false, true, 2, true, true, []);

const gourmet1 = new Restaurant(
  "gourmet",
  5,
  5,
  false,
  false,
  4,
  false,
  true,
  []
);
const gourmet2 = new Restaurant(
  "gourmet",
  4,
  4,
  false,
  false,
  3,
  true,
  true,
  []
);

const restaurantArr = [
  near1,
  near2,
  italian1,
  italian2,
  asian1,
  asian2,
  fastFood1,
  fastFood2,
  french1,
  french2,
  texmex1,
  texmex2,
  gourmet1,
  gourmet2,
];

const categorySections = document.getElementsByClassName("category_section");
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < categorySections.length; i++) {
    addData(categorySections[i].id, restaurantArr[i]);
  }
});

let filterButton = document.querySelector("#filterButton");
filterButton.addEventListener("click", () => {
  filter();
});

function filter() {
  // Récupère options de filtre désirées
  let category = document.getElementById("category").value;
  let popularity = document.querySelector(`input[name="rate"]:checked`).value;
  let cost = document.querySelector(`input[name="prix"]:checked`).value;
  let delivery = document.getElementById("delivery");
  let takeaway = document.getElementById("takeaway");
  let distance = document.getElementById("distance").value;
  let halal = document.getElementById("halal");
  let vege = document.getElementById("vege");

  const categoryArr = document.getElementsByClassName("category");

  //Initialise le filtrage en cachant toutes les catégories
  for (let thisCategory of categoryArr) {
    thisCategory.style.display = "none";
  }

  // Début du filtrage et affiche les catégories qui intéressent
  switch (category) {
    case "fastfood":
      document.getElementById("tag_fastfood").style.display = "initial";
      break;
    case "asian":
      document.getElementById("tag_asian").style.display = "initial";
      break;
    case "texmex":
      document.getElementById("tag_texmex").style.display = "initial";
      break;
    case "italian":
      document.getElementById("tag_italian").style.display = "initial";
      break;
    case "french":
      document.getElementById("tag_french").style.display = "initial";
      break;
    case "gourmet":
      document.getElementById("tag_gourmet").style.display = "initial";
      break;
    default:
      showCats(categoryArr);
      break;
  }

  //Début itération entre chaque restaurant pour afficher ou non en fonction des options de tri
  for (let i = 0; i < categorySections.length; i++) {
    let checkboxFilterArray = [];
    if (categorySections[i].classList.contains("restaurant_hide")) {
      categorySections[i].classList.toggle("restaurant_hide");
    }
    // Cache les restaurants dont note < note minimum filtrée
    if (
      parseInt(categorySections[i].dataset.popularity) < popularity &&
      categorySections[i].classList.contains("restaurant_hide") === false
    ) {
      categorySections[i].classList.toggle("restaurant_hide");
    }

    // Cache les restaurants dont prix > prix maximum filtrée
    if (
      parseInt(categorySections[i].dataset.cost) > cost &&
      categorySections[i].classList.contains("restaurant_hide") === false
    ) {
      categorySections[i].classList.toggle("restaurant_hide");
    }

    checkboxFilterArray.push(checkboxFilter(delivery, categorySections, i));
    checkboxFilterArray.push(checkboxFilter(takeaway, categorySections, i));

    if (
      parseInt(categorySections[i].dataset.distance) > distance &&
      categorySections[i].classList.contains("restaurant_hide") === false
    ) {
      categorySections[i].classList.toggle("restaurant_hide");
    }

    checkboxFilterArray.push(checkboxFilter(halal, categorySections, i));
    checkboxFilterArray.push(checkboxFilter(vege, categorySections, i));

    console.log(checkboxFilterArray);
    if (
      checkboxFilterArray.includes("hide") &&
      categorySections[i].classList.contains("checkbox_restaurant_hide") ===
        false
    ) {
      categorySections[i].classList.toggle("checkbox_restaurant_hide");
    } else if (
      checkboxFilterArray.includes("hides") === false &&
      categorySections[i].classList.contains("checkbox_restaurant_hide")
    ) {
      categorySections[i].classList.toggle("checkbox_restaurant_hide");
    }
  }
}
// Fonction injection de data dans les sections restaurant
function addData(elementId, obj) {
  let element = document.getElementById(elementId);
  let keyArr = Object.keys(obj);
  let valuesArr = Object.values(obj);
  for (let i = 0; i < Object.keys(obj).length; i++) {
    element.setAttribute("data-" + keyArr[i], valuesArr[i]);
  }
}

function showCats(myArr) {
  for (let cats of myArr) {
    cats.style.display = "initial";
  }
}

//Fonction vérification checkbox
function checkboxFilter(checkbox, array, index) {
  if (checkbox.checked == true) {
    if (
      array[index].dataset[checkbox.name] != "true" &&
      array[index].classList.contains("checkbox_restaurant_hide") == false
    ) {
      return "hide";
    } else {
      return "show";
    }
  }
}

/* retour du bouton du formulaire */

function submitForm (){
  alert("formulaire envoyé");
};
