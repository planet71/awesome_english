import uniqid from 'uniqid';
import { Card } from '../domain/Card';

import { Animal } from './animals';
import { Vegetable } from './vegetables';

const createDeckFrom = (array: string[], folder: string): Card[] =>
    [...array, ...array].map((element) => ({
        name: element,
        src: `/${folder}/${element}.jpg`,
        id: uniqid(),
    }));

const animals = createDeckFrom(Object.values(Animal), 'animals');
const vegetables = createDeckFrom(Object.values(Vegetable), 'vegetables');

export { animals, vegetables };
