# UpdateTrailInfoUseCase

A classe `UpdateTrailInfoUseCase` é responsável por atualizar as informações de uma trilha (`Trail`) específica com base no seu ID. Ela utiliza um repositório de trilhas que assina a interface `ITrailRepository` para buscar e atualizar a trilha.

## Funcionamento

1. **Entrada**: O método `execute` recebe um objeto `UpdateTrailInfoUseCaseInputDTO`, que contém o ID da trilha a ser atualizada e as novas informações (título, subtítulo e descrição).
2. **Busca da Trilha**: Utiliza o repositório (`trailRepository`) para buscar a trilha pelo ID.
3. **Validação da Existência**: Se a trilha não for encontrada, é lançada uma exceção `TrailNotFoundApplicationException`.
4. **Atualização das Informações**: Utiliza o `TrailDomainService` para atualizar as informações da trilha com base no input fornecido.
5. **Persistência da Trilha Atualizada**: A trilha atualizada é salva no repositório através do método `save` do `trailRepository`.
6. **Saída**: Retorna um `UpdateTrailInfoUseCaseOutputDTO` contendo a trilha atualizada.

## Exceções

- **TrailNotFoundApplicationException**: Lançada se a trilha não for encontrada no repositório.

## Testes Unitários para UpdateTrailInfoUseCase

Os testes unitários garantem que o `UpdateTrailInfoUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Atualização Completa de Trilhas:

- Verifica se todas as informações da trilha são atualizadas corretamente.
- Confirma que o método `findById` do repositório foi chamado com o ID correto.
- Verifica que o método `save` do repositório foi chamado com a trilha atualizada.
- Confirma que o output contém a trilha atualizada com as novas informações.

#### Atualização Parcial de Trilhas:

- Verifica se apenas o título é atualizado quando somente ele é informado.
- Verifica se apenas o subtítulo é atualizado quando somente ele é informado.
- Verifica se apenas a descrição é atualizada quando somente ela é informada.
- Em cada caso, confirma que os métodos `findById` e `save` do repositório foram chamados corretamente.
- Confirma que o output contém a trilha com as informações parciais atualizadas.

#### Trilha Não Encontrada:

- Simula a ausência da trilha no repositório.
- Verifica se a exceção `TrailNotFoundApplicationException` é lançada corretamente.
- Confirma que o método `findById` do repositório foi chamado com o ID fornecido.

## DTOs

### UpdateTrailInfoUseCaseInputDTO

- **idTrail**: string - O ID da trilha a ser atualizada.
- **newTitle**: string (opcional) - O novo título da trilha.
- **newSubtitle**: string (opcional) - O novo subtítulo da trilha.
- **newDescription**: string (opcional) - A nova descrição da trilha.

### UpdateTrailInfoUseCaseOutputDTO

- **updatedTrail**: Trail - A trilha atualizada.

## Conclusão

A classe `UpdateTrailInfoUseCase` é responsável pela atualização das informações de uma trilha específica, garantindo a busca, validação e persistência das novas informações. Os testes unitários asseguram que o comportamento da classe esteja conforme esperado em diferentes cenários, incluindo atualizações completas e parciais, além de tratar adequadamente o caso em que a trilha não é encontrada.
