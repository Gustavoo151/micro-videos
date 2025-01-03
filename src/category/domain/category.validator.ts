import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, validateSync } from "class-validator";
import { Category } from "./category.entity";

export class CatogoryRules{
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsOptional()
    description: string | null;

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;

    constructor({name, description, is_active}: Category){
        Object.assign(this, {name, description, is_active});
    }
}

class CategoryValidator {
    validate(entity: Category){
        validateSync
    }
}