# ReadNotPublishedTrailsUseCase

A classe `ReadNotPublishedTrailsUseCase` é responsável por ler todas as trilhas (`Trail`) que ainda não foram publicadas. Ela utiliza um repositório de trilhas que assina a interface `ITrailRepository` para buscar essas trilhas.

## Funcionamento

1. **Busca das Trilhas Não Publicadas**: O método `execute` utiliza o repositório (`trailRepository`) para listar todas as trilhas que ainda não foram publicadas.
2. **Criação do DTO de Saída**: Cria um objeto `ReadNotPublishedTrailsUseCaseOutputDTO` contendo a lista de trilhas não publicadas obtida.
3. **Saída**: Retorna o `ReadNotPublishedTrailsUseCaseOutputDTO` com as trilhas não publicadas.

## Testes Unitários para ReadNotPublishedTrailsUseCase

Os testes unitários garantem que o `ReadNotPublishedTrailsUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Lista de Trilhas Não Publicadas Encontrada:

- Verifica se a lista de trilhas não publicadas é retornada corretamente quando existem trilhas.
- Confirma que o método `listNotPublished` do repositório foi chamado.
- Verifica que o output do caso de uso é igual à lista de trilhas não publicadas (`notPublishedTrails`).

#### Lista de Trilhas Não Publicadas Vazia:

- Simula a ausência de trilhas não publicadas no repositório.
- Verifica se o output é uma lista vazia quando não há trilhas não publicadas.
- Confirma que o método `listNotPublished` do repositório foi chamado.

## DTOs

### ReadNotPublishedTrailsUseCaseOutputDTO

- **trails**: Trail[] - A lista de trilhas não publicadas encontradas.

## Conclusão

A classe `ReadNotPublishedTrailsUseCase` é responsável pela leitura de todas as trilhas não publicadas, garantindo a busca e retorno adequado dessas trilhas. Os testes unitários asseguram que o comportamento da classe esteja conforme esperado em diferentes cenários, incluindo casos onde há trilhas não publicadas disponíveis e onde a lista está vazia.
