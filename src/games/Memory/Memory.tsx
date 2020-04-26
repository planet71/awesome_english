import React, { memo, useState, useEffect } from 'react';
import styles from './Memory.module.scss';
import { AnimalsCards, Card } from './animals';
import { Card as CardComponent } from '../../components/Card/Card';
import { shuffle } from 'lodash';

interface Matches {
    [key: string]: boolean;
}

interface Active {
    [key: string]: string;
}

type Actives = [Active?, Active?];

const MemoryComponent = () => {
    const [actives, setActives] = useState<Actives>([]);
    const [matched, setMatch] = useState<Matches>({});
    const [name, sayName] = useState<string>();
    const [cards, setCards] = useState<Card[]>(AnimalsCards);
    useEffect(() => {
        setCards(shuffle(AnimalsCards));
    }, []);
    useEffect(() => {
        const firstActive = actives[0];
        const secondActive = actives[1];

        if (firstActive && secondActive) {
            const id = setTimeout(() => setActives([]), 1500);

            if (firstActive.name === secondActive.name && !matched[firstActive.name]) {
                clearTimeout(id);
                setActives([]);
                setMatch({
                    ...matched,
                    [firstActive.name]: true,
                });
                sayName(firstActive.name);
            }

            return () => clearTimeout(id);
        }
    }, [actives, matched]);

    useEffect(() => {
        if (name) {
            const synth = window.speechSynthesis;
            synth.speak(new SpeechSynthesisUtterance(name));
        }
    }, [name]);
    return (
        <div className={styles.memory} style={getStyles(cards)}>
            {cards.map(({ name, src, id }) => (
                <CardComponent
                    key={id}
                    name={name}
                    src={src}
                    onClick={handleOnClick(actives, setActives, id, name, matched[name])}
                    isActive={isActiveCard(actives, id)}
                    isMatch={matched[name]}
                />
            ))}
        </div>
    );
};

const getStyles = (cards: Card[]) => {
    /**
     * Calculate card side based on viewport area.
     */
    const viewPortHeight = window.innerHeight;
    const viewPortArea = viewPortHeight * viewPortHeight;
    const cardArea = viewPortArea / cards.length;
    const cardSide = Math.floor(Math.sqrt(cardArea));

    const rows = Math.floor(viewPortHeight / cardSide);
    let columns = Math.ceil(cards.length / rows);

    return {
        gridTemplateColumns: `repeat(${columns}, ${cardSide}px)`,
        gridTemplateRows: `repeat(${rows}, ${cardSide}px)`,
    };
};

const handleOnClick = (
    actives: Actives,
    setActives: any,
    id: string,
    name: string,
    isMatch: boolean,
) =>
    !isActiveCard(actives, id) && actives.length < 2 && !isMatch
        ? () => {
              setActives(actives[0] ? [actives[0], { id, name }] : [{ id, name }]);
          }
        : undefined;

const isActiveCard = (actives: Actives, id: string): boolean =>
    !!(actives[0] && actives[0].id === id) || !!(actives[1] && actives[1].id === id);

export const Memory = memo(MemoryComponent);
