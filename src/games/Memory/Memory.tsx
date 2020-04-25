import React, { memo, useState, useEffect } from 'react';
import styles from './Memory.module.scss';
import { AnimalsCards } from './animals';
import { Card } from '../../components/Card/Card';

interface Matches {
    [key: string]: boolean;
}

const MemoryComponent = () => {
    const [actives, setActives] = useState<string[]>([]);
    const [matched, setMatch] = useState<Matches>({});

    useEffect(() => {
        if (!matched[actives[0]] && actives[1] && actives[0] === actives[1]) {
            setMatch({
                ...matched,
                [actives[0]]: true,
            });
        }

        if (actives.length === 2) {
            const id = setTimeout(() => setActives([]), 1500);
            return () => clearTimeout(id);
        }
    }, [actives, matched]);
    return (
        <div className={styles.memory}>
            {AnimalsCards.map(({ name, src }, index) => (
                <Card
                    key={`${name}-${index}`}
                    name={name}
                    src={src}
                    onClick={(name: string) => {
                        setActives([...actives, name]);
                    }}
                    isActive={actives.includes(name)}
                    isMatch={matched[name]}
                />
            ))}
        </div>
    );
};

export const Memory = memo(MemoryComponent);
