
import { typeOf } from '../dist/index.js';



describe("fullstack-orm", () => {

    test('typeOf', () => {
        expect(typeOf('') ).toBe('string');
        expect(typeOf(1)).toBe('number');
        expect(typeOf(true)).toBe('boolean');
        expect(typeOf({})).toBe('object');
        expect(typeOf([])).toBe('array');
    });

});
