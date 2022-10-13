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