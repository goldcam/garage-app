import { describe, it, expect } from 'vitest';
import {add} from '../math';

describe('add function', () => {
    it('adds two numbers', () => {
        const testAdd = add(1,2);
        expect(testAdd).toBe(3);
    });
});