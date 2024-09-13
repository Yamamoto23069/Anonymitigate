# ANONYMITIGATE
### Table of Contents
- [English Version](#english-version)
- [Japanese Version](#japanese-version)

## English Version
## Chat Application with Automatic Translation and Anonymous Messaging
This project is a chat application designed to solve communication issues in teams where members speak different languages and may feel shy about contributing in group discussions. It is ideal for environments such as gPBL programs, where students from SIT and HUST collaborate or any collaborative environment where language barriers or social anxieties hinder effective communication.

#### Key Features:
- **Automatic Translation:** Messages are automatically translated into the recipient's language, reducing the need to manually translate and resend the same message in multiple languages. This enhances the speed of information sharing.

- **Anonymous Messaging:**< Users can send messages anonymously, helping reduce the hesitation or embarrassment of speaking up. This is especially useful for shy members who are less likely to ask questions or contribute in open discussions.

#### Problem Solved:
- **Communication Delay:** By eliminating the manual translation process, the app speeds up communication between team members.
- **Lack of Participation:** The anonymous feature lowers the psychological barrier, encouraging more frequent and honest interactions within the group.

This app is useful not only for the target users in educational settings but also for broader applications where language and social dynamics might inhibit communication.

## Installation

1. Clone the repository from GitHub:

```
git clone https://github.com/Yamamoto23069/Anonymitigate.git
```
2. Install the required dependencies:

```
yarn install
```
Install the AWS SDK:

```
yarn add aws-sdk
```
3. Create an AWS account and retrieve your API keys. Replace the keys in the `aws-config.js` file.
```
// aws-config.js
import AWS from 'aws-sdk';
// Cấu hình AWS SDK
AWS.config.update({
  region: "YOUR_AWS_REGION", // Thay đổi theo khu vực của bạn
  credentials: new AWS.Credentials('YOUR_ACCESS_KEY_ID','YOUR_SECRET_ACCESS_KEY')
});
```
4. Run the project:
```
yarn start
```
## Usage

After installation, access the app by navigating to [http://localhost:3000](http://localhost:3000). Log in and start chatting with your team! 

## Japanese Version
### 自動翻訳と匿名メッセージング機能を備えたチャットアプリケーション
このプロジェクトは、異なる言語を話すメンバーがいるチームで、グループディスカッションに参加することをためらう状況を解決するために設計されたチャットアプリケーションです。SITとHUSTの学生が協力するgPBLプログラムのような環境、または言語の壁や社交的な不安が効果的なコミュニケーションを妨げる環境に最適です。

#### 主な機能:
- **自動翻訳:** メッセージは自動的に受信者の言語に翻訳され、同じメッセージを複数の言語で手動で翻訳して再送信する必要がなくなります。これにより、情報共有のスピードが向上します。

- **匿名メッセージング:** ユーザーは匿名でメッセージを送信でき、発言することへのためらいや恥ずかしさを減らします。これは、オープンなディスカッションで質問や意見を出すのに消極的なメンバーに特に有用です。

#### 解決される問題:
- **コミュニケーションの遅延:** 手動翻訳プロセスを排除することで、チームメンバー間のコミュニケーションがスピードアップします。
- **参加不足:** 匿名メッセージング機能により心理的な障壁が下がり、グループ内でより頻繁かつ率直な対話が促進されます。

このアプリは、教育現場での対象ユーザーにとってだけでなく、言語や社交的なダイナミクスがコミュニケーションを妨げる幅広いアプリケーションにも有用です。

## インストール方法

1. GitHubからリポジトリをクローンします:
```
git clone https://github.com/Yamamoto23069/Anonymitigate.git
```
2. 必要な依存関係をインストールします:

```
yarn install
```

AWS SDKをインストールします:


```
yarn add aws-sdk
```

3. AWSアカウントを作成し、APIキーを取得します。その後、`aws-config.js`ファイルのキーを置き換えてください。

```
// aws-config.js
import AWS from 'aws-sdk';
//  AWS SDKの設定
AWS.config.update({
  region: "YOUR_AWS_REGION", // 自分の地域に変更
  credentials: new AWS.Credentials('YOUR_ACCESS_KEY_ID','YOUR_SECRET_ACCESS_KEY')
});
```

4. プロジェクトを実行します:
```
yarn start
```

## 使い方
インストール後、[http://localhost:3000](http://localhost:3000) にアクセスして、ログインし、チームメンバーとチャットを始めてください！

