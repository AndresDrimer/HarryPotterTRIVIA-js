import { numeroPosibleAzar } from './randomNum.js'

/*declaracion de variables*/
const urlTodos = 'https://hp-api.herokuapp.com/api/characters';
let nombreOk = "";
let nombreMal1 = "";
let nombreMal2 = "";
let casaOk = "";
let actoreOk = "";
let actoreMal1 ="";
let actoreMal2 =  "";
let nombres = [];
let casas = [];
let actores = [];
let scrImg = "https://hp-api.herokuapp.com/images/harry.jpg"; 
let puntaje = 0;
let numOk= 0;
let numMal1= 0;
let numMal2= 0;
let puntajesArray = [
    {name: "TROMEDLOV DROL", score: 420}, 
    {name: " REGNARG ENOIAMREH", score: 280}, 
    {name: "RETTOP YRRAH", score: 160},
    {name: "YELSAEW NOR", score: 75},
];
let inputNombre = document.getElementById("inputNombre");
let showMagicName = document.getElementById("showMagicName");
let selectorNombre = document.getElementById("selectorNombre");
let reverseNameContainer = document.getElementById("reverseNameContainer");
let yourMagicNameIs = document.getElementById("yourMagicNameIs");
let botonEnviar = document.getElementById("botonEnviar");
let reverseName = "";
let listaPuntajes = document.getElementById("listaPuntajes");
let botonNewCard = document.getElementById("botonNewCard");
let reverseNameDiv = document.getElementById("reverseNameDiv");
let ganaste = document.getElementById('ganaste');
let perdiste = document.getElementById('perdiste');
let ray1 = document.getElementById('ray1');
let ray2 = document.getElementById('ray2');
let ray3 = document.getElementById('ray3');
let ray4 = document.getElementById('ray4');
let ray5 = document.getElementById('ray5');
let playedCards = [];
let botonNewGame = document.getElementById('botonNewGame');
let musicLose = document.getElementById("losed").play()
let messageOff = "GAME TERMINATED: ";
let messageLast = `${messageOff} you obtained quite a bad score, ${reverseName}. Watching a few more Harry Potter´s movies won´t hurt!`;
let messageThird =  `${messageOff} well ${reverseName}, it can be done better. Keep pumping!`;
let messageSecond =  `${messageOff} really well done ${reverseName}! Keep on pumping and you ´ll become a Master in no time!`;

showMagicName.addEventListener("click", showReverseName);
botonNewCard.addEventListener("click", nuevaCarta);
botonEnviar.addEventListener("click", puntuar);
botonNewGame.addEventListener("click", traerCarta)

/*funciones*/

window.onload=function(){
    document.getElementById("soundInit").play();
    document.getElementById("song").play();
  }


function showReverseName(){ 
    reverseName = (inputNombre.value).split("").reverse().join("").toUpperCase()    
    if (reverseName.length>10){
        reverseNameDiv.style.fontSize="2rem";
        listaPuntajes.style.fontsize="0.9em";
    }
    reverseNameDiv.insertAdjacentText('beforeend', reverseName);
    yourMagicNameIs.insertAdjacentText('beforeend', "Your magic name is: ");
    selectorNombre.style.display = "none";
    reverseNameContainer.style.display = "flex";
    reverseNameContainer.style.flexDirection = "column";
    reverseNameContainer.style.alignItems = "center";
}


async function traerCarta() {
    /*funcion traer API*/
    const response = await fetch(urlTodos);
    const data = await response.json();
    const {name, actor, image, house,yearOfBirth} = data;   
 
    numOk= numeroPosibleAzar(25,0); // numero hasta el 25 porque los demas no incluyen imagen lamentablemente 
    
    //si repite vuelve a sacar carta
    if (playedCards.includes(numOk)){
        traerCarta();
    }

    playedCards.push(numOk) 
    playedCards = Array.from(new Set(playedCards)) //eliminar nro de carta duplicada del array
    console.log("cartas jugadas nros: " + playedCards.toString());

    numMal1= numeroPosibleAzar(38,0); // a partir de 38 muchas veces no trae actor y no cambia casi nada
    if (numMal1==numOk){
        return numMal1++;
     }

    numMal2= numeroPosibleAzar(38,0) // a partir de 38 muchas veces no trae actor y no cambia casi nada
    if (numMal2==numOk || numMal2==numMal1) {
        return numMal2++;
    }
   
          
     /* asignar imagen de la API*/
    let fotoCarta = document.getElementById('fotoCarta');
    scrImg = data[numOk].image
    fotoCarta.style.backgroundImage = "url(" + scrImg + ")";


    function asignAllSelects(){
           
        function asignSelectChar(){
                nombreOk=data[numOk].name;
                nombreMal1=data[numMal1].name;
                nombreMal2=data[numMal2].name;
                nombres.push(nombreOk, nombreMal1, nombreMal2);
                nombres.sort();

                const selectChar = document.getElementById("selectChar");
                
                for (let nom in nombres){
                    selectChar.insertAdjacentHTML("beforeend", `<option value="${nombres[nom]}"> ${nombres[nom]} </option>`)
                }
            }

            function asignSelectHouse(){
                let todasLasCasas=["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff", "(no house)"]
                casaOk=data[numOk].house;
             
               if (casaOk == ""){
                casaOk = "(no house)"
               }
               for (let i=0; i<todasLasCasas.length; i++){
                if (todasLasCasas[i]!= casaOk){
                    casas.push(todasLasCasas[i])
                }
               }
                casas.push(casaOk);
                casas.sort();
    
                const selectHouse = document.getElementById("selectHouse");
                
                for (let hou in casas){
                    selectHouse.insertAdjacentHTML("beforeend", `<option value="${casas[hou]}"> ${casas[hou]} </option>`)
                }
            }

            function asignSelectActore(){
                actoreOk=data[numOk].actor;
                actoreMal1=data[numMal1].actor;
                actoreMal2=data[numMal2].actor;
                actores.push(actoreOk, actoreMal1, actoreMal2);
                actores.sort();

                const selectActore = document.getElementById("selectActore");
                
                for (let act in actores){
                    selectActore.insertAdjacentHTML("beforeend", `<option value="${actores[act]}"> ${actores[act]} </option>`)
                }
            }

        asignSelectChar();
        asignSelectHouse();
        asignSelectActore(); 
    }

    asignAllSelects()
}

