import { Uuid } from './Uuid';

export interface Card {
    name: string;
    src: string;
}

export type CardWithId = Card & { id: Uuid };
