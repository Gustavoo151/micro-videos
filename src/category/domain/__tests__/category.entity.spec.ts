import { EntityValidationErrors } from '../../../shared/domain/validators/validation.error';
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../category.entity';

describe('Category Unit  Tests', () => {
  let validateSpy: any;
  beforeEach(() => {
    // Aqui eu quero que ele resete os dados do mock a cada teste
    validateSpy = jest.spyOn(Category, 'validate');
  });

  describe('constructor', () => {
    test('should create a category with default values', () => {
      let category = new Category({
        name: 'Movie',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    test('should create a  category  with all values', () => {
      const date = new Date();
      const category = new Category({
        name: 'Movie 2',
        description: 'Filme de ação',
        is_active: false,
        created_at: date,
      });
      expect(category.name).toBe('Movie 2');
      expect(category.description).toBe('Filme de ação');
      expect(category.is_active).toBeFalsy();
      expect(category.created_at).toBe(date);
    });

    test('shoul create a cateogory with name and  description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
      });
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('Movie description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe('create command', () => {
    test('shold create a category', () => {
      const category = Category.create({
        name: 'Movie',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1); // Verificando o validate foi realemente chamado dentro da entity category
    });

    test('shold create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'some description',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('some description');
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a category with is_active', () => {
      const cateogory = Category.create({
        name: 'Movie',
        is_active: false,
      });
      expect(cateogory.category_id).toBeInstanceOf(Uuid);
      expect(cateogory.name).toBe('Movie');
      expect(cateogory.description).toBeNull();
      expect(cateogory.is_active).toBeFalsy();
      expect(cateogory.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('category_id field', () => {
    type ArrangeProps = {
      category_id?: null | Uuid;
      id?: undefined | Uuid;
    };
    const arrange: ArrangeProps[] = [{ category_id: null }, { id: undefined }, { id: new Uuid() }];
    test.each(arrange)('id = %j', ({ category_id }) => {
      const category = new Category({
        name: 'Movie',
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if ((category_id as any) instanceof Uuid) {
        // Remover as any
        expect(category.category_id).toBe(category_id);
      }
    });
  });

  describe('Change Data', () => {
    test('should change name', () => {
      const category = Category.create({
        name: 'Movie',
      });
      category.changeName('other name');
      expect(category.name).toBe('other name');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should change description', () => {
      const category = Category.create({
        // Aqui eu estou usando o método factory da classe
        name: 'Movie',
      });
      category.changeDescription('Some description');
      expect(category.description).toBe('Some description');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('shold active a category', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false,
      });
      category.is_active = true;
      expect(category.is_active).toBeTruthy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should disable a category', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: true,
      });
      category.deactivate();
      expect(category.is_active).toBeFalsy();
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Category Validator', () => {
  describe('Create command', () => {
    test('xpto', () => {
      expect(() => {
        Category.create({
          name: null,
        });
      }).toThrow(
        new EntityValidationErrors({
          name: ['name is required'],
        })
      );
    });
  });
});
