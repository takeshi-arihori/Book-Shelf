import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} className={`btn btn-primary ${props.className ?? ''}`.trim()}>
        {props.children}
    </button>
);
