#Quotes
 prometo acabar con este proyecto

# Express server commands
## Development
npm run start

#Mongo commands
sudo service mongod start
sudo service mongod stop

#transferir directorio via scp
scp -r <path/to/file/or/dir> user@<remote_host>:<remote_path>

##Server setup: paso a paso:

Crear un usuario diferente a root
- adduser zrobit
Agregar sudo a user: zrobit
- usermod -aG sudo zrobit

Instalar nginx
-sudo apt-get update
-sudo apt-get install nginx

Instalar node 8, as root
- curl -sL https://deb.nodesource.com/setup_8.x | bash -
- apt-get install -y nodejs

Instalar Mongo
- sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
- echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
- sudo apt-get update
- sudo apt-get install -y mongodb-org

Start mongo
- sudo service mongod start

Detener mongo
- sudo service mongod stop

Exportar e importar base de datos
- mongodump -d <database_name> -o <directory_backup>
- mongorestore -d <database_name> <directory_backup>

Instalar Git
- sudo apt-get install git-core

Generear ssh key
- ssh-keygen
- copiar en repo server

Clonar repo en ~/projects/quotes
- git clone git@gitlab.com:zrobit/quotes.git web

Instalar dependencias para node-canvas
- sudo apt-get install libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++

Instalar npm packages
- npm install --only=prod
- npm install --only=dev
Instalar npm packages globales
- npm install gulp pm2

Build client and server app and assets
- npm run build:client
- npm run build:server
- gulp copy:styles
- gulp styles:prod

Run pm2
- NODE_ENV=production pm2 start src/server
