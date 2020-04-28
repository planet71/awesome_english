import { Card } from '../domain/Card';

export const createDeckFrom = (array: string[], folder: string): Card[] =>
    array.map((element) => ({
        name: element,
        src: `${folder}/${element}.jpg`,
    }));

export enum Deck {
    Animals = 'Animals',
    Vegetables = 'Vegetables',
}
