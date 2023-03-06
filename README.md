# Time Keeper

[![GitHub Pages Deployment](https://github.com/muneue-suwa/time-keeper/actions/workflows/gh-pages.yml/badge.svg?branch=release)](https://github.com/muneue-suwa/time-keeper/actions/workflows/gh-pages.yml)

学会 or 卒業・修士論文発表用タイマー

## 環境

本アプリは，PC版モダンブラウザ（Chrome, Edgeなど），iPad Safariでの使用を想定して製作されました．
また，以下の環境での動作を確認しております．

- OS: Windows 10 日本語版 21H2
- Google Chrome: 98.0.4758.82

## 使い方

基本的には，以下の手順で使用できる．

1. [muneue-suwa.github.io/time-keeper/](https://muneue-suwa.github.io/time-keeper/) を開く．
2. 簡易設定で，プリセットを選ぶか，Customを押した後に詳細設定からベルを鳴らす時間を選択する．ただし，3回目のベルが鳴るときにタイマーは終了することに留意する．
3. `Start`ボタンを押して，スタートする．
4. 3回目のベルと同時に，タイマーが狩猟する．途中で終了する場合は，`Stop`を押す．
5. 時間をリセットする場合は，`Reset`を押す．

### その他の機能

- `Copy time to Clipboard`をクリックすると，経過した時間をクリップボードにコピーできる．
- `Start`, `Stop`ボタンの代わりに，時間がかかれている部分をクリック（タップ）しても，開始・停止を行える．これは，iPadをはじめとする，タブレット端末での使用を想定して作成したものである．

## 開発者向け情報

### 環境

Windows Subsystem for Linux Version 2 (WSL2)を使用して製作された．

```bash:os-release
$ cat /etc/os-release
NAME="Ubuntu"
VERSION="20.04.3 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.3 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
```

### ESLintの設定方法

以下のコマンドを実行する．

```bash:npm-install
npm install
```

`npm` コマンドがインストールされていない場合は，[このサイト](https://github.com/nodesource/distributions/blob/master/README.md)などを参考にインストールする．

### ベルを鳴らす時間のプリセットの変更方法

以下の設定ファイルを変更する． `src/settings/time.json`
