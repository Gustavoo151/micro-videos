import { Category } from "../category.entity"

describe('Category Unit  Tests', () => {
    test('constructor', () => {

        let category  = new Category({
            name: 'Movie',
        });
        expect(category.category_id).toBeUndefined();
        expect(category.name).toBe('Movie');
        expect(category.description).toBeNull();
        expect(category.is_active).toBeTruthy();
        expect(category.created_at).toBeInstanceOf(Date);

        const date = new  Date();
        category = new Category({
            name: 'Movie 2',
            description: 'Filme de ação',
            is_active: false,
            created_at: date
        });
        expect(category.name).toBe('Movie 2');
        expect(category.description).toBe('Filme de ação');
        expect(category.is_active).toBeFalsy();
        expect(category.created_at).toBe(date);
    }) 
})