٩//Set variables for input
let noOfElements = document.querySelector("input[name = elements]");

//Declaring function to use in adding multi attributes
function setAttributes(el, attrs){
    for(var key in attrs){
        el.setAttribute(key,attrs[key])
    }
}

//Main Event of Sumbiting our form and starting the game
document.querySelectorAll("form")[0].onsubmit = function (e) {
    
    //Preventing default of sumbiting button
    e.preventDefault();

    //Validating Input
    if(noOfElements.value<1||noOfElements.value === 0||noOfElements.value %2 !== 0||noOfElements.value<4||noOfElements.value===""){

        alert("Please Enter an Even No between 4 and 30")

    }else{

    //Deleting All Previous created divs and sections
    document.querySelectorAll("[class = box]").forEach((s) => s.remove());
    
    //Declaring variable used in adding "index" attribute to images
    let k = 0

    //declaring array outside the next loop to use later in game processing
    let imageName = []
    let indexOfImages = []

    //Main Loop for creating all elements and images inside them
    for (let i = 1; i <= (noOfElements.value / 2); i++) {

        //Secondary Loop for creating image two times
        for(let j = 0; j<2;j++){
        
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

            /******************************************************/
            
            // creating Front unknown div
            let unknownDiv = document.createElement("div");

            //Adding class
            unknownDiv.classList.add("card","front-image")

            // creating Back Image
            let createdBackImage = document.createElement("img");

            // createdBackImage.setAttribute("id",{})

            // Adding source of images
            createdBackImage.setAttribute("src",`imgs/question-mark.png`)

            // appending image to the its container
            unknownDiv.append(createdBackImage)

            // appending image container to rotating images container
            rotatingImageContainer.append(unknownDiv)

            /******************************************************/

            // creating Back Image Container
            let createdImageCont1 = document.createElement("div");

            //Adding class
            createdImageCont1.classList.add("card", "back-image")

            // creating BackImage
            let createdImage1 = document.createElement("img");

            
            setAttributes(createdImage1,{"src":`imgs/${i}.jpg`,"index":`${++k}`})

            // appending image to the its container
            createdImageCont1.append(createdImage1)

            // appending image container to rotating images container
            rotatingImageContainer.append(createdImageCont1)

            /******************************************************/

            //Appending Base element to its parent
            document.getElementsByClassName("results")[0].appendChild(baseElement);

            /******************************************************/

            //getting a random number
            let rand = Math.floor(Math.random()*noOfElements.value)

            //using random number as an order for flex sys
            baseElement.style.setProperty("order",`${rand}`)

            /****************************************************/
            //************  --Game Play Process--  **************/
            /****************************************************/

            createdBackImage.addEventListener("click", function(e){

                //rotating the element on click
                rotatingImageContainer.style.setProperty("transform","rotatey(180deg)")
            
                //rotating the element on mouse leave
                rotatingImageContainer.addEventListener("mouseleave" , function(){
                    rotatingImageContainer.style.setProperty("transform","rotatey(360deg)")
                })

                indexOfImages.push(this.parentElement.nextElementSibling.querySelector("img").getAttribute("index"))

                //Storing the source of image you clicked as last element in (imageName) Array
                imageName.push(this.parentElement.nextElementSibling.querySelector("img").getAttribute("src")) 
                
                //Checking if the Last element of the array equal to the element before it
                if(imageName.slice(-1)[0] === imageName.slice(-2)[0] && indexOfImages.slice(-1)[0] !== indexOfImages.slice(-2)[0]){
                    

                setTimeout(function(){

                // Deleting container of two images that have source which fullfilled the condition i.e clicked twice in seccessive
                document.querySelectorAll(`img[src = '${imageName[imageName.length-1]}']`).forEach((a)=>a.parentElement.parentElement.style.cssText = "visibility: hidden; ")

                },1000)    
                
                    
                }
                
            })
        }
        
    }
    
    // deleting options
    this.remove()
    document.querySelector("h1").remove()
    }
};

