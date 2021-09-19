console.log('%c HI', 'color: firebrick')
function getAllDogs() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json()) //dogs is an object with the array, so using forEach method
    .then(dogs => dogs.message.forEach(imageOfDog => renderOneDog(imageOfDog)))
   //debugger
}
function getAllBreeds(letter) {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(breeds => { // breeds is an object of objects, so using For-in loop
                    if(letter === "") {// first time render the whole list of all breeds, no letter was chosen
                        for(breed in breeds.message) {
                            renderBreed(breed)
                    }}
                    else{ //letter has been chosen and was passing here
                        const list = document.querySelector("#dog-breeds");
                        list.replaceChildren(); //clear a list before rendering a new list
                        for(breed in breeds.message) {
                            if(breed[0][0] === letter) {//if first letter of a breed starts with the passed letter
                            renderBreed(breed)}
                    }}        
    })
}
function filterListener() {
    const select = document.querySelector("#breed-dropdown")
    select.addEventListener("change", filterBreeds)
}
function filterBreeds(event) {
    const beenSelected = 1;
    let letter = event.target.value;
    getAllBreeds(letter,beenSelected);  
}   
//DOM render image of one dog. (animal) is a url to a dog's image
function renderOneDog(animal) {
    let card = document.createElement("img");
    card.src = `${animal}`;
    const imageContainer = document.querySelector("#dog-image-container");
    imageContainer.appendChild(card);
}
function renderBreed(br) {
    const list = document.querySelector("#dog-breeds");
    const breedElement = document.createElement("li");
    breedElement.innerText = br;
    list.appendChild(breedElement);
    breedElement.addEventListener("click", changeColor);
}
function changeColor(event) {
    event.target.style.color = "green"
}
//Get data(images and list of breeds)
function initialize() {
    const beenSelected = 0;
    const letter = "";
    getAllDogs();
    getAllBreeds(letter, beenSelected);
    filterListener(); 
}

initialize();