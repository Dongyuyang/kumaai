# ニュース更新ガイド / News Update Guide

## 日本語

### ニュースの更新方法

1. `script.js`ファイルを開きます
2. ファイル上部の`newsData`オブジェクトを探します
3. 以下の形式で新しいニュースを追加します：

```javascript
const newsData = {
    "ja": {
        "news": [
            {
                "date": "2024-02-15",  // 日付（YYYY-MM-DD形式）
                "title": "ニュースタイトル",
                "url": "#"  // リンクがある場合はURLを入力、ない場合は"#"
            }
        ]
    },
    "en": {
        "news": [
            {
                "date": "2024-02-15",  // 同じ日付
                "title": "News Title in English",  // 英語のタイトル
                "url": "#"  // 同じURL
            }
        ]
    }
};
```

4. 新しいニュースは配列の先頭に追加してください
5. 必ず日本語版と英語版の両方を更新してください

### 注意事項
- 日付は必ず`YYYY-MM-DD`形式で入力してください
- 日本語版と英語版で同じ日付とURLを使用してください
- カンマとブレースの位置に注意してください

## English

### How to Update News

1. Open the `script.js` file
2. Find the `newsData` object at the top of the file
3. Add new news items in the following format:

```javascript
const newsData = {
    "ja": {
        "news": [
            {
                "date": "2024-02-15",  // Date in YYYY-MM-DD format
                "title": "Japanese Title",  // Title in Japanese
                "url": "#"  // Enter URL if there's a link, or "#" if none
            }
        ]
    },
    "en": {
        "news": [
            {
                "date": "2024-02-15",  // Same date
                "title": "English Title",  // Title in English
                "url": "#"  // Same URL
            }
        ]
    }
};
```

4. Add new items at the beginning of the array
5. Make sure to update both Japanese and English versions

### Important Notes
- Always use `YYYY-MM-DD` format for dates
- Use the same date and URL for both Japanese and English versions
- Pay attention to comma and brace placement

## Example / サンプル

```javascript
const newsData = {
    "ja": {
        "news": [
            {
                "date": "2024-02-15",
                "title": "新サービス開始のお知らせ",
                "url": "https://example.com/news/1"
            },
            {
                "date": "2024-02-01",
                "title": "会社設立のお知らせ",
                "url": "#"
            }
        ]
    },
    "en": {
        "news": [
            {
                "date": "2024-02-15",
                "title": "New Service Launch Announcement",
                "url": "https://example.com/news/1"
            },
            {
                "date": "2024-02-01",
                "title": "Company Establishment Announcement",
                "url": "#"
            }
        ]
    }
};
