<h1>drone-cafe</h1>

<p>Cистема автоматизации ресторана, разработанная в рамках дипломного проекта учебной программы "Node, Angular и MongoDB: разработка полноценных веб-приложений"</p> 

<h2>Описание</h2>
<p>Серверная часть реализована на Node.js с использованием express.js</p>
<p>Взаимодействие клиента и сервера в реальном времени реализовано с использованием socket.io</p>
<p>За хранение данных отвечает MongoDB (Mongoose)</p>
<p>Клиентская часть построена на js-фреймворке Angular 1, в качетве CSS фреймворка используется Materialyze</p>

<h3>Запуск</h3>
<ol>
<li>Для работы с приложением должна быть запущена MongoDB</li>
<li>npm install</li>
<li>bower install</li>
<li>npm start</li>
</ol>

<h3>Архитектура приложения</h3>
<pre>
-models
--client.js
--dish.js
--order.js
-public
--Client
---client.js
---client.html
--Dish
---dish.js
---dish.html
--Kitchen
---kitchen.js
---kitchen.html
--Login
---login.js
---login.html
--app.js
--index.html
-server
--client.js
--clientActions.js
--dish.js
--dishActions.js
--order.js
--orderActions.js
-.bowerrc
-.gitignore
-app.js
-bower.json
-menu.json
-package.json
-socket.js

</pre>
