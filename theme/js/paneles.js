var ejercicio = 1;

/**
 * 
 * Obtener asíncronamente una URL
 */
var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};


/**
 *  Selector de ejercicios
 */
let selector_ejercicios = document.querySelector('.panel.derecha #selector_ejercicios');
// filtramos si existe (este js se comparte con más iframes a parte de menú)
if (selector_ejercicios) {

    /* Añadimos un evento para actualizar el src cuando cambie */
    selector_ejercicios.addEventListener("change", function () {

        // Cambiamos el src de iframe_content
        window.top.document.getElementsByName('iframe_content')[0].src = 'ejercicio' + this.value + '/index.html';

        //Actualizamos la variable global ejercicio
        ejercicio = this.value;

        //cambiamos la url principal
        window.top.history.pushState('page2', 'Title', window.top.location.pathname + '?ejercicio=' + this.value);

        // Creamos el menú
        create_menu();
    });



    // Buscamos si se han recibido parámetros get
    let url_get = window.top.location.search;
    if (url_get) {

        // Pasamos los parámetros al menú

        // Creamos un array asociativo con todos los parámetros
        let url_get_params_array = {};
        let url_get_params = url_get.split('&');

        for (let line of url_get_params) {

            let tmp = line.split('=');
            if (tmp[0] == 'ejercicio' | tmp[0] == '?ejercicio') {

                // Cambiamos iframe_content a la url correcta
                window.top.document.getElementsByName('iframe_content')[0].src = 'ejercicio' + tmp[1] + '/index.html';

                // Actualizamos ejercicio
                ejercicio = tmp[1];

                break;
            }
        }
    }

    // Marcamos la opción adecuada
    select_option();


    // Creamos el menú
    create_menu();

}

function create_menu() {

    // Obtenemos los enunciados
    getJSON('../ejercicio' + ejercicio + '/enunciados.json', function (err, data) {
        if (err !== null) {
            alert('Algo fue mal. Revisa la consola.');
            console.log('Algo fue mal: ' + err);
        } else {

            let menu = document.getElementById('menu_elements');
            
            // Limpiamos el contenido que hubiese
            menu.innerHTML = '';

            // Recorremos el json para montar el menú
            let ul = document.createElement('ul');
            for (let line of data.enunciados) {

                if (!line.function) {
                    // Si no hay función, es una cabecera

                    // Si estamos en una lista con contenido, hay que insertarla y crearla de nuevo (limpiarla)
                    if (ul.hasChildNodes()) {
                        menu.appendChild(ul);
                        ul = document.createElement('ul');
                    }

                    // Insertamos la cabecera
                    let cabecera = document.createElement('h3');
                    cabecera.innerText = line.title;
                    menu.appendChild(cabecera);
                } else {
                    // Es un elemento

                    let li = document.createElement('li');
                    li.innerText = line.title;

                    // Añadimos un atributo con el nombre de la función (para llamarlo luego al ejecutar todo)
                    li.setAttribute('data-function', line.function);

                    // Si tiene un tiempo definido de ejecución, lo añadimos
                    if (line.time) {
                        li.setAttribute('data-time', line.time);
                    }
                    ul.appendChild(li);

                    // Añadimos el lanzador para click
                    li.addEventListener("click", function () {
                        window.top.document.getElementsByName('iframe_content')[0].contentWindow[line.function]();
                    });

                }

            }
            menu.appendChild(ul);

        }
    });

}


/**
 *  Selecciona en el selector de ejercicios el que se esté mostrando
 */
function select_option() {

    // Cogemos la ruta de iframe_content y la cortamos por '/' en un array
    let content_url = new URL(window.top.document.getElementsByName('iframe_content')[0].src).pathname.split('/');

    // Cogemos el penúltimo elemento (el nombre de la carpeta)
    let folder_url = content_url[(content_url.length - 2)];

    // Activamos el selector según el nombre de carpeta
    let options = document.querySelectorAll('.panel.derecha #selector_ejercicios option');
    for (let line of options) {
        if ('ejercicio' + line.value == folder_url) {
            line.selected = true;
            break;
        }
    }
}



/**
 * Evento para limpiar la consola 
 */
let console_clean = document.querySelector('.panel.abajo .panel_limpiar');
if( console_clean ) {
    document.addEventListener('click', ()=> {
        let console_log = window.top.frames['iframe_console'].window.document.querySelector('#console_log').innerHTML = '';
    });
}


/**
 * Ejecuta todas las opciones del ejercicio secuencialmente
 */
function ejecutar_todo() {
    // Cogemos todos los elementos del panel
    let funciones = document.querySelectorAll('.panel.derecha li');

    let time = 0;

    // Recorremos las funciones
    funciones.forEach((item, index) => {
        // Excluimos la primera opción (es esta misma)
        if (index > 0) {

            // Obtenemos el valor de data-function para llamar a la función
            let funcion = item.getAttribute('data-function');

            //tiempo por defecto entre ejecuciones
            let time_wait = 1000;

            // Comprobamos si tiene un tiempo específico
            if (item.hasAttribute('data-time')) {
                let time = item.getAttribute('data-time');
                time_wait = Number(time);
            }


            // Hacemos scrool (si se necesita) para mostrar el elemento 200ms antes de lanzarse
            setTimeout(function a() {
                item.scrollIntoView(false);
            }, time - 200);

            // Resaltamos y lanzamos cuando le corresponda (1 segundo de diferencia)
            setTimeout(function a() {
                item.classList.add('active');
                window.top.document.getElementsByName('iframe_content')[0].contentWindow[funcion]();
            }, time);

            // Quitamos el resalte de la actividad a los 950ms desde que se lanzó
            setTimeout(function a() {
                item.classList.remove('active');
            }, time + time_wait);

            // Subimos el menú a top el scroll 2 segundos después de lanzar en el último elemento
            if (index === funciones.length - 1) {
                setTimeout(function a() {
                    scroll_to('top');
                }, time + 2000);
            }

            //sumamos lo que corresponda
            time += time_wait;
        }
    });

}

// Nos permite hacer scrool a una altura determinada
function scroll_to(direction) {
    window.top.scroll_to('iframe_menu', direction);
}