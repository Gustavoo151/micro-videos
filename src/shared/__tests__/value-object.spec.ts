import { ValueObject } from "../domain/value-object";

// Exemplo de objeto de valor
class StringValueObject extends ValueObject{
    constructor(readonly value: string){
        super();
    }
}

// Exemplo de objeto de valor mais complexo
class ComplexValueObject extends ValueObject {
    constructor(readonly props1: String, readonly props2: number){
        super();
    }
}


describe("Value Object Unit Tests", () => { 
    test("should be equals", () => { 
        const valueObject1 =  new StringValueObject('test');
        const valueObject2 =  new StringValueObject('test');
        expect(valueObject1.equals(valueObject2)).toBeTruthy();  
    });

    test("should not be equals", () => { 
        const valueObject1 =  new StringValueObject('test');
        const valueObject2 =  new StringValueObject('test1');
        expect(valueObject1.equals(valueObject2)).toBeFalsy();
        expect(valueObject1.equals(null as any)).toBeFalsy();
        expect(valueObject1.equals(undefined as  any)).toBeFalsy();
        
    });

    test("shold be equals", () => {
        const complexValueObject1 = new ComplexValueObject("test", 1);
        const complexValueObject2 = new ComplexValueObject("test", 1);
        expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy();
        expect(complexValueObject1.equals(null as any)).toBeFalsy();
        expect(complexValueObject2.equals(undefined as  any)).toBeFalsy();
    });

    test("shold not be equals", () => {
        const complexValueObject1 = new ComplexValueObject("test", 1);
        const complexValueObject2 = new ComplexValueObject("test", 2);
        expect(complexValueObject1.equals(complexValueObject2)).toBeFalsy();
    })

});
