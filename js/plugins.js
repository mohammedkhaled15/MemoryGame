// Declaring variables
var username, scoreTime, startSound, winningSound, wrongSound;

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

    // Adding event to button when you finish you have to press it.
    document.getElementById("finish").addEventListener("click",function(){

        // Check if the cards all finished or not
        if(!document.getElementById("results").contains(document.querySelectorAll(".main-rotating-div")[0])){

            clearInterval(timer) // Stop the time

            // Removing timer after finishing game
            this.remove()

            // Storing the value of your score
            scoreTime = document.querySelector(".score").textContent

            // Adding text content to the #winner div showing the username and the score also adding button to use it in reloading the page
            document.querySelector("#winner").innerHTML = `<h1>Well Done! <span>${username}</span> You made it in Just <span>${scoreTime}</span> </h1><button>Restart The Game</button>`

            // storing your data in session storage
            sessionStorage.setItem(username,scoreTime)
            
            // Declaring Sound of winning
            winningSound = new Audio("../sounds/Deck-the-halls-jingle.mp3")

            // Playing the sound
            winningSound.play()

            // Adding event to the button to reload the page and restart the game
            document.querySelector("#winner button").addEventListener("click", function(){
                document.location.reload()
            })

            // Adding animaion to the score div 
            document.querySelector(".score").style.animation = "enlarge 4s linear forwards"

            // Changing the appearance of the winner banner
            document.getElementById("winner").style.display = "flex"

            // Storing the value in local storage 
            localStorage.setItem(username,scoreTime)

        }else{
            
            // Adding text content to the #winner div showing the username and the score 
            document.querySelector("#winner").innerHTML = `<h1 style="color:red; letter-spacing:2.5px">Searching for Bugs or Want to Cheat ?? Go and Finsh your cards first!</h1>`

            // Changing the appearance of the winner banner
            document.getElementById("winner").style.display = "flex"

            // Declaring new sound
            wrongSound = new Audio("https://raw.githubusercontent.com/mohammedkhaled15/MemoryGame/sounds/Game-show-wrong-answer-sound.mp3")

            // Playing the sound
            wrongSound.play()
            
            // Making the banner disapear after 5 sec to continue the game
            setTimeout(function(){
                document.getElementById("winner").style.display = "none"
            },5500)
        }
    })
}

//Main Event of clicking our button and starting the game
document.querySelector("button").addEventListener("click", function (e) {
    
    // launching the timer
    startTimer()

    startSound = new Audio("../sounds/Card-flip-sound-effect.mp3")

    startSound.play()

    // Initializing the value of username with the input from the client
    username  = document.querySelector("input[name=username]").value

    //Set variables for input
    let noOfElements = document.querySelector("input[name=elements]:checked");

    // Changing height of container according to number of cards
    if(noOfElements.value == 10){
        document.querySelector(".results").style.height = "70vh"
    }else if (noOfElements.value == 20){
        document.getElementById("results").style.height = "100vh"
    }

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

            // Adding indexis and images sources to each img
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

                // saving the index of the clicked image in the array indexOFImages
                indexOfImages.push(this.parentElement.nextElementSibling.querySelector("img").getAttribute("index"))

                //Storing the source of image you clicked as last element in (imageName) Array
                imageName.push(this.parentElement.nextElementSibling.querySelector("img").getAttribute("src")) 
                
                //Checking if the Last element of the array equal to the element before it
                if(imageName.slice(-1)[0] === imageName.slice(-2)[0] && indexOfImages.slice(-1)[0] !== indexOfImages.slice(-2)[0]){

                // Using setTimeout function to make a delay before deleing the element    
                setTimeout(function(){

                // Deleting container of two images that have source which fullfilled the condition i.e clicked twice in seccessive
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
