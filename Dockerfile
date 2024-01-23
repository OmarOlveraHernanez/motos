# Usa una imagen base de Node.js con la versión que necesitas para tu aplicación Nest.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración de Yarn
COPY package.json yarn.lock ./

# Instala todas las dependencias, incluyendo las de desarrollo
RUN yarn install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expón el puerto en el que tu aplicación Nest.js se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación en modo de desarrollo
CMD ["yarn", "start:dev"]