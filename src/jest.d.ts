import { FieldsErrors } from './shared/domain/validators/validator-fields-interface';
// Declara extensões para tipos globais
declare global {
  // Estende o namespace jest que contém as definições de tipos do Jest
  namespace jest {
    // Estende a interface Matchers do Jest, que define todos os matchers disponíveis
    // R é um tipo genérico que representa o tipo de retorno
    interface Matchers<R> {
      // Define um novo matcher personalizado chamado 'containsErrorMessage'
      // Este matcher aceita um parâmetro do tipo FieldsErrors e retorna R
      containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}
