import React from 'react';
import type { InputHTMLAttributes } from 'react';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className={`input input-bordered ${props.className ?? ''}`.trim()} />
);
