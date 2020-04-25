import React, { useState, memo } from 'react';
import styles from './Card.module.scss';
import pattern from '../../assets/patterns/bush.png';
import cx from 'classnames';

export interface CardProps {
    src: string;
    name: string;
    onClick(name: string): void;
    isActive: boolean;
    isMatch: boolean;
}

const CardComponent = ({ src, name, onClick, isActive, isMatch }: CardProps) => {
    const [flipped, flip] = useState<boolean>(false);

    return (
        <div
            onClick={() => {
                if (!isMatch) {
                    onClick(name);
                    flip(true);
                }
            }}
            className={cx(styles.wrapper, {
                [styles.active]: flipped && isActive,
                [styles.match]: isMatch,
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

export const Card = memo(CardComponent);
