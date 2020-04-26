import uniqid from 'uniqid';

enum Animals {
    Dog = 'dog',
    Cat = 'cat',
    Zebra = 'zebra',
    Giraffe = 'giraffe',
    Lion = 'lion',
    Fish = 'fish',
    Hamster = 'hamster',
    Horse = 'horse',
    Mouse = 'mouse',
    Parrot = 'parrot',
    Pig = 'pig',
    Squirrel = 'squirrel',
}
const duplicatAndAddId = <C>(array: C[]) =>
    array.concat(
        array.map((element) => ({
            ...element,
            id: uniqid(),
        })),
    );

export interface Card {
    name: string;
    src: string;
    id: string;
}

export const AnimalsCards: Card[] = duplicatAndAddId(
    Object.values(Animals).map((animal) => ({
        name: animal,
        src: `/animals/${animal}.jpg`,
        id: uniqid(),
    })),
);
