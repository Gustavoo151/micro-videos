import { InvalidUuidError, Uuid } from "../value-objects/uuid.vo";
import { validate as uuidValidate, validate} from "uuid";

describe("Uuid unit Tests", () => {

    const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');

    test("should trhow error when uuid is invalid", () => {
        expect(() => {
            new Uuid('invalid-uuid');
        }).toThrowError(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);  // Verificando quantas vezes o método validade foi chamado
    });

    test('should create a valid uuid',  ()=>  {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidValidate(uuid.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);  
    });

    test('should accept a valid uuid', () => {
        const uuid = new Uuid('f47ac10b-58cc-4372-a567-0e02b2c3d479');
        expect(uuid.id).toBe('f47ac10b-58cc-4372-a567-0e02b2c3d479');
        expect(validateSpy).toHaveBeenCalledTimes(1);  
    });
});