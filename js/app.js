/**
 * innerHTML, outerHTML o textContent
 */


function lista_add_links() {
    console.log('- Enunciado: Seleccionar la lista y añadir nuevo enlaces utilizando una vez solo el innerHTML (Seleccionar con querySelector).');
}

function table_create_5x5() {
    console.log('- Enunciado: Generar una tabla de 5x5 con la utilización de estructuras iterativas y añadirle un borde (Podéis crear un div nuevo y vacío para realizarlo).');
}

function p_iterate_change() {
    console.log('- Enunciado: Iterar los párrafos y modificar el contenido con la propiedad textContent.');
}

function link_change_href() {
    console.log('- Enunciado: Los bordes deben de tener 3px solid con color rojo.');
}

function css_change() {
    console.log('- Enunciado: Duplicar el css con un color de fondo distinto del body, navegar por la cabecera y comprobar el atributo de link, si existe el atributo href, cambiar el enlace a la hoja de estilos duplicada.');
}


/**
 * Otras operaciones
 */

function p_new_append() {
    console.log('- Enunciado: Crear un nuevo elemento párrafo y añadirlo al div correspondiente (pista: appendChild).');
}

function botton_new_color_blind() {
    console.log('- Enunciado: Crear un nuevo elemento botón con un evento que nos permita al clicar, cambiar el color de todas las letras del body alternando entre azul y rojo.');
}

function div_p_duplicate() {
    console.log('- Enunciado: Clonar el div contenedor de los párrafos con sus contenidos y añadirlo al body.');
}

function div_p_delete_origin() {
    console.log('- Enunciado: Eliminar el párrafo original con la instrucción remove.');
}


function ejecutar_todo() {

    // Cogemos todos los elementos del panel
    let funciones = document.querySelectorAll('.panel.derecha li');

    let time = 0;

    // Recorremos las funciones
    funciones.forEach((item, index) => {
        // Excluimos la primera opción (es esta misma)
        if (index > 0) {
            
            // Obtenemos el valor de onclick para llamar a la función
            let funcion = item.getAttribute('onclick');
            
            // Quitamos los 2 últimos caracteres ()
            funcion = funcion.substring(0, funcion.length - 2);
            
            //tiempo por defecto entre ejecuciones
            let time_wait=1000;
            
            // Modificamos el tiempo según función
            switch( funcion ) {
                case 'none':
                    time_wait = 2500;
                    break;
            }
            
            // Lanzamos cuando le corresponda (1 segundo de diferencia)
            setTimeout(function a(){
                item.classList.add('active');
                window[funcion]();
            }, time);
    
            // Quitamos el resalte de la actividad al terminar
            setTimeout(function a(){
                item.classList.remove('active');
            }, time+time_wait);
        
            //sumamos lo que corresponda
            time += time_wait;

        }
    });


}

/**
 * Funcionalidad
 */

// Mostrar / ocultar los enunciados
window.addEventListener("load", function () {

    // Recorremos todos los paneles
    let panels = document.querySelectorAll(".panel");
    for (let item of panels) {

        // Asignamos evento click a los legend
        item.querySelector(".panel_ocultar").addEventListener("click", function () {

            // Toggle class
            item.classList.toggle('panel_hidden');

            // Reajustamos los tamaños de los paneles
            reajustar_paneles();

        });
    }

    // Reajustamos márgenes y tamaños de paneles
    reajustar_paneles();
});
window.addEventListener("resize", reajustar_paneles);

function reajustar_paneles() {

    let panel_derecha = document.querySelectorAll(".derecha")[0];
    let panel_abajo = document.querySelectorAll(".abajo")[0];
    let scroll_panel_derecha = false;

    //comprobamos si hay barras de scrool
    if( panel_derecha.scrollHeight > panel_derecha.clientHeight ) {
        scroll_panel_derecha = true;
    }

    // Panel lateral
    if (panel_derecha.classList.contains('panel_hidden')) {
        document.body.style.marginRight = '26px';
        panel_abajo.style.right = '0px';
   
    } else {
        panel_abajo.style.right = '';
    }

    // Margin right del body (para salvar el panel lateral)
    // Calculamos el ancho del panel derecho
    let panel_derecha_width = window.getComputedStyle(panel_derecha).width;
    panel_derecha_width = Number( panel_derecha_width.substring(0, panel_derecha_width.length - 2) );

    if( scroll_panel_derecha ) {
        // Incrementamos 15px que es el tamaño de la barra de scroll
        panel_derecha_width += 15;
    }
    
    // Actualizamos el margen derecho (8px es el margen de body por defecto)
    document.body.style.marginRight = panel_derecha_width + 8 + 'px';

    // Panel consola
    if (panel_abajo.classList.contains('panel_hidden')) {
        document.body.style.marginBottom = "18px";
    } else {
        document.body.style.marginBottom = '';
    }

}


// Actualiamos la consola
if (typeof console != "undefined")
    if (typeof console.log != 'undefined')
        console.mytemp = console.log;
    else
        console.mytemp = function () { };

console.log = function (message) {
    console.mytemp(message);

    let scroll = document.querySelector('#console_log');

    // Insertamos la hora
    let date = new Date;

    // Insertamos el log
    scroll.innerHTML += '<li><span class="date">'
        + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '</span>'
        + '<pre>' + message + '</pre></li>';

    //hacemos scrool hasta el final siempre
    scroll.scroll({
        top: scroll.scrollHeight,
        behavior: 'smooth'
    });


};
console.error = console.debug = console.info = console.log