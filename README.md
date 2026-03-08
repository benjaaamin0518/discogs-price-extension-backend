# discogs-price-extension-backend

<p align="center">
  <img src="logo.png" height="250px">
</p>
このプロジェクトは、Electronベースのバックエンドアプリケーションで、Discogs（ディスコグス）の価格拡張機能を提供します。主に、Vinylレコードのメタデータ抽出、Electronの特性を活かしたスクレイピング、Google Gemini AIとの統合を行います。

## 実際の動作

![alt text](demo.gif)

## 機能

- **Electronアプリケーション**: クロスプラットフォームのデスクトップアプリケーションとして動作します。
- **API処理**:
  - Google Gemini AIを使用したVinylレコードのメタデータ抽出。
  - ElectronのChromiumベースのブラウザエンジンを活用したウェブスクレイピング。
  - Expressサーバーを介したAPIエンドポイント（例: `/api/v1/gemini`）。
- **スクレイピングキュー**: ScrapeQueueクラス（Electronの特性を活かして）で並列スクレイピングを管理。
- **環境設定**: .envファイルを使用してAPIキーや設定を管理。

## インストール

1. リポジトリをクローンします。

   ```
   git clone <repository-url>
   cd discogs-price-extension-backend
   ```

2. 依存関係をインストールします。

   ```
   npm install
   ```

3. 環境変数を設定します。`.env`ファイルを作成し、以下の変数を設定してください。
   ```
   REACT_APP_GEMINI_API_KEY=your-gemini-api-key
   REACT_APP_ACCESS_TOKEN=your-access-token
   REACT_APP_POOL_SIZE=5
   ```

## 開発

開発サーバーを起動するには、以下のコマンドを実行します。

```
npm run dev
```

バックエンドのみをビルドして実行するには:

```
npm run build-backend
npm run serve-backend
```

## ビルド

### 一般ビルド

TypeScriptをコンパイルしてViteでビルド:

```
npm run build
```

### Electronアプリケーションのビルド

Electronアプリケーションを各プラットフォーム向けにビルドします。ビルド前にTypeScriptをコンパイルしてください。

#### macOS (ARM64)

```
npm run build-electron-mac
```

#### Windows (x64)

```
npm run build-electron-win
```

#### Linux (x64)

```
npm run build-electron-linux
```

ビルドされたアプリケーションは、`electron-discogs-price-extension-<platform>-<arch>/`ディレクトリに配置されます。

### Webpackビルド

本番環境向けのWebpackビルド:

```
npm run build:webpack
```

## 使用方法

アプリケーションを起動するには:

```
npm run start
```

これにより、Electronウィンドウが開き、バックエンドAPIサーバーが起動します。

APIエンドポイントの例:

- `POST /api/v1/gemini`: Gemini AIを使用してメタデータを抽出。

## プロジェクト構造

- `src/backend/`: バックエンドコード
  - `main.ts`: Electronメインエントリーポイント
  - `electronServer.ts`: ExpressサーバーとAPI処理
  - `NeonApi.ts`: Gemini AI統合
  - `playwrightScrapeQueue.ts`: スクレイピングキュー
  - `scrapeQueue.ts`: Electronの特性を活かしたスクレイピングキュー
  - `server.ts`: サーバー関連
  - `type/`: 型定義ディレクトリ
- `dist/`: ビルド出力
- `electron-discogs-price-extension-<platform>-<arch>/`: プラットフォーム別ビルド済みアプリケーション

## 依存関係

主要な依存関係:

- Electron: デスクトップアプリケーション
- Express: APIサーバー
- Playwright: ウェブスクレイピング
- @google/genai: Gemini AI API
- React, TailwindCSS: フロントエンド（該当する場合）

## GCP VM Setup (Node.js + Electron + PM2)

このドキュメントでは、Google Cloud Platform (GCP) の **Compute Engine VM** 上で以下をセットアップする手順を説明します。

- 最新 Node.js のインストール
- Electron アプリの Linux ビルド
- PM2 による常駐化
- VM 再起動後も自動起動

対象OS

Ubuntu 22.04

---

### 1 VMにSSH接続

GCP Console

Compute Engine
↓
VM インスタンス
↓
SSH

またはCLI

```bash
gcloud compute ssh <ユーザーID>@<インスタンス名> --project=<プロジェクトID> --zone=<ゾーン>
```

### 2 システム更新

```bash
sudo apt update
sudo apt upgrade -y
```

###3 最新 Node.js インストール

NodeSource を使用

```bash
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt install -y nodejs
```

確認

```bash
node -v
npm -v
```

### 4 必要パッケージインストール

Electron をヘッドレス環境で動作させるための依存パッケージ

```bash
sudo apt install -y \
git \
xvfb \
libnss3 \
libatk-bridge2.0-0 \
libgtk-3-0 \
libx11-xcb1 \
libxcomposite1 \
libxdamage1 \
libxrandr2 \
libgbm1 \
libasound2
```

### 5 リポジトリ取得

```bash
git clone https://github.com/benjaaamin0518/discogs-price-extension-backend.git
cd discogs-price-extension-backend
```

### 6 依存関係インストール

```bash
npm install
```

### 7 Electron Linux ビルド

```bash
npm run build-electron-linux
```

ビルド後

ディレクトリ内に実行ファイルが作成されます

例
`electron-discogs-price-extension-<platform>-<arch>`

### 8 PM2 インストール

```bash
sudo npm install -g pm2
```

### 9 Electron アプリ起動

GUI環境がないため xvfb-run を使用

```bash
 pm2 start "xvfb-run ./electron-discogs-price-extension" --name discogs-app
```

### 10 PM2 状態確認

```bash
pm2 status
```

ログ確認

```bash
pm2 logs discogs-app
```

### 11 再起動後も自動起動

PM2 を systemd に登録

```bash
pm2 startup
```

表示されたコマンドを実行

例
`sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u <ユーザーID> --hp /home/<ユーザーID>`

設定保存

```bash
pm2 save
```

### 12 動作確認

VMを再起動

```bash
sudo reboot
```

再接続後

```bash
pm2 status
```

Electronプロセスが自動起動していれば成功です。

便利コマンド
再起動

```bash
pm2 restart discogs-app
```

停止

```bash
pm2 stop discogs-app
```

削除

```bash
pm2 delete discogs-app
```

ログ確認

```bash
pm2 logs discogs-app
```
