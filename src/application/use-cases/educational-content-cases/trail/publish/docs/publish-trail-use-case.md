# PublishTrailUseCase

A classe `PublishTrailUseCase` é responsável por publicar uma trilha (`Trail`) específica com base no seu ID. Ela utiliza um repositório de trilhas que assina a interface `ITrailRepository` para buscar e atualizar a trilha, e um serviço de domínio (`TrailDomainService`) para alterar o status da trilha para "published".

## Funcionamento

1. **Entrada**: O método `execute` recebe um objeto `PublishTrailUseCaseInputDTO`, que contém o ID da trilha a ser publicada.
2. **Busca da Trilha**: Utiliza o repositório (`trailRepository`) para buscar a trilha pelo ID.
3. **Validação da Existência**: Se a trilha não for encontrada, é lançada uma exceção `TrailNotFoundApplicationException`.
4. **Publicação da Trilha**: Utiliza o `TrailDomainService` para alterar o status da trilha para "published".
5. **Persistência da Trilha Publicada**: A trilha publicada é salva no repositório através do método `save` do `trailRepository`.
6. **Saída**: Retorna um `PublishTrailUseCaseOutputDTO` contendo a trilha publicada.

## Exceções

- **TrailNotFoundApplicationException**: Lançada se a trilha não for encontrada no repositório.

## Testes Unitários para PublishTrailUseCase

Os testes unitários garantem que o `PublishTrailUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Publicação de Trilhas:

- Verifica se a trilha é publicada corretamente.
- Confirma que o método `findById` do repositório foi chamado com o ID correto.
- Verifica que o status da trilha é alterado para "published".
- Confirma que o método `save` do repositório foi chamado com a trilha publicada.
- Verifica que o output do caso de uso contém a trilha publicada.

#### Trilha Não Encontrada:

- Simula a ausência da trilha no repositório.
- Verifica se a exceção `TrailNotFoundApplicationException` é lançada corretamente.
- Confirma que o método `findById` do repositório foi chamado com o ID fornecido.

## DTOs

### PublishTrailUseCaseInputDTO

- **idTrail**: string - O ID da trilha a ser publicada.

### PublishTrailUseCaseOutputDTO

- **publishedTrail**: Trail - A trilha publicada.

## Conclusão

A classe `PublishTrailUseCase` é responsável pela publicação de uma trilha específica, garantindo a busca, validação e alteração do status da trilha para "published". Os testes unitários asseguram que o comportamento da classe esteja conforme esperado em diferentes cenários, incluindo a publicação bem-sucedida e o tratamento adequado do caso em que a trilha não é encontrada.
