import type { FC } from 'react';
import { HomePage } from './pages/HomePage';
import { MyBookshelfPage } from './pages/MyBookshelfPage';
import { BookDetailPage } from './pages/BookDetailPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

export interface RouteDefinition {
  path: string;
  name: string;
  component: FC;
  inNav: boolean; // ナビゲーションメニューに表示するかどうか
  index?: boolean; // これがインデックスルートかどうか
}

export const appRoutes: RouteDefinition[] = [
  { path: '/', name: 'Home', component: HomePage, inNav: true, index: true },
  { path: '/bookshelf', name: 'My Bookshelf', component: MyBookshelfPage, inNav: true },
  { path: '/book/:bookId', name: 'Book Detail', component: BookDetailPage, inNav: false },
  { path: '/login', name: 'Login', component: LoginPage, inNav: false },
  { path: '/signup', name: 'Sign Up', component: SignUpPage, inNav: false },
];
