import React, { useState, memo } from 'react';
import styles from './Card.module.scss';
import pattern from '../../assets/patterns/bush.png';
import cx from 'classnames';

export interface CardProps {
    src: string;
    name: string;
    isActive: boolean;
    isMatch: boolean;
    onClick?(): void;
}

const CardComponent = ({ src, name, onClick, isActive, isMatch }: CardProps) => {
    const [flipped, flip] = useState<boolean>(false);

    return (
        <div
            onClick={handleOnClick(flip, onClick)}
            className={cx(styles.wrapper, {
                [styles.active]: flipped && isActive,
                [styles.match]: isMatch,
                [styles.hooverable]: onClick,
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

const handleOnClick = (flip: any, onClick?: () => void) =>
    onClick
        ? () => {
              onClick && onClick();
              flip(true);
          }
        : undefined;

export const Card = memo(CardComponent);
