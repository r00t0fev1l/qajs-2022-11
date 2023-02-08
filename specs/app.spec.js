import { nameIsValid, fullTrim, getTotal } from '../src/app.js'
import {test, expect, describe} from '@jest/globals';


describe("getTotal", () => {
    test.each([
        {items: [{ price: 10, quantity: 10 }], expected: 100},
        {items: [{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }], expected: 100},
        {items: [{ price: 10, quantity: 10 }], discount: 10, expected: 90},
        {items: undefined, discount: 10, expected: 0},
      ])('valid cart: %j', ({items, discount, expected}) => {
        expect(getTotal(items, discount)).toBe(expected);
      });
      
      test("throws error: discount must be number", () => {
        const items = [{ price: 10, quantity: 10 }];
        const discount = "10"
        expect(() => getTotal(items, discount)).toThrow();
      })
    
      test("throws error: discount must be positive", () => {
        const items = [{ price: 10, quantity: 10 }];
        const discount = -10
        expect(() => getTotal(items, discount)).toThrow();
      })
});

describe("nameIsValid", () => {
    test("name is null",  () => {
        expect(nameIsValid(null)).toBe(false);
      })
    
      test("name is less then 2 chars",  () => {
        expect(nameIsValid("A")).toBe(false);
      })
    
      test("name has space",  () => {
        expect(nameIsValid("John Carmack")).toBe(false);
      })
    
      test("name is valid",  () => {
        expect(nameIsValid("John")).toBe(true);
      })
});

describe("fullTrim", () => {
    test("string with space",  () => {
        expect(fullTrim(" John Doe ")).toBe("JohnDoe");
      })
    
      test("string without spaces",  () => {
        expect(fullTrim("John Doe")).toBe("JohnDoe");
      })
    
      test("string is null",  () => {
        expect(fullTrim(null)).toBe("");
      })
});






