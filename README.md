# Blog_Mevn : Guía explicativa.

## Dependencias Usadas.

- Bcryptjs: Para el encriptado de contraseñas. (https://www.npmjs.com/package/bcryptjs)
- Body-parser: Middleware que analiza datos codificados JSON. (https://www.npmjs.com/package/body-parser)
- Bootstrap-vue: (https://www.npmjs.com/package/bootstrap-vue).
- Concurrently: Permite ejecutar varios comandos al mismo  tiempo. (https://www.npmjs.com/package/concurrently)
- Cors: Middleware para habilitar Cors. (https://www.npmjs.com/package/cors),(https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
- Express: Framework web más popular de Node para facilitar su uso. (https://www.npmjs.com/package/express)
- Fs-extra: Permite en uso de Async-await en fs. (https://www.npmjs.com/package/fs-extra)
- Jsonwebtoken: Nos proporciona el token con el cual proceder a la autenticación de usuario.(https://www.npmjs.com/package/jsonwebtoken)
- Md5: Función de JavaScript para mensajes hash con MD5, usado en este proyecto para gravatar, servicio que da predeterminadamente un avatar a un usuario mediante el email, el cuál md5 hashea.(https://www.npmjs.com/package/md5)
- Moment: Una biblioteca de fechas de JavaScript liviana para analizar, validar, manipular y formatear fechas. (https://www.npmjs.com/package/moment)
- Mongoose: Biblioteca de JavaScript que le permite definir esquemas con datos fuertemente tipados. (https://www.npmjs.com/package/mongoose)
- Multer: Multer es un middleware node.js para el manejo multipart/form-data, que se utiliza principalmente para cargar archivos. (https://www.npmjs.com/package/multer)
- Passport:El único propósito de Passport es autenticar las solicitudes, lo que hace a través de un conjunto extensible de complementos conocidos como estrategias.(https://www.npmjs.com/package/passport)
- Jest: Test de la aplicación. (https://www.npmjs.com/package/jest)

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Instalación y ejecución del proyecto.
Tras clonar el proyecto, ya sea mediante línea de comandos o descargando el zip, será necesario, desde la consola, ejecutar "npm install" tanto en la carpeta principal como en la carpeta client.
Para lanzar el proyecto necesitamos abrir dos terminales, una ubicada en la carpeta principal y lanzar "node src/app.js" para el servidor, y desde la carpeta client "npm run serve" para el cliente Vue.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Organicación del proyecto (carpetas y archivos que necesitan explicación).

###### => BACK-END: blog_mevn/src

Dentro de la carpeta src tenemos:.
- Config: Contiene Blog-mevn.postman_collection.json (Para POSTMAN),keysjs y passportConfig.js(Configuración de passport).
- Controllers: Para modularizar el proyecto, los archivos js de esta carpeta contienen las funciones de los endpoints alojados en la carpeta routes.
- Helpers: Contiene el validador de palabras ofensivas y el archivo de carga predeterminada a la base de datos, cuando ésta no tiene información.
- Models: Modelos mongoose de las tablas de MongoDb.
- Public : Importante, al implementar la subida de imágenes al blog, carpeta estática donde se guardan las imágenes que subimos desde nuestro ordenador(En este caso también hay almacenadas fotos para que puedas subirlas cuando pruebes el blog).
- Index.js : Archivo principal del proyecto donde se efectúa la creación y conexión al servidor, conexión a mongoDb y configuración de middlewares y de app.

###### => FRONT-END: blog_mevn/client
- Components: Componentes comunes a las diversas vistas, como el navegador y el manejador de errores.
- Router: Se establecen las rutas de las diferentes vistas.
- Views: Las diferentes vistas que podemos acceder desde el Navbar.
- Warehouse: Diferentes archivos .js dónde se genera la lógica para pasar los datos del back al front.
- Store: Arvhivo js que nos permite indicarle a vue que use los archivos js almacenados en Warehouse para disponer de sus getters,actions,states y mutations.
- Main.js: Archivo de configuración de vue donde indicamos que usamos bootstrap-vue, fontawesome icons, axios, e indicamos que el token se almacena el el localstorage y para la Authorization.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Explicación de las diferentes vistas.
###### HOME
![HOME VIEW](https://github.com/AndresO90/Blog_Mevn/blob/master/src/public/uploads/home.png)
Home es la vista principal de la web, a la cual tiene acceso cualquier persona aunque no esté logada ni registrada, en ella tenemos:
RECENT POSTS UPLOADS: dónde aparecen todos los post del blog, ordenados por novedad;  WEB STATISTICS: Dónde podemos observar las estadisticas de la web, como el total de posts, total de comentarios en ellos, el total de vistas de todos los blogs de la web y también de likes.
MOST POPULAR POSTS: donde aparece el top 3 de post más vistos.

###### MYPOST 

![MYPOST VIEW](https://github.com/AndresO90/Blog_Mevn/blob/master/src/public/uploads/myPostUser.png)
Mypost es la vista donde un USUARIO logado puede editar y borrar los posts que ha creado o crear uno nuevo, subiendo una imagen para ello(facilito imágenes en la carpeta public del src del back)
Al pulsar el botón de borrar nos pide una confirmación antes de poder borrar dicho post. Al pulsar editar aparece un apartado similar al de subir un post para que podamos editarlo.

###### POST
![POST VIEW](https://github.com/AndresO90/Blog_Mevn/blob/master/src/public/uploads/post.png)
Post es otra vista pública donde al haber pulsado sobre un post en home nos lleva a la info de ese post, donde podemos ver el titulo, la imagen el texto, un botón de LIKE(solo para usuarios logados),numero de likes, numero de vistas, el creador y cuánto hace que lo creó(gracias a la dependencia moment).
Más abajo aparece el listado de comentarios y el formulario para crear uno nuevo(solo usuarios registrados).

###### COMMENTS IN POST
![COMMENT VIEW](https://github.com/AndresO90/Blog_Mevn/blob/master/src/public/uploads/commentsExample.png)
En la parte inferior del post tenemos la posibilidad de añadir comentarios, y más abajo el listado de los mismos(si hay comentarios claro), además observamos que cada usuario que comenta tiene un avatar predeterminado(gracias al servicio de gravatar)

###### PROFILE USER
![PROFILE USER](https://github.com/AndresO90/Blog_Mevn/blob/master/src/public/uploads/profileUser.png)
En ésta vista denemos una pequeña info del user junto a sus estadísticas personales desde que creó el usuario, tales como posts creados, total de comentarios escritos, total de vistas que tienen sus posts y el total de likes que les han dado.

###### MANAGE POST
![MANAGE POST](https://github.com/AndresO90/Blog_Mevn/blob/master/src/public/uploads/managePostAdmin.png)
Vista única del ADMINISTRADOR, donde puede borrar cualquier post o crear uno nuevo.

###### OFFENSIVE WORDS
![OFFENSIVE WORDS](https://github.com/AndresO90/Blog_Mevn/blob/master/src/public/uploads/offWordAdmin.png)
Vista única del ADMINISTRADOR, dónde se listan las palabras ofensivas, puede borrarlas editarlas o crear una nueva.
