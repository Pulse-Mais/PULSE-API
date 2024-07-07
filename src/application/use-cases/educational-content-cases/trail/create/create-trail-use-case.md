# CreateTrailUseCase

A classe `CreateTrailUseCase` é responsável por criar uma nova trilha (`Trail`). Ela utiliza um repositório de trilhas que assina a interface `ITrailRepository` para persistir a trilha criada.

## Funcionamento

1. **Entrada**: O método `execute` recebe um objeto `CreateTrailInputDTO`, que contém as informações necessárias para criar a trilha (título, subtítulo e descrição).
2. **Criação da Trilha**: Utiliza o `TrailDomainService` para criar uma nova instância de `Trail` com base no DTO de entrada.
3. **Persistência da Trilha**: A nova trilha é salva no repositório através do método `save` do `trailRepository`.
4. **Validação do Salvamento**: Se a trilha não for salva corretamente, é lançada uma exceção `TrailClassNotSavedOnRepositoryApplicationException`.
5. **Saída**: Retorna um `CreateTrailOutputDTO` contendo a trilha salva.

## Exceções

- **TrailClassNotSavedOnRepositoryApplicationException**: Lançada se a trilha não for salva corretamente no repositório.

## DTOs

### CreateTrailInputDTO

```typescript
export interface CreateTrailInputDTO {
    title: string;
    subtitle: string;
    description: string;
}

export interface CreateTrailOutputDTO {
    trail: Trail;
}
```

## Testes Unitários para CreateTrailUseCase

Os testes unitários garantem que o `CreateTrailUseCase` funcione conforme esperado.

### Descrição dos Testes

#### Criação de Trilha Válida:

- Verifica se a trilha é criada corretamente.
- Confirma que o método `save` do repositório foi chamado.
- Verifica que o serviço de armazenamento (`mockStorageService.createTrailFolder`) foi chamado.

#### Falha ao Salvar Trilha:

- Simula uma falha no salvamento da trilha.
- Verifica se a exceção `TrailClassNotSavedOnRepositoryApplicationException` é lançada corretamente.

#### Validação de Input Inválido:

- Testa vários cenários de entrada inválida (título, subtítulo ou descrição vazios).
- Verifica se uma exceção é lançada para cada cenário de entrada inválida.

## Conclusão

A classe `CreateTrailUseCase` é responsável pela criação e persistência de novas trilhas, com validação de entrada e tratamento de erros adequado. Os testes unitários garantem que o comportamento da classe esteja conforme esperado em diferentes cenários, incluindo casos de sucesso e falha.

