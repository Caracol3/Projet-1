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


let linkFilter = document.getElementById("link-filter");
let iconFilter = document.querySelector(".filter-icon");
let filterMenu = document.querySelector(".div-filter");

/* gestionnaire d'événement sur le a#link pour venir changer l'attribution de la classe .open à la ul et au span#burger */
linkFilter.addEventListener("click", function (event) {
  event.preventDefault();
  iconFilter.classList.toggle("open");
  filterMenu.classList.toggle("open");
});


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

const italian1 = new Restaurant("italian", 4, 2, true, true, 2, true, true, []); //Création de chaque restaurant comme objet
const italian2 = new Restaurant("italian", 5, 3, true, true, 1, true, true, []); //en utilisant la classe constructeur

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
  //Création d'un tableau contenant chaque objets et leurs propriété
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

const categorySections = document.getElementsByClassName("category_section"); //Création d'un tableau récupérant chaque restaurant HTML
document.addEventListener("DOMContentLoaded", function () {
  //Au chargement de la page/du DOM...
  for (let i = 0; i < categorySections.length; i++) {
    //itération du tableau en passant sur chaque objet restaurant
    addData(categorySections[i].id, restaurantArr[i]); //appel de la fonction addData en passant comme argument l'id
  } //des restaurants HTML et les restaurants dans le tableau JS
});

let filterButton = document.querySelector("#filterButton"); //Au clique sur le bouton du menu filtre, appelle la fonction filter()
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
    default: //Affiche toutes les catégories sur aucune n'ait choisis pour le filtre
      showCats(categoryArr);
      break;
  }

  //Début itération entre chaque restaurant pour afficher ou non en fonction des options de tri
  for (let i = 0; i < categorySections.length; i++) {
    let checkboxFilterArray = []; //Création d'un tableau checkboxFilterArray permettant de stocker les valeurs "hide" ou "show" en fonction de
    if (categorySections[i].classList.contains("restaurant_hide")) {
      //si on veut cacher ou non un élément plus tard
      categorySections[i].classList.toggle("restaurant_hide");
    }
    // Cache les restaurants dont note < note minimum filtré
    if (
      parseInt(categorySections[i].dataset.popularity) < popularity &&
      categorySections[i].classList.contains("restaurant_hide") === false
    ) {
      categorySections[i].classList.toggle("restaurant_hide");
    }

    // Cache les restaurants dont prix > prix maximum filtré
    if (
      parseInt(categorySections[i].dataset.cost) > cost &&
      categorySections[i].classList.contains("restaurant_hide") === false
    ) {
      categorySections[i].classList.toggle("restaurant_hide");
    }

    checkboxFilterArray.push(checkboxFilter(delivery, categorySections, i)); //Appel de la fonction checkboxFilter et utilisation du tableau
    checkboxFilterArray.push(checkboxFilter(takeaway, categorySections, i)); //checkboxFilterArray[], ajoutant la valeur "hide" ou "show"
    //dans le tableau selon le retour de la fonction
    if (
      parseInt(categorySections[i].dataset.distance) > distance && //Cache les restaurants dont distance > distance voulue
      categorySections[i].classList.contains("restaurant_hide") === false
    ) {
      categorySections[i].classList.toggle("restaurant_hide");
    }

    checkboxFilterArray.push(checkboxFilter(halal, categorySections, i));
    checkboxFilterArray.push(checkboxFilter(vege, categorySections, i));

    console.log(checkboxFilterArray);
    if (
      //Utilisation du tableau checkboxFilterArray
      checkboxFilterArray.includes("hide") &&
      categorySections[i].classList.contains("checkbox_restaurant_hide") === //Si le tableau comporte "hide" pour un restaurant et que
        false //et que le restaurant HTML ne possède PAS la class pour cacher
    ) {
      categorySections[i].classList.toggle("checkbox_restaurant_hide"); //Lui ajoute la class .checkbox_restaurant_hide pour cacher
    } else if (
      checkboxFilterArray.includes("hides") === false && //Si le tableau ne comporte PAS "hide" mais qu'il contient la class
      categorySections[i].classList.contains("checkbox_restaurant_hide") //pour cacher
    ) {
      categorySections[i].classList.toggle("checkbox_restaurant_hide"); //Lui enlève la classe afin de l'afficher
    }
  }
}
// Fonction injection de data dans les sections restaurant
function addData(elementId, obj) {
  let element = document.getElementById(elementId); //Récupère les restaurants HTML selon leur id
  let keyArr = Object.keys(obj); //Récupère les clés et valeurs des objets Restaurant et les stocks dans des tableaux
  let valuesArr = Object.values(obj);
  for (let i = 0; i < Object.keys(obj).length; i++) {
    //Itère en fonction du nombre de clé (de propriété par obj)
    element.setAttribute("data-" + keyArr[i], valuesArr[i]); //Ajoute des dataset dans la balise HTML de chaque Restaurant HTML
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
      array[index].dataset[checkbox.name] != "true" && //Si la checkbox de tri est cochée (livraison, à emporter, halal, végé...)
      array[index].classList.contains("checkbox_restaurant_hide") == false //Et si le restaurant HTML possède déjà la class checkbox_restaurant_hide
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
