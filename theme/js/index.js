var window_height; //guarda el alto de la ventana

// Mostrar / ocultar menu
function hide_panel(id) {
    
    document.body.classList.toggle(id+'_hidden');
    
    //Actualizamos la clase para que cambie la flecha del mostrar/ocultar panel
    window.frames['iframe_'+id+'_ocultar'].document.getElementsByClassName('panel')[0].classList.toggle('panel_hidden');

    // Si es la consola, actualizamos la altura del grid content
    if( id == 'console' ) {
        fix_size();
    }

}

// Ajusta el alto de los elementos grid según el tamaño de ventana
function fix_size() {
    window_height = window.innerHeight;

    if( window.frames['iframe_console_ocultar'].document.getElementsByClassName('panel')[0].classList.contains('panel_hidden') ) {
        window_height = window_height - 23;
    } else {
        window_height = window_height - 253;
    }
    
    document.getElementById('div_content').style.height = (window_height + 5) + 'px';
}

window.addEventListener("load", fix_size);
window.addEventListener("resize", fix_size);


// injectamos una función para sobreescribir console.log en el iframe content
window.frames['iframe_content'].addEventListener("load", function() {

    
    window.frames['iframe_content'].window.console.log = function(message) {
        
        if (typeof console != "undefined") {
            if (typeof console.log != 'undefined')
                console.mytemp = console.log;
            else
                console.mytemp = function () { };
        }
    
        console.mytemp(message);
        
        let scroll = window.top.frames['iframe_console'].document.querySelector('#console_log');
    
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
        
        // Actualiamos la consola
        console.error = console.debug = console.info = console.log
    }

});

// Hace scrool de página hasta el principio, final o una posición determinada (útil para mostrar nuevo contenido cuando se añade)
function scroll_to(frame, direction) {

    let position = 0;
    if( direction === 'up' | direction === 'top' ) {
        position = 0;
    } else if( direction === 'down' ) {
        position = document.body.scrollHeight;
    } else if( Number.isInteger(direction) ) { //si es una posición
        position = Number(direction);
    } else if( direction.nodeType ) { // si es un elemento nodo
        direction.scrollIntoView(true);
        return true;
    }
    
    window.top.frames[frame].window.scroll({
        top: position,
        behavior: 'smooth'
    });
}