import React, { memo, useState, useEffect } from 'react';
import styles from './Memory.module.scss';
import { AnimalsCards } from './animals';
import { Card } from '../../components/Card/Card';

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
            }

            return () => clearTimeout(id);
        }
    }, [actives, matched]);

    return (
        <div className={styles.memory}>
            {AnimalsCards.map(({ name, src, id }) => (
                <Card
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
