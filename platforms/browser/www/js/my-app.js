//
var reloj = '';
var hora = 0;
var minuto = 0;
var tipoHora = '';
var intervaloPedidos;
//-----------------------------Reloj en vivo------------------------------------

function show5() {
    if (!document.layers && !document.all && !document.getElementById)
        return;

    var Digital = new Date();
    var hours = Digital.getHours();
    var minutes = Digital.getMinutes();
    var seconds = Digital.getSeconds();

    var dn = "PM";
    if (hours < 12)
        dn = "AM";
    if (hours > 12)
        hours = hours - 12;
    if (hours == 0)
        hours = 12;

    if (minutes <= 9)
        minutes = "0" + minutes;
    if (seconds <= 9)
        seconds = "0" + seconds;
    //change font size here to your desire
    myclock = hours + ":" + minutes + ":" + seconds + " " + dn;
    //
    tipoHora = dn;
    myclock2 = hours + ":" + minutes;
    hora = parseInt(hours);
    minuto = parseInt(minutes);

    if (document.layers) {
        document.layers.liveclock.document.write(myclock);
        document.layers.liveclock.document.close();
    } else if (document.all)
        liveclock.innerHTML = myclock;
    else if (document.getElementById)
        reloj = myclock2;
}

//-----------------------------------App----------------------------------------

//
var arrayRegistro = [];

//
var app = new Framework7({
    // App root element
    root: '#contadorES',
    // App Name
    name: 'contadorES',
    // App id
    id: 'com.contadorES',
    // Enable swipe panel
    panel: {
        swipe: 'left'
    },
    // Add default routes
    routes: [
        {
            path: '/home/',
            url: 'index.html',
            on: {
                pageAfterIn: function () {
                    // do something after page gets into the view
                },
                pageInit: function () {
                    // do something when page initialized
                    setTimeout(function () {
                        $$('#textoImagen').html(arrayRegistro.length + '/100');
                    }, 50);
                }
            }
        },
        {
            path: '/salida/',
            url: 'salida.html',
            on: {
                pageAfterIn: function () {
                    // do something after page gets into the view
                },
                pageInit: function () {
                    // do something when page initialized
                    setTimeout(function () {
                        $$('#textoImagenS').html(arrayRegistro.length + '/100');
                    }, 50);
                }
            }
        }
    ],
    lazy: {
        threshold: 50,
        sequential: false
    }
    // ... other parameters
});

//
var $$ = Dom7;

//
var mainView = app.views.create('.view-main');

//
var urlServidor = 'http://167.71.248.182/';
//var urlServidor = 'http://192.168.0.12/';
//var urlServidor = 'http://192.168.1.103/';

//
var foto = '';
var canvas = document.getElementById("micanvas");

//
document.addEventListener('deviceready', function () {
    //
    setTimeout("show5()", 1000);
    //
    $$('#textoImagen').html(arrayRegistro.length + '/100');
    //
    serial.requestPermission(successS, error);
}, false);

//
var tipoRegistro = 0;

