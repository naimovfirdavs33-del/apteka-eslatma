const form=document.getElementById("form");

const list=document.getElementById("list");

const permission=document.getElementById("permission");

let dorilar=JSON.parse(localStorage.getItem("dorilar"))||[];

permission.onclick=()=>{

Notification.requestPermission();

}

function saqlash(){

localStorage.setItem("dorilar",JSON.stringify(dorilar));

}

function chiqar(){

list.innerHTML="";

dorilar.forEach((dori,index)=>{

list.innerHTML+=`

<tr>

<td>${dori.nomi}</td>

<td>${dori.vaqt}</td>

<td>${dori.holati}</td>

<td>

<button class="delete" onclick="ochir(${index})">

❌

</button>

</td>

</tr>

`;

});

}

form.addEventListener("submit",(e)=>{

e.preventDefault();

const yangi={

nomi:nomi.value,

vaqt:vaqt.value,

holati:holati.value

};

dorilar.push(yangi);

saqlash();

chiqar();

form.reset();

});

function ochir(i){

dorilar.splice(i,1);

saqlash();

chiqar();

}

chiqar();

let oxirgi="";

setInterval(()=>{

const now=new Date();

const time=

String(now.getHours()).padStart(2,"0")

+":"

+

String(now.getMinutes()).padStart(2,"0");

dorilar.forEach(d=>{

let id=d.nomi+time;

if(d.vaqt==time && oxirgi!=id){

oxirgi=id;

let audio=new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");

audio.play();

if(Notification.permission=="granted"){

new Notification("💊 Dori ichish vaqti",{

body:d.nomi+" ("+d.holati+")"

});

}else{

alert(d.nomi+" ichish vaqti!");

}

}

});

},1000);