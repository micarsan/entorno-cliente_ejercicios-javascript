/**
 *  Selector de ejercicios
 */
let selector_ejercicios = document.querySelector('.panel.derecha #selector_ejercicios');
// filtramos si existe (este js se comparte con más iframes a parte de menú)
if( selector_ejercicios ) {
    
    /* Añadimos un evento para actualizar el src cuando cambie */
    selector_ejercicios.addEventListener("change", function() {

        // Cambiamos el src de iframe_content
        window.top.document.getElementsByName('iframe_content')[0].src = 'ejercicio' + this.value + '/index.html';
        
        //cambiamos la url principal
        window.top.history.pushState('page2', 'Title', window.top.location.pathname + '?ejercicio=' + this.value);
    });


    

    // Buscamos si se han recibido parámetros get
    let url_get = window.top.location.search;
    if( url_get ) {

        // Pasamos los parámetros al menú

        // Creamos un array asociativo con todos los parámetros
        let url_get_params_array = {};
        let url_get_params = url_get.split('&');

        for( let line of url_get_params ) {
            
            let tmp = line.split('=');
            if( tmp[0] == 'ejercicio' | tmp[0] == '?ejercicio' ) {
                window.top.document.getElementsByName('iframe_content')[0].src = 'ejercicio' + tmp[1] + '/index.html';
                break;
            }
        }
    }

    // Marcamos la opción adecuada
    select_option();
}

/**
 *  Selecciona en el selector de ejercicios el que se esté mostrando
 */
function select_option() {
   
    // Cogemos la ruta de iframe_content y la cortamos por '/' en un array
    let content_url = new URL(window.top.document.getElementsByName('iframe_content')[0].src).pathname.split( '/' );

    // Cogemos el penúltimo elemento (el nombre de la carpeta)
    let folder_url = content_url[(content_url.length-2)];
    
    // Activamos el selector según el nombre de carpeta
    let options = document.querySelectorAll('.panel.derecha #selector_ejercicios option');
    for( let line of options ) {
        if( 'ejercicio' + line.value == folder_url ) {
            line.selected = true;
            break;
        }
    }
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
            
            // Obtenemos el valor de onclick para llamar a la función
            let funcion = item.getAttribute('onclick');
            
            // Quitamos los 2 últimos caracteres ()
            funcion = funcion.substring(0, funcion.length - 2);
            
            //tiempo por defecto entre ejecuciones
            let time_wait=1000;

            
            // Hacemos scrool (si se necesita) para mostrar el elemento 200ms antes de lanzarse
            setTimeout(function a(){
                item.scrollIntoView(false);
            }, time - 200);
            
            // Resaltamos y lanzamos cuando le corresponda (1 segundo de diferencia)
            setTimeout(function a(){
                item.classList.add('active');
                window[funcion]();
            }, time);
    
            // Quitamos el resalte de la actividad a los 950ms desde que se lanzó
            setTimeout(function a(){
                item.classList.remove('active');
            }, time+time_wait);
        
            // Subimos el menú a top el scroll 2 segundos después de lanzar en el último elemento
            if( index === funciones.length-1 ) {
                setTimeout(function a(){
                    scroll_to('top');
                }, time+2000);
            }
            
            //sumamos lo que corresponda
            time += time_wait;
        }
    });

}

function lista_add_links() {
    window.top.frames['iframe_content'].lista_add_links();
}
function table_create_5x5() {
    window.top.frames['iframe_content'].table_create_5x5();
}
function p_iterate_change() {
    window.top.frames['iframe_content'].p_iterate_change();
}
function link_change_href() {
    window.top.frames['iframe_content'].link_change_href();
}
function css_change() {
    window.top.frames['iframe_content'].css_change();
}
function p_new_append() {
    window.top.frames['iframe_content'].p_new_append();
}
function botton_new_color_blind() {
    window.top.frames['iframe_content'].botton_new_color_blind();
}
function div_p_duplicate() {
    window.top.frames['iframe_content'].div_p_duplicate();
}
function div_p_delete_origin() {
    window.top.frames['iframe_content'].div_p_delete_origin();
}

// Nos permite hacer scrool a una altura determinada
function scroll_to(direction) {
    window.top.scroll_to('iframe_menu', direction);
 }