# ReadPublishedTrailsUseCase

A classe `ReadPublishedTrailsUseCase` é responsável por ler todas as trilhas (`Trail`) que já foram publicadas. Ela utiliza um repositório de trilhas que assina a interface `ITrailRepository` para buscar essas trilhas.

## Funcionamento

1. **Busca das Trilhas Publicadas**: O método `execute` utiliza o repositório (`trailRepository`) para listar todas as trilhas que já foram publicadas.
2. **Criação do DTO de Saída**: Cria um objeto `ReadPublishedTrailsUseCaseOutputDTO` contendo a lista de trilhas publicadas obtida.
3. **Saída**: Retorna o `ReadPublishedTrailsUseCaseOutputDTO` com as trilhas publicadas.

## Testes Unitários para ReadPublishedTrailsUseCase

Os testes unitários garantem que o `ReadPublishedTrailsUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Lista de Trilhas Publicadas Encontrada:

- Verifica se a lista de trilhas publicadas é retornada corretamente quando existem trilhas.
- Confirma que o método `listPublished` do repositório foi chamado.
- Verifica que o output do caso de uso é igual à lista de trilhas publicadas (`publishedTrails`).

#### Lista de Trilhas Publicadas Vazia:

- Simula a ausência de trilhas publicadas no repositório.
- Verifica se o output é uma lista vazia quando não há trilhas publicadas.
- Confirma que o método `listPublished` do repositório foi chamado.

## DTOs

### ReadPublishedTrailsUseCaseOutputDTO

- **trails**: Trail[] - A lista de trilhas publicadas encontradas.

## Conclusão

A classe `ReadPublishedTrailsUseCase` é responsável pela leitura de todas as trilhas publicadas, garantindo a busca e retorno adequado dessas trilhas. Os testes unitários asseguram que o comportamento da classe esteja conforme esperado em diferentes cenários, incluindo casos onde há trilhas publicadas disponíveis e onde a lista está vazia.
