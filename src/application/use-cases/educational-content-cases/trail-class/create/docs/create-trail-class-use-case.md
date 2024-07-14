# CreateTrailClassUseCase

A classe `CreateTrailClassUseCase` é responsável por criar uma aula de trilha (`TrailClass`) específica com base nos dados fornecidos. Ela utiliza repositórios que assinam as interfaces `ITrailRepository` e `ITrailClassRepository` para buscar a trilha e salvar a nova aula de trilha.

## Funcionamento

1. **Entrada**: O método `execute` recebe um objeto `CreateTrailClassInputDTO`, que contém os dados da nova aula de trilha a ser criada.
2. **Busca da Trilha**: Utiliza o repositório (`trailRepository`) para buscar a trilha pelo ID.
3. **Validação da Existência da Trilha**: Se a trilha não for encontrada, é lançada uma exceção `TrailNotFoundApplicationException`.
4. **Validação do ID da Trilha**: Se o ID da trilha não estiver definido, é lançada uma exceção `InvalidTrailPropetyDomainException`.
5. **Criação da Aula de Trilha**: Utiliza o serviço de domínio (`TrailClassDomainService`) para criar a nova aula de trilha.
6. **Persistência da Aula de Trilha**: Utiliza o repositório (`trailClassRepository`) para salvar a nova aula de trilha.
7. **Validação da Persistência**: Se a aula de trilha não for salva corretamente, é lançada uma exceção `TrailClassNotSavedOnRepositoryApplicationException`.
8. **Saída**: Retorna um `CreateTrailClassOutputDTO` contendo a nova aula de trilha criada.

## Exceções

- **TrailNotFoundApplicationException**: Lançada se a trilha não for encontrada no repositório.
- **InvalidTrailPropetyDomainException**: Lançada se o ID da trilha não estiver definido.
- **TrailClassNotSavedOnRepositoryApplicationException**: Lançada se a aula de trilha não for salva corretamente no repositório.

## Testes Unitários para CreateTrailClassUseCase

Os testes unitários garantem que o `CreateTrailClassUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Criação da Aula de Trilha com Sucesso:

- Verifica se o método `execute` cria corretamente a aula de trilha.
- Garante que o repositório de trilhas é chamado com o ID correto.
- Garante que o repositório de aulas de trilha salva a nova aula corretamente.
- Confirma que a saída contém a nova aula de trilha criada.

#### Trilha Não Encontrada:

- Verifica se o método `execute` lança uma exceção `TrailNotFoundApplicationException` quando a trilha não é encontrada no repositório.
- Garante que o repositório de trilhas é chamado com o ID correto.

#### ID da Trilha Não Definido:

- Verifica se o método `execute` lança uma exceção `InvalidTrailPropetyDomainException` quando o ID da trilha não está definido.
- Garante que o repositório de trilhas é chamado e retorna uma trilha com ID indefinido.

#### Falha na Persistência da Aula de Trilha:

- Verifica se o método `execute` lança uma exceção `TrailClassNotSavedOnRepositoryApplicationException` quando a aula de trilha não é salva corretamente no repositório.
- Garante que o repositório de aulas de trilha é chamado com a nova aula criada.

#### Validação de Input Inválido:

- Verifica se o método `execute` lança exceções apropriadas para diferentes cenários de entrada inválida (título, subtítulo ou descrição inválidos).
- Garante que o método lança exceções para cada cenário de entrada inválida.

## DTOs

### CreateTrailClassInputDTO

- **idTrail**: string - O ID da trilha.
- **title**: string - O título da aula de trilha.
- **subtitle**: string - O subtítulo da aula de trilha.
- **description**: string - A descrição da aula de trilha.
- **duration**: number - A duração da aula de trilha.

### CreateTrailClassOutputDTO

- **trailClass**: TrailClass - A nova aula de trilha criada.
