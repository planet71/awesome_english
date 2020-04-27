import React, { memo, useState, useEffect, CSSProperties } from 'react';
import styles from './Memory.module.scss';
import { Card as CardComponent } from '../../components/Card/Card';
import { shuffle } from 'lodash';
import { Card } from '../../domain/Card';
import { Uuid } from '../../domain/Uuid';

interface MemoryProps {
    deck: Card[];
}

interface Matched {
    [key: string]: boolean;
}

interface Active {
    id: Uuid;
    name: string;
}

type Actives = [Active?, Active?];

const MemoryComponent = ({ deck }: MemoryProps) => {
    const [actives, setActives] = useState<Actives>([]);
    const [matched, setMatch] = useState<Matched>({});
    const [name, sayName] = useState<string>();
    const [cards, setCards] = useState<Card[]>([]);
    const [gridStyles, setGridStyles] = useState<CSSProperties>({});

    useEffect(() => {
        setCards(shuffle(deck));
        setGridStyles(getStyles(deck));
    }, [deck]);

    useEffect(() => {
        if (hasActives(actives)) {
            const id = setTimeout(() => setActives([]), 1500);

            if (areActivesAMatch(actives)) {
                const firstActive = actives[0] as Active;
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
        <div className={styles.center}>
            <div className={styles.memory} style={gridStyles}>
                {cards.map(({ name, src, id }) => (
                    <CardComponent
                        key={id}
                        name={name}
                        src={src}
                        onClick={handleOnClick(actives, setActives, id, name)}
                        isActive={isActiveCard(actives, id)}
                        isMatched={isMatched(matched, name)}
                    />
                ))}
            </div>
        </div>
    );
};

const getStyles = (cards: Card[]) => {
    /**
     * Calculate card side based on viewport area.
     */
    const viewPortWidth = window.innerWidth;
    const viewPortHeight = window.innerHeight;
    const viewPortArea = viewPortHeight * viewPortHeight;
    const cardArea = viewPortArea / cards.length;
    const cardSide = Math.floor(Math.sqrt(cardArea));

    /**
     * Calculate rows and columns.
     */
    const rows = Math.floor(viewPortHeight / cardSide);
    const columns = Math.ceil(cards.length / rows);

    /**
     * Calculate grid gap.
     */
    const maxGridGap = 16;
    let rowsGridGap = (viewPortHeight - cardSide * rows) / rows;
    let columnsGridGap = (viewPortWidth - cardSide * columns) / columns;

    rowsGridGap = rowsGridGap > maxGridGap ? maxGridGap : rowsGridGap;
    columnsGridGap = columnsGridGap > maxGridGap ? maxGridGap : columnsGridGap;

    return {
        gridTemplateColumns: `repeat(${columns}, ${cardSide}px)`,
        gridTemplateRows: `repeat(${rows}, ${cardSide}px)`,
        gridGap: `${rowsGridGap}px ${columnsGridGap}px`,
    };
};

const handleOnClick = (actives: Actives, setActives: any, id: string, name: string) =>
    !hasActives(actives)
        ? () => {
              if (!hasActives(actives)) {
                  setActives(actives[0] ? [actives[0], { id, name }] : [{ id, name }]);
              }
          }
        : undefined;

const isActiveCard = (actives: Actives, id: string): boolean =>
    !!(actives[0] && actives[0].id === id) || !!(actives[1] && actives[1].id === id);

const hasActives = (actives: Actives): boolean => actives.length === 2;

const areActivesAMatch = (actives: Actives): boolean =>
    hasActives(actives) && actives[0]?.name === actives[1]?.name;

const isMatched = (matched: Matched, id: string): boolean => !!matched[id];

export const Memory = memo(MemoryComponent);
