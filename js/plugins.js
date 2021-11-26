

//Set variables for input
let noOfElements = document.querySelector("input[name = elements]");

document.querySelectorAll("form")[0].onsubmit = function (e) {
  //Preventing default of sumbiting button
    e.preventDefault();

    //Deleting All Previous created divs and sections
    document.querySelectorAll("[class = box]").forEach((s) => s.remove());

    for (let i = 1; i <= noOfElements.value; i++) {

    //Creating main element
    let baseElement = document.createElement("div");

    //Adding class
    baseElement.className = "base";

    /******************************************************/

    //Creating Rotating images container
    let rotatingImageContainer = document.createElement("div")

    //Adding Classes
    rotatingImageContainer.classList.add("main-rotating-div")

    //Appending to base Element
    baseElement.append(rotatingImageContainer)

    //event of rotating
    rotatingImageContainer.onmouseover = function(){
        rotatingImageContainer.style.setProperty("transform","rotatey(180deg)")
    }
    rotatingImageContainer.onmouseout = function(){
        rotatingImageContainer.style.setProperty("transform","rotatey(360deg)")
    }


    /******************************************************/
    
    // creating Front unknown div
    let unknownDiv = document.createElement("div");

    //Adding class
    unknownDiv.classList.add("card","front-image")

    // creating Front Image
    let createdBackImage = document.createElement("img");

    // Adding source of images
    createdBackImage.setAttribute("src",`../imgs/question mark.png`)

    // appending image to the its container
    unknownDiv.append(createdBackImage)

    // appending image container to rotating images container
    rotatingImageContainer.append(unknownDiv)

    /******************************************************/

    // creating Back Image Container
    let createdImageCont = document.createElement("div");

    //Adding class
    createdImageCont.classList.add("card", "back-image")

    // creating BackImage
    let createdImage = document.createElement("img");
    
    // Adding source of images
    createdImage.setAttribute("src",`../imgs/${i}.jpg`)

    // appending image to the its container
    createdImageCont.append(createdImage)

    // appending image container to rotating images container
    rotatingImageContainer.append(createdImageCont)

    /******************************************************/

    // appending image to the div
    // baseElement.append(createdImage)

    /******************************************************/

    //Appending Base element to its parent
    document.getElementsByClassName("results")[0].appendChild(baseElement);

    }

    // deleting options
    this.remove()
    document.querySelector("h1").remove()
};