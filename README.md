<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">


### Gestor de Presupuesto Backend
## Dev
Necesitas un cluster de MongoDB
1. Instalar dependencias
```bash
$ npm install
```
2. Renombrar el archivo ".env.template" a ".env" 
3. Correr aplicación
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Endpoints

```bash
# POST crear usuario 
$ http://localhost:3000/api/user/register

# body 
{
    "name": "Nicolas",
    "email": "correo@ejemplo.com",
    "password": "Abcd1234"
}
```

```bash
# POST iniciar sesión
$ http://localhost:3000/api/user/login
{
    "email": "correo@ejemplo.com",
    "password": "Abcd1234"
}
```

```bash
# PATCH actulizar presupuesto
$ http://localhost:3000/api/user/:id
{
    "presupuesto": number,
}
```

```bash
# POST crear gasto
$ http://localhost:3000/api/gastos
{
    "cantidad": number,
    "nomber": "string",
    "categoria": "string",
    "usuario": "mongo id"
}
```

```bash
# GET obtener gastos
$ http://localhost:3000/api/gastos
```

```bash
# GET obtener gastos de un usuario
$ http://localhost:3000/api/gastos/:user-id
```

```bash
# PATCH editar gasto
$ http://localhost:3000/api/gastos/:id
{
    "cantidad": number,
    "nomber": "string",
    "categoria": "string",
    "usuario": "mongo id"
}
```


```bash
# DELETE eliminar gasto
$ http://localhost:3000/api/gastos/:id
```