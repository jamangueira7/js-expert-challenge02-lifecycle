<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="#-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;
  </p>
<br>

# JSExpert: Desafio Modulo IV - Minha playlist

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Yarn](https://yarnpkg.com/)
- [Npm](https://www.npmjs.com/)
- [NodeJS](https://nodejs.org/en/) - v19.7.0


## 💻 Projeto

No `módulo 03 - Conceitos fundamentais sobre o ciclo de vida do Javascript` vimos diferentes conceitos dentro do nosso querido Java Script, então escolhemos os mais relevantes e desenvolvemos um desafios onde possam ser ultilizados.

Descrição completa do desafio [aqui](https://github.com/training-erickwendel/jsexpert-challenge02-lifecycle)

Testes passando:

![img_1.png](.github%2Fimg_1.png)

Cobertura: 

![img.png](.github%2Fimg.png)

![img_2.png](.github%2Fimg_2.png)

## 🚀 Como Rodar

- Clone o projeto.
- Entre na raiz do projeto.
- Execute `npm install`.
- Execute `npm run api`
- Execute `npm run test` ou `npm run test:cov` para rodar o test

## ↗ Rotas

- **`GET /`**: Rota default

Retorna:
```
{
    msg: "404 - Essa rota não existe. Tente /youtube ou /spotify"
}
```

- **`GET /youtube`**: Rota playlist Youtube

Retorna:
```
{
   "musics":[
      {
         "display":"Locked out of Heaven - Unorthodox Jukebox - Bruno Mars",
         "duration":"00:03:53:478"
      },
      {
         "display":"Waka Waka (This Time for Africa) [The Official 2010 FIFA World Cup (TM) Song] (feat. Freshlyground) - Listen Up! The Official 2010 FIFA World Cup Album - Shakira",
         "duration":"00:03:22:626"
      },
      ...
      {
         "display":"Waiting For Love - Stories - Avicii",
         "duration":"00:03:50:613"
      }
   ],
   "duration":"06:11:19:216"
}
```

- **`GET /spotify`**: Rota playlist Spotify

Retorna:
```
{
   "musics":[
      {
         "display":"Flowers - Flowers - undefined",
         "duration":"Invalid date"
      },
      {
         "display":"Kill Bill - SOS - undefined",
         "duration":"Invalid date"
      },
      ...
      {
         "display":"DESPECHÁ - MOTOMAMI + - undefined",
         "duration":"Invalid date"
      }
   ],
   "duration":"Invalid date"
}
```

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT.
