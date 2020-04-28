import { Dialog as DialogUI, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import React, { PropsWithChildren, useState } from 'react';

import styles from './Dialog.module.scss';

const Transition = React.forwardRef<unknown, TransitionProps>((props: unknown, ref) => (
    <Slide direction="up" {...props} ref={ref} />
));

const DialogComponent = ({ children }: PropsWithChildren<{}>) => {
    const [extended, toggleExtend] = useState<boolean>(false);
    const toggleSettings = () => toggleExtend(!extended);

    return extended ? (
        <DialogUI open={extended} TransitionComponent={Transition} className={styles.wrapper}>
            <div className={styles.dialog}>{children}</div>
            <div className={styles.close} onClick={toggleSettings} />
        </DialogUI>
    ) : (
        <div className={styles.button} onClick={toggleSettings} />
    );
};

export const Dialog = React.memo(DialogComponent);
