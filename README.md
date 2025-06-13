# API 学習
API、サーバについてその仕組みを理解し、fetch 関数、Promise オブジェクト、JSON を使って情報を取得する方法を学習

## Library Application

## Computer Builder
コンピュータを作るアプリケーションを作成するプロジェクト
異なるパーツを選択し、それらがどのような性能を持つコンピュータを作り出すかをシミュレートする

# Computer Builder プロジェクト仕様書

## 概要
APIやサーバの仕組みを理解し、fetch関数・Promise・JSONを活用した情報取得を学ぶための学習用アプリケーションです。主に「コンピュータを作る」シミュレーションアプリと、API学習用のライブラリアプリを含みます。

## 技術スタック
- React 19
- TypeScript
- Vite
- Tailwind CSS
- daisyUI
- Redux Toolkit
- Axios
- ESLint

## ディレクトリ構成（tree形式）

```
api/
  ├── index.ts
  └── orderApi.ts
public/
  └── vite.svg
src/
  ├── App.css
  ├── App.tsx
  ├── index.css
  ├── main.tsx
  ├── vite-env.d.ts
  ├── assets/
  │   └── react.svg
  ├── components/
  │   ├── Nav.tsx
  │   ├── common/
  │   │   ├── Header.tsx
  │   │   └── Layout.tsx
  │   └── ui/
  │       ├── Button.tsx
  │       ├── Input.tsx
  │       └── Modal.tsx
  ├── hooks/
  │   └── useAuth.ts
  ├── layouts/
  ├── lib/
  │   └── utils.ts
  ├── pages/
  │   ├── About.tsx
  │   ├── Builder.tsx
  │   ├── Home.tsx
  │   ├── LibraryApp.tsx
  │   ├── LoginPage.tsx
  │   ├── NotFoundPage.tsx
  │   └── OrderFormPage.tsx
  ├── store/
  │   ├── store.ts
  │   └── slices/
  │       └── authSlice.ts
  ├── types/
  │   ├── api.ts
  │   └── index.ts
  └── utils/
```

その他:
- vite.config.ts
- package.json
- README.md
- tsconfig.json など

## 機能概要
- コンピュータのパーツ選択・性能シミュレーション
- API/Promise/JSONの学習用サンプル
- 認証・注文フォーム・404ページ等のサンプル実装

---
この構成をベースに、各種機能を拡張・実装していきます。
