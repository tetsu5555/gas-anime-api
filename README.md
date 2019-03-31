# 仕様
- 公開→webアプリケーションとして公開をしてURLを手に入れる
- 手に入れたURLにクエリパラーメータをつけるとレスポンス帰って来る

# GET
### ?table=anime
アニメの情報が10件返って来る

## ?table=anime&id=1
idに渡す数字は何でもよい
idに対応するアニメがあれば詳細を返す

## ?table=review
レビュー一覧を返す

# POST
anime_id(int)とreview(string)をリクエストのbodyに入れてリクエストする
クエリパラーメータはつかなくて良い

# スプレッドシートデータの作成
以下のレポジトリにあるスクリプトを使って作成した
https://github.com/tetsu5555/scrape_animelist

# memo

```
curl -L  https://script.google.com/macros/s/AKfycbzCEZxrl4kCPU7WhOYwU_FlPJx_Domy95PCjTTJkbUamhNu6JOX/exec?table=anime
```

curlする場合は -Lオプションをつけることで実行できた。
-Lオプションは、--locationオプションで
リダイレクト設定されている URL にアクセスした時、リダイレクト先の URL に対してのリクエストを再度発行してくれる。