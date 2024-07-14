# PublishTrailClassUseCase

A classe `PublishTrailClassUseCase` é responsável por publicar uma aula de trilha (`TrailClass`) específica com base nos dados fornecidos. Ela utiliza repositórios que assinam as interfaces `ITrailRepository` e `ITrailClassRepository` para buscar a trilha, publicar a aula de trilha e salvar as alterações.

## Funcionamento

1. **Entrada**: O método `execute` recebe um objeto `PublishTrailClassInputDTO`, que contém os IDs da trilha (`idTrail`) e da aula de trilha (`idTrailClass`).
2. **Busca da Trilha**: Utiliza o repositório (`trailRepository`) para buscar a trilha pelo ID.
3. **Validação da Existência da Trilha**: Se a trilha não for encontrada, é lançada uma exceção `TrailNotFoundApplicationException`.
4. **Busca da Aula de Trilha**: Utiliza o serviço de domínio (`TrailDomainService`) para buscar a aula de trilha na trilha fornecida.
5. **Publicação da Aula de Trilha**: Utiliza o serviço de domínio (`TrailClassDomainService`) para alterar o status da aula de trilha para "published".
6. **Persistência da Aula de Trilha Publicada**: Utiliza o repositório (`trailClassRepository`) para salvar a aula de trilha publicada.
7. **Validação da Persistência**: Se a aula de trilha não for salva corretamente, é lançada uma exceção `TrailClassNotSavedOnRepositoryApplicationException`.
8. **Validação de Propriedades da Aula de Trilha**: Verifica se o ID da trilha, o ID da aula de trilha, o título e o status estão definidos e corretos. Lança exceções `InvalidTrailPropetyDomainException` conforme necessário.
9. **Saída**: Retorna um `PublishTrailClassOutputDTO` contendo os detalhes da aula de trilha publicada.

## Exceções

- **TrailNotFoundApplicationException**: Lançada se a trilha não for encontrada no repositório.
- **TrailClassNotSavedOnRepositoryApplicationException**: Lançada se a aula de trilha não for salva corretamente no repositório.
- **InvalidTrailPropetyDomainException**: Lançada se alguma propriedade da aula de trilha (ID da trilha, ID da aula de trilha, título ou status) não estiver definida ou estiver incorreta.

## Testes Unitários para PublishTrailClassUseCase

Os testes unitários garantem que o `PublishTrailClassUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Publicação da Aula de Trilha com Sucesso:

- Verifica se o método `execute` publica corretamente a aula de trilha.
- Garante que o repositório de trilhas é chamado com o ID correto.
- Garante que o repositório de aulas de trilha salva a aula de trilha publicada corretamente.
- Confirma que a saída contém os detalhes da aula de trilha publicada.

#### Trilha Não Encontrada:

- Verifica se o método `execute` lança uma exceção `TrailNotFoundApplicationException` quando a trilha não é encontrada no repositório.
- Garante que o repositório de trilhas é chamado com o ID correto.

#### Falha na Persistência da Aula de Trilha:

- Verifica se o método `execute` lança uma exceção `TrailClassNotSavedOnRepositoryApplicationException` quando a aula de trilha não é salva corretamente no repositório.
- Garante que o repositório de aulas de trilha é chamado com a aula de trilha publicada.

#### Validação de Propriedades da Aula de Trilha:

- Verifica se o método `execute` lança exceções apropriadas para diferentes propriedades não definidas ou incorretas (ID da trilha, ID da aula de trilha, título ou status).
- Garante que as exceções são lançadas conforme esperado para cada propriedade inválida.

## DTOs

### PublishTrailClassInputDTO

- **idTrail**: string - O ID da trilha.
- **idTrailClass**: string - O ID da aula de trilha.

### PublishTrailClassOutputDTO

- **idTrail**: string - O ID da trilha.
- **idTrailClass**: string - O ID da aula de trilha.
- **title**: string - O título da aula de trilha.
- **status**: string - O status da aula de trilha ("published").
