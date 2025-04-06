import { IRepository } from "../../shared/domain/repository/repository-interface";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./category.entity";

// Os repository estão preocupados apenas com armazenamento e não regras de negócio, por exemplo um método ChangeName não pode está aqui pq é regra de negócio
export interface ICategoryRepository extends IRepository<Category, Uuid>{
    
}