function nuevaCarta() {
    listaPuntajes.innerHTML="";
    traerCarta()
    botonNewCard.style.display= "none";
    botonEnviar.style.display= "inline-block";
    legendary.innerHTML="";
    asteriscos.innerHTML="";
    selectActore.insertAdjacentHTML("beforeend", `<option disabled selected>--pick actor/actress-- </option>`)
    selectHouse.insertAdjacentHTML("beforeend", `<option disabled selected> --pick house-- </option>`)
    selectChar.insertAdjacentHTML("beforeend", `<option disabled selected> --pick character-- </option>`)
    
}

function cleanAll(){
    numOk=0;
    numMal1=0;
    numMal2=0;
    casas=[];
    nombres=[];
    actores=[];
    selectActore.innerHTML="";
    selectHouse.innerHTML="";
    selectChar.innerHTML="";
 }

 //todavia está hardcodeada
function evalQtyCards(num){
    if (num==1){
       ray1.style.backgroundImage = "url('../../img/harry-ray-model2-checked.png')";
        } if (num==2){
            ray2.style.backgroundImage = "url('../../img/harry-ray-model2-checked.png')";
            }if (num==3){
                ray3.style.backgroundImage = "url('../../img/harry-ray-model2-checked.png')";
                } if (num==4){
                    ray4.style.backgroundImage = "url('../../img/harry-ray-model2-checked.png')";
                    } if (num==5){
                        ray5.style.backgroundImage = "url('../../img/harry-ray-model2-checked.png')";
                        giveResults();
                        }   
}

function giveResults(){
    botonNewCard.style.visibility= "hidden";
    perdiste.style.display="flex";
    botonNewGame.style.display="flex";
    document.getElementById("song").pause();
   
    

    if (puntaje < puntajesArray[3].score){
        perdiste.insertAdjacentHTML("beforeend", messageLast);
        musicLose;
        } 
    if (puntaje > puntajesArray[3].score && puntaje < puntajesArray[2].score){
        perdiste.insertAdjacentHTML("beforeend", messageThird);
        musicLose;
        } 
    if (puntaje > puntajesArray[2].score && puntaje < puntajesArray[1].score){
        perdiste.insertAdjacentHTML("beforeend", messageSecond);
        musicLose;
        }
    if ( puntaje > puntajesArray[1].score){
            ganaste.style.display="block";
            ganaste.insertAdjacentHTML("beforeend", `<h1> Congratulations ${reverseName}, you are the New Master!!!</h1>`);
            document.getElementById("victory-sound").play();
            document.getElementById("victory2").play();
            perdiste.style.visibility= "hidden";
            confetti({spread: 180, particleCount: 150});
            }
}



function puntuar() {
    if (reverseName != "" ){      
        
        //marcar jugada realizada con rayito amarillo 
        evalQtyCards(playedCards.length)

        let selectedActore = selectActore.value; 
        let selectedHouse = selectHouse.value; 
        let selectedChar = selectChar.value; 
        let contador = 0
        
        if (selectedChar==nombreOk){
            contador += 20
        }
        if (selectedHouse==casaOk){
            contador += 30
        }   
        if (selectedActore==actoreOk){
            contador += 50
        }
        puntaje += contador  

        reverseNameContainer.style.display = "none";
        puntajesArray.push({name: `>>> ${reverseName}`, score: `${puntaje}`})
    
        
        /*ordenar array de puntajes*/
        puntajesArray.sort(function(a,b){return a.score - b.score;}).reverse()
        for(let i in puntajesArray){
            listaPuntajes.insertAdjacentHTML("beforeend", `<tr><td class="name">${(puntajesArray[i].name)} ::: </td>
                                                           <td class="scores-in-board">${(puntajesArray[i].score)} </td></tr>`);
        }

        botonNewCard.style.display= "inline-block";
        botonEnviar.style.display= "none";
        
        

        let legendary = document.getElementById('legendary');
        let legendary_message = "Legendary Scores :::";
        let asteriscos = document.getElementById('asteriscos');
        let asteriscos_cantidad = "";
        for (let i=0; i<legendary_message.length+4; i++){
            asteriscos_cantidad += "*";
            };

        legendary.insertAdjacentText("beforeend", legendary_message);
        asteriscos.insertAdjacentText("beforeend", asteriscos_cantidad);

        /*limpiar valores*/
        cleanAll();

        /*borrar nombre duplicado del array*/
        if (`${reverseName}` != ""){
        let indexNamePlayer = puntajesArray.findIndex( key => key.name ==  `${reverseName}`)
        puntajesArray.splice(indexNamePlayer, 1)
        };
       //aca falta pasar a map y volver a array, se perdio y funcionaba diez puntos

        
    } else {
        alert("Lord Voldemort says entering your name is mandatory, young pupil!");
        playedCards.pop();
        cleanAll();
        nuevaCarta();
        selectorNombre.style.display = "flex";
    }
};
    
    
   
  ///////////////////////////  


   



traerCarta()






