---
sidebar_position: 9
---

# ホワイトラベルセットアップ

:::info 年間サブスクリプションが必要
ホワイトラベル機能は、**年間サブスクリプション**ユーザー専用です。年間プランを購入した後、[Telegram](https://t.me/tikmatrix_agent_bot)経由でサポートチームに連絡してアンロックコードを取得してください。
:::

ホワイトラベル機能を使用すると、TikMatrixのブランディングをカスタマイズして、会社のアイデンティティに合わせることができます。アプリ名、ロゴ、ブランド情報を変更して、パーソナライズされたバージョンのTikMatrixを作成できます。

## 機能

### 基本設定

- **アプリ名**：アプリケーションの表示名をカスタマイズ
- **ロゴアップロード**：カスタムメインロゴをアップロード（推奨128x128px）
- **ファビコン**：アプリケーションのカスタムファビコンを設定

### ブランド設定

- **サポートメール**：カスタマーサポートのメールアドレス
- **チュートリアルURL**：カスタムチュートリアル/ドキュメントリンク
- **Telegram URL**：Telegramグループまたはチャンネルリンクを設定

### 機能トグル

- **チュートリアルリンクを表示**：チュートリアルリンクの表示を制御
- **ブランド情報を表示**：ブランド情報の表示を制御

## セットアップ方法

### 方法1：UI設定

1. TikMatrixアプリケーションを起動します
2. タイトルバーのパレットアイコン🎨をクリックします
3. ホワイトラベル設定ダイアログでパラメータを設定します：
   - **アプリ名**：カスタムアプリケーション名を入力
   - **メインロゴ**：ロゴファイルをアップロード（PNG/JPG、128x128px推奨）
   - **サポートメール**：サポートメールアドレスを入力
   - **チュートリアルURL**：カスタムチュートリアルURLを入力
   - **Telegram URL**：Telegramグループ/チャンネルURLを入力
   - **機能トグル**：チュートリアルリンクとブランド情報の表示を有効/無効にする
4. 「保存」をクリックして設定を適用します

### 方法2：設定ファイル

1. サンプル設定ファイルをコピーします：

   ```bash
   cp examples/whitelabel-config.json src/config/whitelabel-custom.json
   ```

2. 設定ファイルを編集します：

   ```json
   {
     "appName": "Your App Name",
     "logo": {
       "main": "/path/to/your/logo.webp",
       "favicon": "/path/to/your/favicon.ico"
     },
     "brand": {
       "supportEmail": "support@yourcompany.com",
       "tutorialUrl": "https://yourcompany.com/docs",
       "telegramUrl": "https://t.me/yourgroup"
     },
     "features": {
       "showTutorialLink": true,
       "showBrandInfo": true
     }
   }
   ```

3. ファイルを保存してアプリケーションを再起動します

### 方法3：コマンドラインツール

1. プロジェクトディレクトリに移動します：

   ```bash
   cd tikmatrix-desktop
   ```

2. 設定ツールを実行します：

   ```bash
   node scripts/whitelabel-config.js
   ```

3. プロンプトに従って各パラメータを段階的に設定します

## カスタムバージョンのビルド

### 1. リソースファイルの準備

```bash
# ロゴファイルを正しい場所に配置
src/assets/your-logo.webp       # メインロゴ
public/your-favicon.ico        # Webファビコン
src-tauri/icons/               # アプリケーションアイコン（各種サイズ）
```

### 2. ビルドパラメータの設定

コマンドラインツールを使用するか、設定を手動で編集します：

```bash
# コマンドラインツールを使用
node scripts/whitelabel-config.js

# または手動で編集
src/config/whitelabel-build.json
```

### 3. アプリケーションのビルド

```bash
# 開発モード
npm run dev

# プロダクションビルド
npm run build

# Tauriアプリケーションのビルド
npm run tauri build
```

## 設定の優先順位

システムは、設定に次の優先順位を使用します：

1. **ランタイム設定**：ブラウザLocalStorage `whitelabel_config`
2. **ビルド設定**：`src/config/whitelabel-build.json`（ビルド時に使用）
3. **サンプル設定**：`examples/whitelabel-config.json`
4. **デフォルト設定**：組み込みのデフォルト値

## ロゴの要件

### メインロゴ

- **形式**：PNG、JPG、またはSVG
- **サイズ**：128x128px（推奨）
- **背景**：透明（PNGの場合）
- **用途**：ヘッダー、スプラッシュ画面、アバウトダイアログ

### ファビコン

- **形式**：ICOまたはPNG
- **サイズ**：32x32pxまたは16x16px
- **用途**：ブラウザタブ、ウィンドウアイコン

### アプリケーションアイコン（ビルド用）

- **形式**：PNG、ICO、ICNS
- **サイズ**：32x32、128x128、256x256、512x512
- **場所**：`src-tauri/icons/`ディレクトリ

## API統合

### JavaScript API

```javascript
import { 
  getWhiteLabelConfig,
  saveWhiteLabelConfig, 
  resetWhiteLabelConfig,
  validateWhiteLabelConfig 
} from './config/whitelabel.js';

// 現在の設定を取得
const config = getWhiteLabelConfig();

// 新しい設定を保存
saveWhiteLabelConfig(newConfig);

// デフォルトにリセット
resetWhiteLabelConfig();

// 設定を検証
validateWhiteLabelConfig(config);
```

### ユーティリティ関数

```javascript
import { 
  initWhiteLabel,
  updateDocumentTitle,
  updateFavicon
} from './utils/whitelabel.js';

// アプリ起動時にホワイトラベルを初期化
initWhiteLabel();

// ドキュメントタイトルを更新
updateDocumentTitle('Your App Name');

// ファビコンを更新
updateFavicon('/path/to/favicon.ico');
```

## ベストプラクティス

### ロゴデザイン

- 鮮明な表示のために高解像度画像を使用
- すべてのロゴサイズで一貫したブランディングを維持
- 明るい背景と暗い背景の両方でロゴをテスト
- ロゴが小さいサイズでも読みやすいことを確認

### ブランドの一貫性

- 全体で一貫した色とフォントを使用
- 既存のブランドガイドラインに沿う
- さまざまな画面サイズでカスタマイズされたインターフェイスをテスト
- プロフェッショナルな外観を維持

### URL設定

- すべての外部リンクにHTTPS URLを使用
- デプロイ前にすべてのリンクをテスト
- サポートチャネルが適切に監視されていることを確認
- ドキュメントURLを最新の状態に保つ

## トラブルシューティング

### 一般的な問題

**ロゴが表示されない：**

- ファイルパスとパーミッションを確認
- 画像形式がサポートされていることを確認
- 画像サイズが適切であることを確認
- ブラウザキャッシュをクリアしてアプリを再起動

**設定が保存されない：**

- ファイルシステムのパーミッションを確認
- JSON構文が正しいことを確認
- 設定ディレクトリが存在することを確認
- 管理者として実行してみる（必要な場合）

**ビルドに失敗する：**

- すべてのリソースファイルが存在することを確認
- 設定ファイルの構文を確認
- アイコンファイルが正しい形式であることを確認
- 具体的なエラーについてはビルドログを確認

### サポートを受ける

ホワイトラベルのセットアップで問題が発生した場合：

1. 上記のトラブルシューティングセクションを確認
2. 設定ファイルの構文を確認
3. [Telegram](https://t.me/tikmatrix_agent_bot)経由でサポートに連絡
4. 問題を報告する際は、設定ファイルとエラーメッセージを含める

## ライセンスと使用

- ホワイトラベル機能は年間サブスクリプションユーザーのみが利用可能
- カスタムブランディング権はサブスクリプションに含まれます
- カスタマイズされたバージョンの再配布には追加のライセンスが必要な場合があります
- エンタープライズライセンスオプションについては、サポートに連絡してください

---

**アンロックコードが必要ですか？** 年間サブスクリプションの詳細を添えて、[Telegram](https://t.me/tikmatrix_agent_bot)経由でサポートチームに連絡してください。
