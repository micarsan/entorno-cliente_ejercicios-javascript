// Mostrar / ocultar menu
function hide_panel(id) {
    
    document.body.classList.toggle('iframe_'+id+'_hidden');
    
    //Actualizamos la clase para que cambie la flecha del mostrar/ocultar panel
    window.frames['iframe_'+id+'_ocultar'].document.getElementsByClassName('panel')[0].classList.toggle('panel_hidden');

    // Si es la consola, actualizamos la altura del grid content
    if( id == 'console' ) {
        fix_size();
    }

}

// Ajusta el alto de los elementos grid según el tamaño de ventana
function fix_size() {
    let height = window.innerHeight;

    if( window.frames['iframe_console_ocultar'].document.getElementsByClassName('panel')[0].classList.contains('panel_hidden') ) {
        height = height - 18;
    } else {
        height = height - 248;
    }
    
    document.getElementById('div_content').style.height = height + 'px';
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

