import React from 'react';
import { MemoryGame } from '../../games/Memory';
import { animals, vegetables } from '../../decks';

export const Memory = () => {
    return <MemoryGame deck={vegetables} />;
};
