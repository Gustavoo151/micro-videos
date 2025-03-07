import isEqual from "lodash/isEqual";

export abstract class ValueObject{
    public equals(vo: this): boolean {
        if(vo === null || vo === undefined){
            return false;
        }
        
        // Aqui eu comparo se o nome das duas classe são iguais
        if(vo.constructor.name !== this.constructor.name){
            return false;
        }

        return isEqual(vo, this);
    }
}