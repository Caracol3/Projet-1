function filter() {
    let categorie = document.getElementById("categorie").value;
    let popularity = getRadioValue("rate"); 
    let cost = getRadioValue("prix");
    let delivery = document.getElementById("livraison").checked;
    let takeOut = document.getElementById("emporter").checked;
    let distance = document.getElementById("distance").value;
    let hallal = document.getElementById("hallal").checked;
    let vege = document.getElementById("vege").checked;

}









function getRadioValue(score) {
    let listRadio = document.getElementsByName(score);

    for (i = 0; i < listRadio.length; i++) {
        if (listRadio[i].checked) {
            return listRadio[i].value;
        }
    }
}