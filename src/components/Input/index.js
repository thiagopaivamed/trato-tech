import { forwardRef } from 'react';
import styles from './Input.module.scss';

function Input({ value, onChange, ...outrasProps }, ref) {
    return (
        <input
            ref={ref}
            value={value}
            onChange={onChange}
            {...outrasProps}
            className={styles.input}
        />
    )
}

export default forwardRef(Input);