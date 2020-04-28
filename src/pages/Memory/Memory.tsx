import { FormControl, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';

import { Dialog } from '../../components/Dialog';
import { createDeckFrom, Deck } from '../../decks';
import { Card } from '../../domain/Card';
import { MemoryGame } from '../../games/Memory';
import styles from './Memory.module.scss';

export const Memory = () => {
    const [deckName, setDeckName] = useState<string>();
    const [deckSize, setDeckSize] = useState<number>(8);
    const [deck, setDeck] = useState<Card[]>();
    const [decksImported, addImportedDeck] = useState<{ [key: string]: boolean }>({});

    const handleDeckNameChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setDeckName(event.target.value as string);
    };

    const handleDeckSizeChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setDeckSize(event.target.value as number);
    };

    useEffect(() => {
        if (deckName && !decksImported[deckName]) {
            import(`../../decks/${deckName}`).then((module) => {
                const deckFrom = createDeckFrom(module[deckName], deckName);
                addImportedDeck({ ...decksImported, [deckName]: true });
                setDeck(deckFrom);
            });
        }
    }, [deckName, decksImported]);

    return (
        <>
            <Dialog>
                <h1>Settings:</h1>
                <h2>Select deck:</h2>
                <FormControl>
                    <InputLabel id="settings-deck-name-label">Deck name</InputLabel>
                    <Select
                        labelId="settings-deck-name-label"
                        value={deckName || ''}
                        onChange={handleDeckNameChange}
                        className={styles.select}
                    >
                        {Object.values(Deck).map((name) => (
                            <MenuItem value={name} key={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="settings-deck-size-label">Deck size</InputLabel>
                    <Select
                        labelId="settings-deck-size-label"
                        value={deckSize || ''}
                        onChange={handleDeckSizeChange}
                        className={styles.select}
                        defaultChecked={true}
                    >
                        {Array.from(Array(31).keys())
                            .filter((i) => i - 4 > -1 && (i + 2) % 2 === 0)
                            .map((value) => (
                                <MenuItem value={value} key={value}>
                                    {value}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Dialog>
            {deck && <MemoryGame deck={deck} deckSize={deckSize} />}
        </>
    );
};
