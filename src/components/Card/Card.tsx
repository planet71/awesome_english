import React, { useState, memo } from 'react';
import styles from './Card.module.scss';
import pattern from '../../assets/patterns/bush.png';
import cx from 'classnames';

export interface CardProps {
    src: string;
    name: string;
    isActive: boolean;
    isMatched: boolean;
    onClick?(): void;
}

const CardComponent = ({ src, onClick, isActive, isMatched: isMatch }: CardProps) => {
    const [flipped, flip] = useState<boolean>(false);
    const onClickHandler =
        !isActive && !isMatch && onClick ? handleOnClick(onClick, flip) : undefined;

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

export const Card = memo(CardComponent);
