/**
 * Miguel Carmona
 * 2ºDAW 2022
 */


/**
 * 
 
1. Comenzaremos nombrando el formulario formTest con un
nombre para seleccionarlo de forma sencilla. Una vez
hecho esto, nos pondremos manos a la obra.
En primer lugar, cualquier campo en el que tengamos que
escribir, salvo el último fieldset, no lo podremos dejar
vacío, así que haremos una función asignada a un evento
que nos permita verificar que está vacío al cambiar el
foco a otro elemento y mostrar un mensaje diciendo que no
puede estar el campo vacío. Por otra parte, cuando
estemos rellenando un campo y haya algún problema, lo
resaltaremos.

2. Comprobaremos el campo Id, este campo hace de ID en la
base de datos que se autoincrementará, sin embargo, lo
aprovecharemos para hacer uso de validaciones. Este campo
no se puede rellenar con ningún string, sólo números como
mínimo de 2 cifras y máximo de 5.

3. Con el campo de contraseñas nos aseguraremos en primer
lugar que sea de 8 cifras. Además, en caso de no cumplir
un mínimo de seguridad también mostraremos un mensaje de
la falta de seguridad en la contraseña. Será necesario un
carácter especial, una mayúscula, una minúscula y un
número junto a una letra.

4. Respecto al campo del nombre, realizaremos una acción
similar, mínimo 3 caracteres y solo elementos del alfabeto.

5. En el caso del email, mínimo 5 caracteres y teniendo un
formato de email.

 */

const formTest = document.querySelector('#form');


const fieldsets = formTest.querySelectorAll('fieldset');
const form_elements_input = ['input','textarea']; //campos con entrada de dato

// Recorremos todos los fieldset del formulario excepto el último
for( let i=0 ; i < fieldsets.length-1 ; i++ ) {

    // Recogemos todos los elementos de entrada a verificar
    let elements = [];
    for( let item of form_elements_input ) {
        //concatenamos en el mismo array
        Array.prototype.push.apply(elements, fieldsets[i].querySelectorAll(item));
    }

    for( let element of elements ) {

        element.addEventListener('focusout', ()=> {

            // Comprobamos que no esté vacío
            if( element.value == null | element.value == '' ) {
                show_message( element, 'error',
                    'Este valor no puede estar vacío' );

            } else {
                
                // Comprobaciones adicionales
                switch( element.getAttribute('name') ) {
                    case 'userid':
                        if( typeof Number(element.value) != 'number' ) {
                            show_message( element, 'error', 'No es un número' );
                        } else if( element.value.length < 2 | element.value.length > 5 ) {
                            show_message( element, 'error', 'Tiene que tener entre 2 y 5 caracteres' );
                        } else {
                            show_message( element, 'success');
                        }
                        break;

                    case 'passid':
                        if( element.value.length != 8 ) {
                            show_message( element, 'error', 'Longitud incorrecta (tiene que tener 8 caracteres)' );
                        } else if ( !element.value.match(/[a-z]/g) ) {
                            show_message( element, 'error', 'La contraseña tiene que tener al menos una letra minúscula' );
                        } else if ( !element.value.match(/[A-Z]/g) ) {
                            show_message( element, 'error', 'La contraseña tiene que tener al menos una letra mayúscula' );
                        } else if ( !element.value.match(/[0-9]/g) ) {
                            show_message( element, 'error', 'La contraseña tiene que tener al menos un número' );
                        } else if ( !element.value.match(/\W|_/g) ) {
                            show_message( element, 'error', 'La contraseña tiene que tener al menos un carácter especial' );
                        } else {
                            show_message( element, 'success');
                        }
                        break;
                    
                    case 'username':
                        if( element.value.length < 3 ) {
                            show_message( element, 'error', 'Longitud incorrecta (tiene que tener al menos 3 caracteres' );
                        } else if ( element.value.match(/[^A-Z a-z]/g) ) {
                            show_message( element, 'error', 'El nombre sólo puede contener caracteres del alfabeto y espacios' );
                        } else {
                            show_message( element, 'success');
                        }
                        break;

                    case 'email':
                        /**
                         * Una implementación del estándar oficial: RFC 5322:
                         * ( valida en el 99.99% de los emails existentes )
                         * https://www.rfc-editor.org/rfc/rfc5322
                         * http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=email
                         */
                        let valid_mail = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
                        if( element.value.length < 5 ) {
                            show_message( element, 'error', 'Longitud incorrecta (tiene que tener al menos 5 caracteres' );
                        } else if ( !element.value.match(valid_mail) ) {
                            show_message( element, 'error', 'Email no válido' );
                        } else {
                            show_message( element, 'success');
                        }
                        break;
                    
                    default:
                        show_message( element, 'success');
                }
            }

        });
    }

    // Recogemos los select a verificar
    elements = fieldsets[i].querySelectorAll('select');
    for( let element of elements ) {
        
        element.addEventListener('focusout', ()=> {

            // Comprobamos si sigue seleccionado el valor por defecto ('Default' en este formulario)
            if( element.value == '' | element.value == 'Default' ) {
                show_message( element, 'error', 'Tiene que seleccionar una opción' );
            } else {
                show_message( element, 'success');
            }
        });

    }

}


/**
 * Muestra un "tooltip" con un mensaje bajo el elemento nodo pasado
 */
function show_message( element, type ) { show_message( element, type, '' ); }
function show_message( element, type, message ) {

    // Definimos el estilo de formato según el type
    // error por defecto
    let type_font_color = '#721c24';
    let type_background_color = '#f8d7da';
    let type_border_color = '#ce9298';
    switch( type ) {
        case 'error':
            let container = document.createElement('div');
            container.setAttribute('style',
                'position: absolute; background-color: ' + type_background_color + ';' +
                'padding: 8px; border: 1px solid ' + type_border_color + ';' +
                'border-radius: 2px; color: ' + type_font_color + ';' +
                'top: ' + ( element.offsetTop + element.offsetHeight + 5 ) + 'px;' +
                'left: ' + ( element.offsetLeft + 5 ) + 'px;' );
            container.innerHTML = message;
            
            container.addEventListener('click', ()=>{
                container.remove();
            });
        
            element.addEventListener('focus', ()=>{
                container.remove();
                element.style.backgroundColor = '';
            });
            
            element.parentElement.appendChild(container);
            break;
        
        case 'info':
            type_font_color = '#856404';
            type_background_color = '#fff3cd';
            type_border_color = '#b6d6be';
            break;
        
        case 'success':
            type_font_color = '#155724';
            type_background_color = '#d4edda';
            type_border_color = '#8aae93';
            break;
    }

    element.style.backgroundColor = type_background_color;
}
