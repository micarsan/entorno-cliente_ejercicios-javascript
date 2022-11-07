/* Seleccionamos el body e iremos seleccionando cada div. */

const body = document.body;
const divContenedor = document.querySelector("#contenedor");
const divIzquierdo = divContenedor.firstElementChild;
const divCentro = divIzquierdo.nextElementSibling;
const divDerecho = divCentro.nextElementSibling;
const footer = divDerecho.nextElementSibling;
/* Asignar un atributo id a cada uno de los divs. */

divIzquierdo.setAttribute("id", "divIzquierdo");
divCentro.setAttribute("id", "divCentro");
divDerecho.setAttribute("id", "divDerecho");
footer.setAttribute("id", "footer");
/* Asignar color de fondo a cada div. */

divIzquierdo.style.backgroundColor = "yellow";
divCentro.style.backgroundColor = "red";
divDerecho.style.backgroundColor = "purple";
footer.style.backgroundColor = "green";

/* Aplicar una anchura del 30  y 2 px de borde a los tres primeros divs y utilizar la clase para desplegarlos en linea.
 Pista, utilizar la clase y values()*/
divIzquierdo.style.width = "30vw";
divCentro.style.width = "30vw";
divDerecho.style.width = "30vw";
const divContenido = document.querySelectorAll(".divContenido");
for (let elemento of divContenido.values()) {
  elemento.style.border = '2px solid #ff0';
  elemento.style.display = "inline-block";
}
/* 
Aplicar altura 75vh al divContenedor y desplegarlo en flex.
Aplicar también una altura de 80% a los divs y un 5 al footer. Pista: values()*/

divContenedor.style.height = "75vh";
divContenedor.style.display = "flex";
for (let elemento of divContenido.values()) {
  elemento.style.height = "90%";
}
footer.style.height = "5%";
/* Crear un div dentro del contenedor que nos sirva de menú con un color grey de fondo.*/
let nav = document.createElement("nav");
nav.setAttribute("id", "nav");
nav.style.width = "80%";
nav.style.marginLeft = "10%";
nav.style.marginRight = "10%";
/* Generar una lista desordenada de 4 elementos.*/
let lista = document.createElement("ul");
let elemento1 = document.createElement("li");
let elemento2 = document.createElement("li");
let elemento3 = document.createElement("li");
let elemento4 = document.createElement("li");
lista.appendChild(elemento1);
lista.appendChild(elemento2);
lista.appendChild(elemento3);
lista.appendChild(elemento4);
/* Iteraremos sobre la lista e iremos añadiendo texto y el numero de enlace.
Además, añadiremos un atributo href con el contenido #*/
var numero = 0;
for (let elemento of lista.children) {
  let enlace = document.createElement("a");
  enlace.setAttribute("id", "enlace" + numero);
  enlace.textContent = "Pagina " + numero;
  numero++;
  elemento.appendChild(enlace);

}
var enlace0 = lista.querySelector("#enlace0");
enlace0.setAttribute("href", "contenido/registro.html");
/* Tras añadir el enlace al div del menú, lo insertaremos en el body en la primera posición. 
Pista: insertBefore */
nav.appendChild(lista);

body.insertBefore(nav, document.body.firstChild);

let footerNew = footer.cloneNode(true);
footer.remove();
body.appendChild(footerNew);


