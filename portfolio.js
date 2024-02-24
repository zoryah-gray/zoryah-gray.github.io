// On page load or reload, scroll top of page
// 
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  
  
  
  
  let scrollCont = document.querySelector(".game-gallery");
  let leftArrw = document.getElementById("leftArrow");
  let rightArrw = document.getElementById("rightArrow");
  
  scrollCont.addEventListener("wheel", (event) => {
    event.preventDefault();
    scrollCont.scrollLeft += event.deltaY;
    scrollCont.style.scrollBehavior = "auto";
    
  });
  
  rightArrw.addEventListener("click", () =>{
    scrollCont.style.scrollBehavior = "smooth";
    scrollCont.scrollLeft += 630;
  });
  
  leftArrw.addEventListener("click", () =>{
    scrollCont.style.scrollBehavior = "smooth";
    scrollCont.scrollLeft -= 630;
  });
  
  
  function createGameDetailsCard(game){
    var card = document.createElement('div');
    card.classList.add('game-details-card');
    
    card.innerHTML = `
                    <h1 class="game-text">${game.title}</h1>
                    <img class="game-img" src=${game.img_src}>
                    <p class="game-desc-text">${game.desc}</p>
                    <button class="game-button" onclick=${game.onclick_function}>Play</button>
    `;
  
    
    return card;
  }
  
  //gets called when a game img is clicked
  function displayGameDetailsCard(id){
    // console.log("starting func details");
    var gameDetailsContainer = document.getElementById("game-details-container");
  
    
    //   clear any divs in the container
    var divChild = gameDetailsContainer.lastElementChild;
    while (divChild){
      gameDetailsContainer.removeChild(divChild);
      divChild = gameDetailsContainer.lastElementChild;
    }
    
    //   get data from json file - dictionary key=game_id value=json locatoin
    fetch("game-data.json").then(response => response.json())
      .then(data => {
      
      var parsedData = data[id];
      var gc = createGameDetailsCard(parsedData);
      gameDetailsContainer.appendChild(gc);
      gc.scrollIntoView({behavior:"smooth"});
    }).catch(error => console.error("Error Retrieving Game Details Data: ", error));
  }
  
  
  const gameGalleryGroup = document.getElementById("game-gallery-group");
  // const rs = document.getElementById("game-details-container");
  const gameGalleryPressed = e => {
    const gameCardClickedID = e.target.id;
    displayGameDetailsCard(gameCardClickedID);
  }
  gameGalleryGroup.addEventListener("click", gameGalleryPressed);
  // displayGameDetailsCard("1");
  
  
  
  function scrollGame(){
    const gameGal = document.getElementById("game-gallery-group");
    gameGal.scrollIntoView({behavior:"smooth"});
  }
  