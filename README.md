# Lista Telefónica com Maven

## Pequeno relatório do projeto
Este projeto foi feito no âmbito da disciplina/UFCD de desenvolvimento web.
A ideia principal foi criar um sistema simples de gestão de contactos a funcionar no browser.

## Objetivo
O objetivo era conseguir:
- Adicionar contactos
- Editar contactos
- Eliminar contactos
- Ver o detalhe de cada contacto
- Guardar os dados para não desaparecerem ao fechar a página

## O que foi implementado
No estado atual do projeto já existe:
- Página principal com a lista de contactos
- Página de formulário para criar e editar contactos
- Página de detalhe de contacto
- Validação dos campos principais
- Mensagens de erro junto aos inputs no formulário
- Regras para telefone (9 dígitos e a começar por 9 ou 2)
- Persistência com localStorage

## Organização do projeto
O trabalho foi organizado por áreas para ficar mais fácil de manter:
- HTML separado por páginas
- JavaScript separado por responsabilidade (serviço de dados, lista, formulário e detalhe)
- CSS separado por ficheiros (base, layout, componentes, formulários e contactos)

## Tecnologias usadas
- HTML
- CSS
- JavaScript
- Maven (estrutura do projeto)

## Como testar
1. Abrir a página principal no browser
2. Clicar em "Adicionar contacto"
3. Preencher os campos e guardar
4. Confirmar se o contacto aparece na lista
5. Testar editar, eliminar e abrir detalhe

## Dificuldades encontradas
As principais dificuldades foram:
- Organização dos caminhos entre pastas depois de mover ficheiros
- Separação do código JS e CSS sem partir funcionalidades
- Garantir que as validações funcionavam em criação e edição

## O que aprendi
Neste projeto melhorei sobretudo em:
- Manipulação do DOM
- Gestão de dados no localStorage
- Validação de formulários no frontend
- Organização de projeto por ficheiros e responsabilidades

## Melhorias futuras
Se tivesse mais tempo, gostava de acrescentar:
- Pesquisa de contactos por nome
- Ordenação da lista
- Mensagens de sucesso mais visíveis
- Melhor acessibilidade dos formulários
- Ligação a backend/base de dados

## Conclusão
O projeto cumpre o objetivo de ser uma aplicação funcional de gestão de contactos para contexto escolar.
Ainda há espaço para melhorar, mas já permite criar, editar, eliminar e consultar contactos de forma simples e organizada.
