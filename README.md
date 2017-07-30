#Quotes
 prometo acabar con este proyecto

# Express server commands
## Development
npm run start

## Comandos generales
### Mongo commands
- `sudo service mongod start`
- `sudo service mongod stop`

### transferir directorio via scp:
- `scp -r <path/to/file/or/dir> user@<remote_host>:<remote_path>`

### Descargar de servidor vis scp:
- `scp -r <user>@<remote_host>:/path/to/remote/dir/ /path/to/dir/`

## Server setup: paso a paso:

### Crear un usuario diferente a root
- `adduser <user>`

### Agregar sudo a user: zrobit
- `usermod -aG sudo <user>`

### Instalar nginx
- `sudo apt-get update`
- `sudo apt-get install nginx`

### Detener, parar resetear Nginx
- `sudo systemctl stop nginx`
- `sudo systemctl start nginx`
- `sudo systemctl restart nginx`
- `sudo systemctl reload nginx`

### Instalar node 8, as root en debian
- `curl -sL https://deb.nodesource.com/setup_8.x | bash -`
- `apt-get install -y nodejs`

### Instalar Mongo
- `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`
- `echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
- `sudo apt-get update`
- `sudo apt-get install -y mongodb-org`

### Start mongo
- `sudo service mongod start`

### Detener mongo
- `sudo service mongod stop`

### Exportar base de datos mongo
- `mongodump -d <database_name> -o <directory_backup>`

### Importar base de datos mongo
- `mongorestore -d <database_name> <directory_backup>`

### Instalar Git
- `sudo apt-get install git-core`

### Generear ssh key
- `ssh-keygen`
- `copiar en repo server`

### Clonar repo en ~/projects/quotes
- `git clone git@gitlab.com:zrobit/quotes.git web`

### Instalar dependencias para node-canvas
- `sudo apt-get install libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++`

### Instalar npm packages
- `npm install --only=prod`
- `npm install --only=dev`

### Instalar npm packages globales
- `sudo npm install -g gulp pm2`

### Build client and server app and assets
- `npm run build:client`
- `npm run build:server`
- `gulp copy:styles`
- `gulp styles:prod`

### Run pm2
- `NODE_ENV=production pm2 start src/server`
