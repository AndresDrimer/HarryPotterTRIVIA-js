import { numeroPosibleAzar } from './randomNum.js'

/*declaracion de variables*/
const urlTodos = 'https://hp-api.herokuapp.com/api/characters';
let nombreOk = "";
let nombreMal1 = "";
let nombreMal2 = "";
let casaOk = "";
let casaMal1 = "";
let casaMal2 = "";
let actoreOk = "";
let actoreMal1 ="";
let actoreMal2 =  "";
let nombres = [];
let casas = [];
let actores = [];
let scrImg = "https://hp-api.herokuapp.com/images/harry.jpg"; 
let selectedName = "";
let selectedHouse = "";
let selectedActore = "";
let puntaje = 0;
let nombreIngresado = "";
let nombreInv = "";
let numOk= 0;
let numMal1= 0;
let numMal2= 0;
let show1 = true;
let objPuntajes = {TROMEDLOV: 1960, ENOIAMREH: 2220, RETTOPYRRAH: 1780};
let inputNombre = document.getElementById("inputNombre");
let showMagicName = document.getElementById("showMagicName");
let selectorNombre = document.getElementById("selectorNombre");
let reverseNameContainer = document.getElementById("reverseNameContainer");
let yourMagicNameIs = document.getElementById("yourMagicNameIs");
let botonEnviar= document.getElementById("botonEnviar");
let reverseName = "";
let soundInit = new Audio("audio/AparicionLlegada-Impertecmi.mp3");
let listaPuntajes = document.getElementById("listaPuntajes");
let botonNewCard=document.getElementById("botonNewCard");
let reverseNameDiv = document.getElementById("reverseNameDiv");
showMagicName.addEventListener("click", showReverseName);
botonNewCard.addEventListener("click", nuevaCarta);
botonEnviar.addEventListener("click", puntuar);


/*funciones*/

window.onload=function(){
    document.getElementById("soundInit").play();
    document.getElementById("song").play()
  }


function showReverseName(){ 
    reverseName = (inputNombre.value).split("").reverse().join("").toUpperCase()    
    if (reverseName.length>10){
        reverseNameDiv.style.fontSize="2rem";
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
      
    /*genrar numero al azar, asigna 3 que no se repiten*/       
    numOk= numeroPosibleAzar(25,0); 
    numMal1= numeroPosibleAzar(25,0);

    if (numMal1==numOk){
        return numMal1++;
     }

    numMal2= numeroPosibleAzar(25,0)
        if (numMal2==numOk || numMal2==numMal1) {
            return numMal2++;
        }
   
    /*evaluar si esos numeros arrojan un dato (de la API) con todos sus campos completos y sino buscar  otro que sí*/  
    function chequearNumMal1(x){
        if (x==numOk){
            x++;
        } while (data[x].house === "") {
            x++;}
            
            numMal1=x;
            return numMal1;       
        }
        
        function chequearNumMal2(x){
            if (x==numMal1){
                x++;
            }
            while (data[x].house === "") {
                x++;}
            numMal2=x;
            return numMal2;  
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
                let nom="";
                for (nom in nombres){
                    selectChar.insertAdjacentHTML("beforeend", `<option value="${nombres[nom]}"> ${nombres[nom]} </option>`)
                }
            }

            function asignSelectHouse(){
                casaOk=data[numOk].house;
                casaMal1=data[numMal1].house;
                casaMal2=data[numMal2].house;
                casas.push(casaOk, casaMal1, casaMal2);
                casas.sort();
    
                const selectHouse = document.getElementById("selectHouse");
                let hou ="";
                for (hou in casas){
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
                let act="";
                for (act in actores){
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

function puntuar() {
    
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

    if (reverseName != "" ){
    objPuntajes[`${reverseName}`]=puntaje
    } else{
        alert("Lord Voldemort says entering your name is mandatory, young pupil!")
    }

    let valueKeyScorePairs = Object.entries(objPuntajes)
    
   
    for(let i in valueKeyScorePairs){
        listaPuntajes.insertAdjacentHTML("beforeend", `<li>${(valueKeyScorePairs[i])[0]} : ${(valueKeyScorePairs[i])[1]} </li>`)  
    }

    botonNewCard.style.display= "inline-block";
    botonEnviar.style.display= "none";

    let legendary = document.getElementById('legendary');
    let legendary_message = "Legendary Scores: ";
    let asteriscos = document.getElementById('asteriscos');
    let asteriscos_cantidad = "";
    for (let i=0; i<legendary_message.length; i++){
        asteriscos_cantidad += "*";
        };

    legendary.insertAdjacentText("beforeend", legendary_message);
    asteriscos.insertAdjacentText("beforeend", asteriscos_cantidad);

    numOk=0;
    numMal1=0;
    numMal2=0;
    casas=[];
    nombres=[];
    actores=[];
    selectActore.innerHTML="";
    selectHouse.innerHTML="";
    selectChar.innerHTML="";
};


   



traerCarta()
 



