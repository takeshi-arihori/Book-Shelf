import type { FC } from 'react';
import BookManagerPage from './pages/BookManagerPage';
import ComputerBuilderPage from './pages/ComputerBuilderPage';
import { HomePage } from './pages/HomePage';

export interface RouteDefinition {
  path: string;
  name: string;
  component: FC;
  inNav: boolean; // ナビゲーションメニューに表示するかどうか
  index?: boolean; // これがインデックスルートかどうか
}

export const appRoutes: RouteDefinition[] = [
  { path: '/', name: 'Home', component: HomePage, inNav: true, index: true },
  { path: '/book', name: 'Book Manager', component: BookManagerPage, inNav: true },
  { path: '/computer-builder', name: 'Computer Builder', component: ComputerBuilderPage, inNav: true },
];
