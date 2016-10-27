$(document).ready(function() {
  $('form').form({
    on: 'blur',
    inline: true,
    fields: {
      autor: {
        identifier: 'autor',
        rules: [
          {
            type   : 'empty',
            prompt : 'Insira um nome de autor válido.',
          },
        ]
      },
      titulo: {
        identifier: 'titulo',
        rules: [
          {
            type: 'empty',
            prompt: 'Insira um título válido.',
          }
        ]
      },
      editora: {
        identifier: 'editora',
        rules: [
          {
            type: 'empty',
            prompt: 'Insira um nome de editora válido.',
          }
        ]
      },
      edicao: {
        identifier: 'edicao',
        rules: [
          {
            type: 'empty',
            prompt: 'Insira um nome de edição válido.',
          },
          {
            type: 'integer',
            prompt: 'Edição deve ser um número inteiro.',
          }
        ]
      },
      preco: {
        identifier: 'preco',
        rules: [
          {
            type: 'empty',
            prompt: 'Insira um preço válido.',
          },
          {
            type: 'integer',
            prompt: 'Preço deve ser um número inteiro.',
          }
        ]
      },
      imagem: {
        identifier: 'imagem',
        rules: [
          {
            type: 'empty',
            prompt: 'Imagem deve ser uma URL válida.',
          },
        ],
      }
    }
  });
});
