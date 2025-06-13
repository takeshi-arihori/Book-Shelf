import React from 'react';
import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

export const Layout = ({ children }: { children: ReactNode }) => (
    <div className="min-h-screen bg-[#f1f5f9]">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
        </main>
    </div>
);
