import { ClassValidatorFields } from '../../domain/validators/class-validator-fields';
import { FieldsErrors } from '../../domain/validators/validator-fields-interface';
import { EntityValidationError } from '../../domain/validators/validation.error';

// Define um tipo que pode ser ou um objeto com validador e dados
// ou uma função que será executada durante o teste
type Expected =
  | {
      validator: ClassValidatorFields<any>; // Instância de um validador
      data: any; // Dados a serem validados
    }
  | (() => any); // Função que pode lançar exceção

// Estende a funcionalidade do Jest adicionando um matcher personalizado
expect.extend({
  // Cria o matcher 'containsErrorMessage' que verifica se os erros de validação
  // contêm as mensagens esperadas
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    // Caso 1: expected é uma função
    if (typeof expected === 'function') {
      try {
        expected(); // Tenta executar a função
        return isValid(); // Se não lançou exceção, o teste passa
      } catch (e) {
        // Se lançou exceção, verifica se contém as mensagens de erro esperadas
        const error = e as EntityValidationError;
        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      // Caso 2: expected é um objeto com validator e data
      const { validator, data } = expected;
      const validated = validator.validate(data); // Executa a validação

      if (validated) {
        return isValid(); // Se validação passou, o teste passa
      }
      // Retorna o resultado da validação falha
      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});

// Função auxiliar que verifica se os erros esperados estão contidos nos erros recebidos
function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors) {
  // Usa o matcher objectContaining para verificar correspondência parcial
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? isValid()
    : {
        // Se não corresponde, o teste falha com mensagem explicativa
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(
            received
          )}. Current: ${JSON.stringify(expected)}`,
      };
}

// Função auxiliar que retorna um objeto indicando que o teste passou
function isValid() {
  return { pass: true, message: () => '' };
}
