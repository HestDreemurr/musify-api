# Rotas da API

## `/auth/register`
Cadastrar um usuário

**Método**: POST

**Entrada**: Objeto com os dados do usuário (`body`)
```
{
  "name": "<nome>",
  "email": "<email>",
  "password": "<senha>"
}
```

**Retorno**: Token JWT pro usuário
```
{
  "ok": true,
  "userToken": "<token>"
}
```


## `/auth/login`
Fazer login

**Método**: POST

**Entrada**: Dados a serem validados (`body`)
```
{
  "email": "<email>",
  "password": "<senha>"
}
```

**Retorno**: 
*Se o usuário não for encontrado*:

```
{
  "ok": false,
  "errorCode": "user_not_found"
}
```
*Se a senha for inválida*:
```
{
  "ok": false,
  "errorCode": "invalid_password"
}
```
*Se os dados estiverem corretos*:
```
{
  "ok": true,
  "token": "<token>"
}
```



## `/auth/me`
Buscar um usuário

**Método**: GET

**Entrada**: Token do usuário (`headers`)

```
authorization: "Bearer <token>"
```

**Retorno**: Dados do usuário

```
{
  "ok": true,
  "user": {
    "id": "<id>",
    "name": "<nome>",
    "email": "<email>"
  }
}
```



## `/auth/update`
Atualizar dados de um usuário

**Método**: PUT

**Entrada**: 

Token do usuário (`headers`)
```
authorization: "Bearer <token>"
```

Objeto com as mudanças (É possível enviar apenas uma propriedade para mudar)
```
{
  "name": "<novo-nome>",
  "email": "<novo-email>"
}
```

**Retorno**: Sem retorno