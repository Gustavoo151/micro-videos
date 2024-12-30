import { Category } from "../category.entity"

describe('Category Unit  Tests', () => {
    describe("constructor", () =>{
        test('should create a category with default values', () => {
            let category  = new Category({
                name: 'Movie',
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test("should create a  category  with all values", () => {
            const date = new  Date();
            const category = new Category({
                name: 'Movie 2',
                description: 'Filme de ação',
                is_active: false,
                created_at: date
            });
            expect(category.name).toBe('Movie 2');
            expect(category.description).toBe('Filme de ação');
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(date);
        });

        test("shoul create a cateogory with name and  description", () => {
            const category = new Category({
                name: "Movie",
                description: "Movie description"
            });
            expect(category.name).toBe("Movie");
            expect(category.description).toBe("Movie description");
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
    });

    describe("create command", () => {
        test("shold create a category", () => {
            const category = new Category({
                name: "Movie"
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
       
        test("shold create a category with description", () => {
            const category = new Category({
                name: "Movie",
                description: "some description"
            });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBe("some description");
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test("should create a category with is_active", () => {
            const cateogory = new Category({
                name: "Movie",
                is_active: false
            });
            expect(cateogory.category_id).toBeUndefined();
            expect(cateogory.name).toBe("Movie");
            expect(cateogory.description).toBeNull();
            expect(cateogory.is_active).toBeFalsy();
            expect(cateogory.created_at).toBeInstanceOf(Date);
        });
    });

    describe("Change Data", () => {
        test("should change name", () => {
            const category = Category.create({
                name: "Movie",
            });
            category.changeName("other name");
            expect(category.name).toBe("other name");   
        });
        
        test("should change description", () => {
            const category = Category.create({  // Aqui eu estou usando o método factory da classe
                name: "Movie"
            });
            category.changeDescription("Some description");
            expect(category.description).toBe("Some description");
        });
        
        test("shold active a category", () => {
            const category = Category.create({ 
                name: "Movie",
                is_active: false
            });
            category.is_active = true;
            expect(category.is_active).toBeTruthy();
        });

        test("should disable a category", () => {
            const category = Category.create({
                name: "Movie",
                is_active: true
            });
            category.deactivate();
            expect(category.is_active).toBeFalsy();
        })
    });
})