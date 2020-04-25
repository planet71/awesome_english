enum Animals {
    Dog = 'dog',
    Dog2 = 'dog',
    Cat = 'cat',
    Cat2 = 'cat',
}

export const AnimalsCards = Object.values(Animals).map((animal) => ({
    name: animal,
    src: `/animals/${animal}.jpg`,
}));
