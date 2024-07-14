# DeleteTrailClassUseCase

A classe `DeleteTrailClassUseCase` é responsável por deletar uma aula de trilha (`TrailClass`) específica com base no ID da trilha (`Trail`) e o ID da aula de trilha. Ela utiliza repositórios que assinam as interfaces `ITrailRepository` e `ITrailClassRepository` para buscar e deletar a aula de trilha.

## Funcionamento

1. **Entrada**: O método `execute` recebe um objeto `DeleteTrailClassInputDTO`, que contém o ID da trilha (`idTrail`) e o ID da aula de trilha (`idTrailClass`).
2. **Busca da Trilha**: Utiliza o repositório (`trailRepository`) para buscar a trilha pelo ID.
3. **Validação da Existência da Trilha**: Se a trilha não for encontrada, é lançada uma exceção `TrailNotFoundApplicationException`.
4. **Busca da Aula de Trilha**: Utiliza o método `getTrailClassById` da trilha para buscar a aula de trilha pelo ID.
5. **Validação da Existência da Aula de Trilha**: Se a aula de trilha não for encontrada, é lançada uma exceção `TrailClassNotFoundOnTrailDomainException`.
6. **Deleção da Aula de Trilha**: Utiliza o repositório (`trailClassRepository`) para deletar a aula de trilha.
7. **Validação da Deleção**: Se a aula de trilha não for deletada corretamente, é lançada uma exceção.
8. **Saída**: Retorna um `DeleteTrailClassOutputDTO` indicando o sucesso da deleção.

## Exceções

- **TrailNotFoundApplicationException**: Lançada se a trilha não for encontrada no repositório.
- **TrailClassNotFoundOnTrailDomainException`.**: Lançada se a aula de trilha não for encontrada na trilha.
- **Erro Genérico**: Lançado se a aula de trilha não for deletada corretamente no repositório.

## Testes Unitários para DeleteTrailClassUseCase

Os testes unitários garantem que o `DeleteTrailClassUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Deleção da Aula de Trilha com Sucesso:

- Verifica se o método `execute` deleta corretamente a aula de trilha quando ela é encontrada.
- Garante que o repositório de trilhas é chamado com o ID correto.
- Garante que o método `getTrailClassById` da trilha é chamado com o ID correto.
- Confirma que a aula de trilha é deletada e o output indica sucesso.

#### Trilha Não Encontrada:

- Verifica se o método `execute` lança uma exceção `TrailNotFoundApplicationException` quando a trilha não é encontrada no repositório.
- Garante que o repositório de trilhas é chamado com o ID correto.

#### Aula de Trilha Não Encontrada:

- Verifica se o método `execute` lança uma exceção `TrailClassNotFoundApplicationException` quando a aula de trilha não é encontrada na trilha.
- Garante que o método `getTrailClassById` da trilha é chamado com o ID correto.

#### Falha na Deleção da Aula de Trilha no Repositório:

- Verifica se o método `execute` lança uma exceção genérica quando a aula de trilha não é deletada no repositório.
- Garante que o repositório de aulas de trilha é chamado com o ID correto.
- Confirma que a tentativa de deleção falha e a exceção é lançada.

## DTOs

### DeleteTrailClassInputDTO

- **idTrail**: string - O ID da trilha.
- **idTrailClass**: string - O ID da aula de trilha.

### DeleteTrailClassOutputDTO

- **isDeleted**: boolean - Indica se a aula de trilha foi deletada com sucesso.

## Conclusão

A classe `DeleteTrailClassUseCase` é responsável pela deleção de uma aula de trilha específica, garantindo a busca, validação e deleção adequada da aula de trilha. Os testes unitários asseguram que o comportamento da classe esteja conforme esperado em diferentes cenários, incluindo a deleção bem-sucedida, a trilha não encontrada, a aula de trilha não encontrada e a falha na deleção no repositório.

A documentação, escrita em Markdown, proporciona uma visão clara e detalhada do caso de uso, incluindo explicações sobre a funcionalidade, exceções tratadas e detalhes dos testes unitários.
