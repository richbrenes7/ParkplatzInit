# Final Core

## Preámbulo

El registro de visitantes en América Latina es un proceso tedioso y principalmente de forma manual. Lo común es que una persona esté en la recepción tomando nota - la mayoría de las veces con papel y lápiz - de cada visitante. Por razones de seguridad, usualmente piden a cada visitante dejar sus datos como nombre y rut, además de portar una identificación del lugar. Si vivimos en la era digital, ¿por qué seguimos registrando visitantes como si fuera 1985 con papel y lápiz? ¿Qué tal ayudamos a la persona en recepción con una tablet? ¿Qué tal si en lugar de pedir una identificación, tomamos una foto?.


## Introducción
En el presente proyecto la empresa de coworking donde opera Laboratoria ha decidido contratarnos para reinventar su proceso de registro de visitantes. Con la entrada de al mercado latinoamericano, existe mucha más competencia e invertir en tecnología para mejorar su servicio se ha convertido en una necesidad; el registro de visitantes es un primer acercamiento. Nos hemos inspirado en los diseños de varios registros y en la retroalimentación obtenida de entrevistas hechas a personas que trabajan en el área de conserjería.

## Definición del producto

La finalidad de ésta aplicación consiste en mantener un registro y un orden de todas las personas que ingresan a un lugar de una forma rápida y eficiente, además de mantener dicho registro en una base de datos Firebase para que también sea duradero. Adicional a ésto, cuenta con la ventaja de poder avisar a la persona u organización, a través de un mail, que la visita está presente en el lugar. 
Nuestro diseño está orientado a que sea una aplicación de fácil uso e intuitiva, para que personas de cualquier edad y nivel educacional puedan utilizarla.

## Benchmark

## Diseño
El primer diseño que propusimos era un poco más orientado a gente que tenía más expertise en el manejo tecnológico, por lo tanto al iterar hicimos algunos cambios mínimos pero que permitían un margen de error mayor.
El primer Sketch se veía así:
![image](https://github.com/NatalyVerdugoNogue/scl-2018-01-ProyectoFinalCore/blob/master/UX/Sketch%20baja%20fidelidad/Primer%20Prototipo/PrimerPrototipo1.jpg)
![image](https://github.com/NatalyVerdugoNogue/scl-2018-01-ProyectoFinalCore/blob/master/UX/Sketch%20baja%20fidelidad/Primer%20Prototipo/PrimerPrototipo2.jpg)
![image](https://github.com/NatalyVerdugoNogue/scl-2018-01-ProyectoFinalCore/blob/master/UX/Sketch%20baja%20fidelidad/Primer%20Prototipo/PrimerPrototipo3.jpg)

Luego de iterar, nuestro diseño final se ve así:
![image](https://github.com/NatalyVerdugoNogue/scl-2018-01-ProyectoFinalCore/blob/master/UX/Sketch%20baja%20fidelidad/Prototipo%20Iterado/Prototipo1.jpg)
![image](https://github.com/NatalyVerdugoNogue/scl-2018-01-ProyectoFinalCore/blob/master/UX/Sketch%20baja%20fidelidad/Prototipo%20Iterado/Prototipo2.jpg)
![image](https://github.com/NatalyVerdugoNogue/scl-2018-01-ProyectoFinalCore/blob/master/UX/Sketch%20baja%20fidelidad/Prototipo%20Iterado/Prototipo3.jpg)
![image](https://github.com/NatalyVerdugoNogue/scl-2018-01-ProyectoFinalCore/blob/master/UX/Sketch%20baja%20fidelidad/Prototipo%20Iterado/Prototipo4.jpg)
Se agregaron algunas herramientas para buscar a los residentes y, lo más importante, al borrar a los visitantes pide una confirmación para no borrar a la gente por accidente.

## Entrevistas

Nuestros entrevistados fueron 3, Manuel de 68 años, jubilado, César de 48 años, jardinero y Eduardo de 56 años, carpintero.
Con respecto a la tecnología que usan comúnmente, sólo utilizan celulares inteligentes (menos Manuel, quien utiliza celulares antiguos), pero mayoritariamente para llamar y recibir mensajes, no los utilizan para navegar por internet ni hacer transacciones; por lo tanto, fue muy interesante ver sus interacciones con nuestros prototipos de aplicación, ya que uno de nuestros objetivos es que fuera de uso intiutivo.
Todos coincidieron en que la forma típica de recolectar los datos era en lápiz y papel, pidiendo el nombre, rut, departamento a visitar, hora de entrada y salida. Además de avisarle al residente a través de una llamada (que era un grave problema e inconveniente si no era contestada) y se demoraban entre 3 a 5 minutos por persona (registro).
Al pasarles el prototipo, no tuvieron mayor problemas en hacer un registro exitoso, pero hubo algunos datos que se pedían que ellos jamás habían requerido (email y teléfono) y los que les parecieron excesivos e invasivos. 
Donde hubo más conflicto fue en el tema de ver la información del registrado y de borrarla, ya que en un principio habíamos puesto un botón al lado del registro para verlo y para borrarlo, pero Manuel no entendío en un principio la utilidad del botón y César y Eduardo "clickearon" sobre los nombres, no sobre el botón. Todos coincidieron en que era peligroso tener los botones tan cerca, ya que por error podrían clickear el uno o el otro. Eduardo nos dió la idea de poner una pantalla de confirmación al borrar el registro del visitante y todos nos sugirieron poner alguna forma de buscar al visitante par aver su información de forma más rápida y poder borrar su registro más fácilmente.
Al abrirse la pantalla, todos supieron volver y borrar el registro.
Fue una interesante instancia de interacción y prueba de nuestro diseño, dentro de todo no hubo mucho conflicto en utilizarlo y las sugerencias fueron mayoritariamente de diseño.
Gracias a ésto, pudimos llegar a nuestro diseño final.

## Guía de instalación

### Git

Git es un "sistema de control de versiones" usado por muchos programadores - es un sistema
que registra los cambios en los archivos a través del tiempo de forma tal que puedas
acceder a versiones específicas cuando lo desees. Es muy similar a la opción de "registrar cambios"
en Microsoft Word, pero mucho más poderoso.

#### Instalar Git

##### Windows

Puedes descargar Git de [git-scm.com][3]. Puedes hacer clic en "Next" para todos los pasos
excepto en uno; en el quinto paso titulado "Adjusting your PATH environment",
elije "Run Git and associated Unix tools from the Windows command-line" (la última opción).
Aparte de eso, los valores por defecto funcionarán bien. "Checkout Windows-style,
commit Unix-style line endings" también está bien.

[3]: https://git-scm.com/

##### MacOS

Descarga Git de [git-scm.com][3] y sigue las instrucciones.

##### Linux

Si no lo tienes ya instalado, git debería estar disponible a través del administrador de paquetes,
prueba con:

sudo apt install git
sudo yum install git

## Dependencias

### GitHub

#### Conectar

[Ingresa](https://github.com/) a tu cuenta en GitHub o registrarse.

#### Fork

Haz tu propio [fork](https://help.github.com/articles/fork-a-repo/)
del siguiente [repositorio](https://github.com/NatalyVerdugoNogue/scl-2018-05-bc-core-am-socialnetwork).

#### Clonar

[Clona](https://help.github.com/articles/cloning-a-repository/)
tu fork a tu computadora (copia local).

#### Instalar

Instala las dependencias del proyecto con el comando `npm
install`. Esto asume que has instalado [Node.js](https://nodejs.org/) (que
incluye [npm](https://docs.npmjs.com/)).