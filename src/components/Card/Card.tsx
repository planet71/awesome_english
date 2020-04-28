import cx from 'classnames';
import React, { memo, useEffect, useRef, useState } from 'react';

import pattern from '../../assets/patterns/bush.png';
import styles from './Card.module.scss';

export interface CardProps {
    src: string;
    name: string;
    isActive: boolean;
    isMatched: boolean;
    onClick?(): void;
}

const CardComponent = ({ name, src, onClick, isActive, isMatched: isMatch }: CardProps) => {
    const [flipped, flip] = useState<boolean>(false);
    const [isSaying, setIsSaying] = useState<boolean>(false);
    const speech = useRef(new SpeechSynthesisUtterance(name));
    const synth = useRef(window.speechSynthesis);

    const onClickHandler =
        !isActive && !isMatch && onClick
            ? handleOnClick(onClick, flip)
            : isMatch
            ? handleOnMatchedClick(speech.current, synth.current, isSaying, setIsSaying)
            : undefined;

    useEffect(() => {
        const speechRef = speech.current;
        speechRef.rate = 0.8;

        const stopSaying = () => setIsSaying(false);
        speechRef.addEventListener('end', stopSaying);

        return () => {
            speechRef.removeEventListener('end', stopSaying);
        };
    }, [isSaying]);

    return (
        <div
            onClick={onClickHandler}
            className={cx(styles.wrapper, {
                [styles.active]: flipped && isActive,
                [styles.match]: isMatch,
                [styles.hooverable]: !isActive && !isMatch && onClick,
            })}
        >
            <div
                className={styles.frontSide}
                style={{
                    backgroundImage: `url(${pattern})`,
                }}
            ></div>
            <div
                className={styles.backSide}
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '50%',
                }}
            ></div>
        </div>
    );
};

const handleOnClick = (onClick: () => void, flip: any) => () => {
    onClick();
    flip(true);
};

const handleOnMatchedClick = (
    speech: SpeechSynthesisUtterance,
    synth: SpeechSynthesis,
    isSaying: boolean,
    setIsSaying: any,
) => () => {
    if (!isSaying) {
        setIsSaying(true);
        synth.speak(speech);
    }
};

export const Card = memo(CardComponent);
