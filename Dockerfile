# Usar la imagen base oficial de Node.js
FROM node:16

# Crear y establecer el directorio de trabajo de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación si es necesario (por ejemplo, usando Webpack)
RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 8080

# Definir el comando de inicio de la aplicación
CMD ["node", "server.js"]
