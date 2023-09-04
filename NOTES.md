# Prisma
## Generamos un archivo de configuracion .env
** por defecto config postgresql **
npx prisma init
** config sqlite **
npx prisma init --datasource-provider sqlite
** config mysql **
npx prisma init --datasource-provider mysql
** config postgresql **
npx prisma init --datasource-provider postgresql
### Chequear que este bien configurado
** config mongodb **
npx prisma init --datasource-provider mongodb

# npx prisma migrate dev --name init
*migramos nuestro modelo al servidor donde esta la bbdd sqlite*

# npx prisma studio
*inicia un servidor web para ver la base de datos*
*requiere de un modelo de datos*

