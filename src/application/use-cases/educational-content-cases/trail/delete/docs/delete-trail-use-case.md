# DeleteTrailUseCase

A classe `DeleteTrailUseCase` é responsável por deletar uma trilha (`Trail`) específica com base no seu ID. Ela utiliza um repositório de trilhas que assina a interface `ITrailRepository` para buscar e deletar a trilha.

## Funcionamento

1. **Entrada**: O método `execute` recebe um objeto `DeleteTrailUseCaseInputDTO`, que contém o ID da trilha a ser deletada.
2. **Busca da Trilha**: Utiliza o repositório (`trailRepository`) para buscar a trilha pelo ID.
3. **Validação da Existência**: Se a trilha não for encontrada, é lançada uma exceção `TrailNotFoundApplicationException`.
4. **Deleção da Trilha**: Utiliza o repositório para deletar a trilha.
5. **Validação da Deleção**: Se a trilha não for deletada corretamente, é lançada uma exceção `TrailNotDeletedOnRepositoryApplicationException`.
6. **Saída**: Retorna um `DeleteTrailUseCaseOutputDTO` indicando o sucesso da deleção.

## Exceções

- **TrailNotFoundApplicationException**: Lançada se a trilha não for encontrada no repositório.
- **TrailNotDeletedOnRepositoryApplicationException**: Lançada se a trilha não for deletada corretamente no repositório.

## Testes Unitários para DeleteTrailUseCase

Os testes unitários garantem que o `DeleteTrailUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Deleção da Trilha com Sucesso:

- Verifica se o método `execute` deleta corretamente a trilha quando ela é encontrada.
- Garante que o repositório de trilhas é chamado com o ID correto.
- Confirma que a trilha é deletada e o output indica sucesso.

#### Trilha Não Encontrada:

- Verifica se o método `execute` lança uma exceção `TrailNotFoundApplicationException` quando a trilha não é encontrada no repositório.
- Garante que o repositório de trilhas é chamado com o ID correto.

#### Falha na Deleção da Trilha no Repositório:

- Verifica se o método `execute` lança uma exceção `TrailNotDeletedOnRepositoryApplicationException` quando a trilha não é deletada no repositório.
- Garante que o repositório de trilhas é chamado com o ID correto.
- Confirma que a tentativa de deleção falha e a exceção é lançada.

## DTOs

### DeleteTrailUseCaseInputDTO

- **idTrail**: string - O ID da trilha a ser deletada.

### DeleteTrailUseCaseOutputDTO

- **isDeleted**: boolean - Indica se a trilha foi deletada com sucesso.

## Conclusão

A classe `DeleteTrailUseCase` é responsável pela deleção de uma trilha específica, garantindo a busca, validação e deleção adequada da trilha. Os testes unitários asseguram que o comportamento da classe esteja conforme esperado em diferentes cenários, incluindo a deleção bem-sucedida, a trilha não encontrada e a falha na deleção no repositório.
****