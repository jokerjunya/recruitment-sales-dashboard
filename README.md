# 採用・営業ダッシュボード

CEOレベルの意思決定をサポートするための採用・営業データ可視化ダッシュボードです。

## 機能

### 売上データ
- 月次売上トレンドの表示（前年同月比・前月比）
- 事業部別（A, B, C）の売上比較
- CSVファイルからのデータインポート対応

### 採用データ
- 月次応募者数トレンドの表示
- 採用フローのコンバージョン率表示（応募者→面接→オファー→採用）
- 採用プロセスのボトルネック可視化

## 技術スタック

- **フロントエンド:** React + TypeScript + Vite
- **スタイリング:** Tailwind CSS
- **データ可視化:** Recharts
- **データ処理:** PapaParse（CSVインポート）

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## CSVデータフォーマット

### 売上データ
```
month,unitA,unitB,unitC,total,yoyGrowth,momGrowth
1月,120,80,60,260,5.2,1.2
...
```

### 採用データ
```
month,applicants,interviews,offers,hires
1月,150,75,30,25
...
```

## 今後の開発計画

1. データベース/API連携による自動データ更新
2. ユーザー認証機能の追加
3. カスタムレポート生成機能
4. モバイル対応の改善

## ライセンス

© 2024 リクルート ダッシュボード

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
