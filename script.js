// Création classe d'objet restaurant

class Restaurant {
  constructor(
    category,
    popularity,
    cost,
    delivery,
    takeAway,
    distance,
    halal,
    vege
  ) {
    this.category = category;
    this.popularity = popularity;
    this.cost = cost;
    this.delivery = delivery;
    this.takeAway = takeAway;
    this.distance = distance;
    this.halal = halal;
    this.vege = vege;
  }
}

const near1 = new Restaurant("", "", "", true, true, 0, false, true);
const near2 = new Restaurant("", "", "", false, true, 0, false, true);

const italian1 = new Restaurant("italian", 4, 2, true, true, 2, true, true);
const italian2 = new Restaurant("italian", 5, 3, true, true, 1, true, true);

const asian1 = new Restaurant("asian", 3, 2, true, true, 1, true, true);
const asian2 = new Restaurant("asian", 4, 2, true, true, 2, true, true);

const fastFood1 = new Restaurant("fastfood", 3, 1, false, true, 1, true, true);
const fastFood2 = new Restaurant("fastfood", 2, 2, true, true, 2, true, true);

const french1 = new Restaurant("french", 5, 4, false, false, 4, true, true);
const french2 = new Restaurant("french", 4, 3, false, false, 2, true, true);

const texmex1 = new Restaurant("texmex", 3, 3, false, true, 1, true, true);
const texmex2 = new Restaurant("texmex", 4, 2, false, true, 2, true, true);

const gourmet1 = new Restaurant("gourmet", 5, 5, false, false, 4, false, true);
const gourmet2 = new Restaurant("gourmet", 4, 4, false, false, 3, true, true);

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

function filter() {
  // Récupère options de filtre désirées
  let category = document.getElementById("category").value;
  let popularity = getRadioValue("rate");
  let cost = getRadioValue("prix");
  let delivery = document.getElementById("livraison");
  let takeAway = document.getElementById("emporter");
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
    // Affiche les restaurants dont note >= note minimum filtrée
    if (parseInt(categorySections[i].dataset.popularity) >= popularity) {
      categorySections[i].style.display = "flex";
    } else if (parseInt(categorySections[i].dataset.popularity) < popularity) {
      categorySections[i].style.display = "none";
    }

    // Affiche les restaurants dont prix <= prix maximum filtrée
    if (parseInt(categorySections[i].dataset.cost) <= cost) {
      categorySections[i].style.display = "flex";
    } else if (parseInt(categorySections[i].dataset.cost) > cost) {
      categorySections[i].style.display = "none";
    }

    if (delivery.checked == true) {
      if (categorySections[i].dataset.delivery === "true" && categorySections[i].style.display == "flex") {
        categorySections[i].style.display = "flex";
      } else if (categorySections[i].dataset.delivery !== "true") {
        categorySections[i].style.display = "none";
      }
    } else {
      categorySections[i].style.display = "flex";
    }

    // Affiche les restaurants qui proposent la livraison si case cochée
    // for (let i = 0; i < categorySections.length; i++) {
    //   if (check() === true) {
    //     if (categorySections[i].dataset.delivery == "true" && categorySections[i].style.display == "flex") {
    //       categorySections[i].style.display = "flex";
    //     } else if (categorySections[i].dataset.delivery == "false"){
    //       categorySections[i].style.display = "none";
    //     }
    //   } else if (categorySections[i].style.display = "flex"){
    //     categorySections[i].style.display = "flex"
    //   }
    // }
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

function getRadioValue(score) {
  let listRadio = document.getElementsByName(score);

  for (let i = 0; i < listRadio.length; i++) {
    if (listRadio[i].checked) {
      return listRadio[i].value;
    }
  }
}

function showCats(myArr) {
  for (let cats of myArr) {
    cats.style.display = "initial";
  }
}