//
function tomarFoto(valor) {
    //
    tipoRegistro = valor;
    //
    navigator.camera.getPicture(onSuccessC, error, {
        //
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}

//
function onSuccessC(imageURI) {
    //
    textocr.recText(0, /*3,*/ imageURI, onSuccess, onFail); // removed returnType (here 3) from version 2.0.0
    // for sourceType Use 0,1,2,3 or 4
    // for returnType Use 0,1,2 or 3 // 3 returns duplicates[see table]
    function onSuccess(recognizedText) {
        //Use above two lines to show recognizedText in html
//        alert(JSON.stringify(recognizedText['words']['wordtext']));
        //
        if (tipoRegistro === 2) {
            //
//            $$('#documentoS').val(recognizedText['words']['wordtext'][9]);
//            $$('#nombresS').val(recognizedText['words']['wordtext'][13] + ' ' + recognizedText['words']['wordtext'][14]);
//            $$('#apellidosS').val(recognizedText['words']['wordtext'][10] + ' ' + recognizedText['words']['wordtext'][11]);
            for (var i = 0; i < recognizedText['words']['wordtext'].length; i++) {
                //
                if (recognizedText['words']['wordtext'][i] === 'NUMERO' || recognizedText['words']['wordtext'][i] === 'NUMER0') {
                    //
                    $$('#documentoS').val(recognizedText['words']['wordtext'][i + 1]);
                    $$('#nombresS').val(recognizedText['words']['wordtext'][i + 5] + ' ' + recognizedText['words']['wordtext'][i + 6]);
                    $$('#apellidosS').val(recognizedText['words']['wordtext'][i + 2] + ' ' + recognizedText['words']['wordtext'][i + 3]);
                }
            }
            //
            sacarPersona();
        } else {
            //
//            $$('#documento').val(recognizedText['words']['wordtext'][9]);
//            $$('#nombres').val(recognizedText['words']['wordtext'][13] + ' ' + recognizedText['words']['wordtext'][14]);
//            $$('#apellidos').val(recognizedText['words']['wordtext'][10] + ' ' + recognizedText['words']['wordtext'][11]);
            for (var i = 0; i < recognizedText['words']['wordtext'].length; i++) {
                //
                if (recognizedText['words']['wordtext'][i] === 'NUMERO' || recognizedText['words']['wordtext'][i] === 'NUMER0') {
                    //
                    $$('#documento').val(recognizedText['words']['wordtext'][i + 1]);
                    $$('#nombres').val(recognizedText['words']['wordtext'][i + 5] + ' ' + recognizedText['words']['wordtext'][i + 6]);
                    $$('#apellidos').val(recognizedText['words']['wordtext'][i + 2] + ' ' + recognizedText['words']['wordtext'][i + 3]);
                }
            }
        }
    }
    //
    function onFail(message) {
        //
        alert('Failed because: ' + JSON.stringify(message));
    }
    //
    if (tipoRegistro === 2) {
        //
        var image = document.getElementById('imgLoginS');
        image.src = imageURI;
    } else {
        //
        var image = document.getElementById('imgLogin');
        image.src = imageURI;
    }
}

//
function error(message) {
    //
    alert('Failed because: ' + JSON.stringify(message));
}

//
function successS() {
    //
    serial.open({baudRate: 9600}, respuesta, error);
}

//
var temperaturaA = 0;
var controlTemperatura = 0;

//
function respuesta() {
    //
    var errorCallback = function (message) {
        alert('Error: ' + message);
    };
    // register the read callback
    serial.registerReadCallback(
            function success(data) {
                //
                controlTemperatura++;
                // decode the received message
                var view = new Uint8Array(data);
//                var array = view.split(",");
                var str = '';
                var controlC = 0;
                var arrayD = [];
                //
                if (view.length >= 1) {
                    //
                    var i = 0;
                    //
                    while (i < view.length) {
                        // if we received a \n, the message is complete, display it
                        var temp_str = String.fromCharCode(view[i]);
                        var str_esc = escape(temp_str);
                        //
                        if (unescape(str_esc) == '*') {
                            //
                            if (i > 0) {
                                //
                                arrayD[controlC] = {t: str};
                                //
                                controlC++;
                            }
                            //
                            str = '';
                            //
                            i += 2;
                        } else {
                            //
                            if (unescape(str_esc) != '') {
                                //
                                str += unescape(str_esc);
                            }
                            //
                            i++;
                        }
                        //
                        if (i === view.length) {
                            //
                            arrayD[controlC] = {t: str};
                        }
                    }
                }
                //
                if (arrayD.length > 0) {
                    //
                    for (var i = 0; i < arrayD.length; i++) {
                        //
                        if (parseFloat(arrayD[i]['t']) > 35) {
                            //
                            if (parseFloat(arrayD[i]['t']) > temperaturaA) {
                                //
                                app.preloader.show();
                                //
                                temperaturaA = parseFloat(arrayD[i]['t']);
                                //
                                $$('#temperatura').val(temperaturaA);
                                //
                                if (temperaturaA < 37.7) {
                                    //
                                    document.getElementById("temperatura").style.border = "1px solid green";
                                    document.getElementById("temperatura").style.color = "white";
                                    document.getElementById("temperatura").style.background = "green";
                                    //
                                } else if (temperaturaA > 37.6 && temperaturaA < 37.9) {
                                    //
                                    document.getElementById("temperatura").style.border = "1px solid orange";
                                    document.getElementById("temperatura").style.color = "white";
                                    document.getElementById("temperatura").style.background = "orange";
                                    //
                                } else {
                                    //
                                    document.getElementById("temperatura").style.border = "1px solid red";
                                    document.getElementById("temperatura").style.color = "white";
                                    document.getElementById("temperatura").style.background = "red";
                                }
                            }
                        } else if (parseFloat(arrayD[i]['t']) < 35 && temperaturaA > 0 && controlTemperatura >= 5) {
                            //
                            guardarDatos(tipoRegistro);
                        }
                    }
                }
            }, errorCallback // error attaching the callback
            );
}

//
function sacarPersona() {
    //
    if (arrayRegistro.length > 0) {
        //
        for (var i = 0; i < arrayRegistro.length; i++) {
            //
            if (arrayRegistro[i]['documento'] == $$('#documentoS').val()) {
                //
                arrayRegistro.splice(i, 1);
                //
                $$('#textoImagenS').html(arrayRegistro.length + '/100');
                //
                var toast = app.toast.create({
                    text: 'Registro retirado!',
                    closeTimeout: 5000
                });
                //
                toast.open();
            }
        }
    }
}

function guardarDatos(valor) {
    //
    tipoRegistro = valor;
    var controlM = 1;
    //
    if (tipoRegistro === 1) {
        //
        if (arrayRegistro.length > 0) {
            //
            var pos = arrayRegistro.length;
            //
            let found = arrayRegistro.find(element => element.documento == $$('#documento').val());
            //
            if (found === "undefined" || found === undefined) {
                //
                if ($$('#documento').val() !== '') {
                    //
                    arrayRegistro[pos] = {
                        documento: $$('#documento').val(),
                        nombres: $$('#nombres').val(),
                        apellidos: $$('#apellidos').val(),
                        temperatura: $$('#temperatura').val()
                    };
                } else {
                    //
                    controlM = 3;
                }
            } else {
                //
                arrayRegistro.find((element) => {
                    //
                    if (element.documento == $$('#documento').val()) {
                        //
                        controlM = 2;
                    }
                });
            }
        } else {
            //
            if ($$('#documento').val() !== '') {
                //
                arrayRegistro[0] = {
                    documento: $$('#documento').val(),
                    nombres: $$('#nombres').val(),
                    apellidos: $$('#apellidos').val(),
                    temperatura: $$('#temperatura').val()
                };
            } else {
                //
                controlM = 3;
            }
        }
        //
        $$('#textoImagen').html(arrayRegistro.length + '/100');
        //
        function colores() {
            //
            document.getElementById("temperatura").style.border = "1px solid #004288";
            document.getElementById("temperatura").style.color = "black";
            document.getElementById("temperatura").style.background = "";
        }
        //
        if (controlM === 1) {
            //
            colores();
            //
            var toast = app.toast.create({
                text: 'Registro guardado!',
                closeTimeout: 5000
            });
            //
            toast.open();
        } else if (controlM === 2) {
            //
            colores();
            //
            var toast = app.toast.create({
                text: 'El documento ya esta registrado!',
                closeTimeout: 5000
            });
            //
            toast.open();
        } else {
            //
            colores();
            //
            var toast = app.toast.create({
                text: 'Llena los campos!',
                closeTimeout: 5000
            });
            //
            toast.open();
        }
        //
        temperaturaA = 0;
        controlTemperatura = 0;
        tipoRegistro = 0;
        $$('#documento').val('');
        $$('#nombres').val('');
        $$('#apellidos').val('');
        $$('#temperatura').val('');
    }
    //
    app.preloader.hide();
}