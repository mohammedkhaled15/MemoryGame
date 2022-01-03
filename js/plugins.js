

//Declaring function to use in adding multi attributes
function setAttributes(el, attrs){
    for(var key in attrs){
        el.setAttribute(key,attrs[key])
    }
}

// Declaring function to start timer
function startTimer() {

    // Declaring variables for min and sec
    let sec = document.querySelector(".score .sec");
    let min = document.querySelector(".score .min");

    // Making function that will excute every 1000 mille seconds
    const timer = setInterval(function(){

        // Increasing content of sec span by one
        sec.textContent++;

        // Check for the sec to add 0 beside all numbers < 10
    if (sec.textContent <= 9) {
        sec.textContent = `0${sec.textContent}`;

        // Checking when the sec will equal to 59 to convert to 00 and increase min by one
    } else if (sec.textContent == 59) {

        // Converting sec to 00
        sec.textContent = `00`;

        // Increasing min by one
        min.textContent++;

        // Adding 0 to all numbers < 10
        if (min.textContent <= 9) {
            min.textContent = `0${min.textContent}`;
        }
    }
    },1000)    

    document.getElementById("finish").addEventListener("click",function(){
        if(!document.getElementById("results").contains(document.querySelectorAll(".main-rotating-div")[0])){
            clearInterval(timer)
            // document.querySelector("#winner span:first-child").textContent = `${userName}`;
            console.log(userName)
            document.querySelector("#winner span:last-child").textContent = `${min.textContent}:${sec.textContent}`;
            document.getElementById("winner").style.display = "block"
        }else{
            console.log("waaaaaaaiiiiiit")
        }
    })
}

//Main Event of clicking our button and starting the game
document.querySelector("button").addEventListener("click", function (e) {
    
    // launching the timer
    startTimer()

    var userName  = document.querySelector("input[name=username]").value
    
    localStorage.setItem(userName,"00:00")

    
    //Set variables for input
    let noOfElements = document.querySelector("input[name=elements]:checked");

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

            // creating Front Image
            let createdBackImage = document.createElement("img");

            // Adding source of images
            createdBackImage.setAttribute("src",`imgs/question mark.png`)

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

            
            // Changing the display of the results container
            document.getElementById("results").style.display = "grid"

            //Appending Base element to its parent
            document.getElementById("results").appendChild(baseElement);

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
                // document.querySelectorAll(`img[src = '${imageName[imageName.length-1]}']`).forEach((a)=>a.parentElement.parentElement.style.cssText = "display: none; visibility:hidden")
                document.querySelectorAll(`img[src = '${imageName[imageName.length-1]}']`).forEach((a)=>a.parentElement.parentElement.remove())

                },600)    
                
                }
                

                
            })
        }
        
    }
    

    // deleting welcome Page
    document.getElementById("welcome").remove()
    document.getElementById("welcome-back").remove()

});



// if(document.getElementById("results").contains(rotatingImageContainer)){
//     clearInterval(timer)
// }



