
import type { InputHTMLAttributes } from 'react';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className={`input input-bordered bg-white dark:bg-white text-black ${props.className ?? ''}`.trim()} />
);
