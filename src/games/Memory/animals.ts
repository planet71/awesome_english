import uniqid from 'uniqid';

enum Animals {
    Dog = 'dog',
    Cat = 'cat',
}
const duplicatAndAddId = <C>(array: C[]) =>
    array.concat(
        array.map((element) => ({
            ...element,
            id: uniqid(),
        })),
    );

export const AnimalsCards = duplicatAndAddId(
    Object.values(Animals).map((animal) => ({
        name: animal,
        src: `/animals/${animal}.jpg`,
        id: uniqid(),
    })),
);
