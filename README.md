# Frontend. Mephi-league.

# Запуск приложения в докер контейнере из готового образа

##### Загрузите файлы из директории [server](./server) на сервер, в любую удобную вам папку (к примеру home директорию пользователя). Последующие команды выполняйте находясь в этой же папке. Выполните команду

`docker load -i ./mephi-league.tar.gz`

##### Для запуска приложения в докер контейнере выполните

`docker-compose up -d`

##### После запуска приложения откройте в браузере

`http://localhost:8000`

# Запуск приложения локально

##### Для установки зависимостей выполните

`npm install` или `yarn install`

##### После установки зависимостей запустите приложение

`npm start` или `yarn start`

##### После запуска приложения откройте в браузере

`http://localhost:41001`

# Сборка докер образа и запуск приложения в докер контейнере

##### Для установки зависимостей выполните

`npm install` или `yarn install`

##### Для сборки приложения выполните

`npm run build` или `yarn run build`

##### Для запуска приложения в докер контейнере выполните

`docker-compose up -d`

##### После запуска приложения откройте в браузере

`http://localhost:8000`

# Сборка докер образа и сохранение его в директорию [server](./server)

##### Для установки зависимостей выполните

`npm install` или `yarn install`

##### Для сборки приложения выполните

`npm run build` или `yarn run build`

##### Для сборки образа выполните

`docker build -t mephi-league:latest --platform linux/amd64 .`

##### Для сохранения сжатого образа выполните

`docker save mephi-league | gzip > ./server/mephi-league.tar.gz`
