import {offWordValidator, getOffWords} from '../src/helpers/offWordValidator';
import {text, textWithOffWords, offWords} from './offWords.fixture' 
describe('offWordValidator', () => {
    test('When function not match offWords in text', () => {
        expect(offWordValidator(text,offWords)).toStrictEqual([])
    });

});

describe('offWordValidator', () => {
    test('find offWords in text', () => {
        expect(offWordValidator(textWithOffWords,offWords)).toStrictEqual([
               "Mentecato = level:1",
             ])
    });

});