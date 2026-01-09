# WeChat Article Exporter API Usage

This guide describes how to use the HTTP API to crawl articles from a WeChat Official Account (Public Channel).

**Prerequisites**:
- The server must be running (`pnpm run dev` or `node .output/server/index.mjs`).
- You must have logged in at least once via the Web UI to save credentials to the server. The server will automatically use the stored credentials for API requests.

## Workflow

The crawling process consists of three steps:
1.  **Search** for the account to get its `fakeid`.
2.  **List** articles using the `fakeid`.
3.  **Download** article content using the article's `link`.

### Base URL
`http://localhost:3000/api/public/v1`

---

### 1. Search Account

Find the official account by its name or keyword.

**Endpoint**: `GET /account`

**Parameters**:
- `keyword`: The name or keyword to search for (URL encoded).

**Example**:
```bash
curl "http://localhost:3000/api/public/v1/account?keyword=36kr"
```

**Response (simplified)**:
```json
{
  "base_resp": { "ret": 0, "err_msg": "ok" },
  "list": [
    {
      "nickname": "36氪",
      "fakeid": "MzI2NDk5NzA0Mw==",
      "alias": "wow36kr",
      ...
    }
  ]
}
```
> **Note**: Save the `fakeid` from the response for the next step.

---

### 2. Get Article List

Retrieve a list of recent articles published by the account.

**Endpoint**: `GET /article`

**Parameters**:
- `fakeid`: The unique identifier of the account (obtained from Step 1).
- `begin`: (Optional) Offset for pagination (default: 0).
- `size`: (Optional) Number of articles to retrieve (default: 5).

**Example**:
```bash
curl "http://localhost:3000/api/public/v1/article?fakeid=MzI2NDk5NzA0Mw=="
```

**Response (simplified)**:
```json
{
  "base_resp": { "ret": 0, "err_msg": "ok" },
  "articles": [
    {
      "aid": "265104...",
      "title": "8点1氪：继“小便门”后，海底捞再曝火锅异物事件...",
      "link": "https://mp.weixin.qq.com/s/5KIZUIu_to4DlrDnEikMnw",
      "create_time": 1704758400,
      ...
    }
  ]
}
```
> **Note**: Copy the `link` (URL) of the article you want to download.

---

### 3. Download Article Content

Fetch the content of a specific article.

**Endpoint**: `GET /download`

**Parameters**:
- `url`: The full URL of the article (obtained from Step 2, URL encoded).
- `format`: (Optional) Output format. Options: `html` (default), `text`, `markdown`.

**Example**:
```bash
# Get content as Markdown
curl "http://localhost:3000/api/public/v1/download?url=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2F5KIZUIu_to4DlrDnEikMnw&format=markdown"
```

**Response**:
Returns the raw content string in the requested format.

---

### Example Script (Node.js)

See `test-scripts/api-test.ts` for a complete example using TypeScript/Node.js.

```bash
# Run the included test script
npx tsx test-scripts/api-test.ts "人民日报"
```

## Real-world Example Responses

Below are actual responses from querying "人民日报".

### 1. Search Response (`/account`)

```json
{
  "base_resp": {
    "ret": 0,
    "err_msg": "ok"
  },
  "list": [
    {
      "fakeid": "MjM5MjAxNDM4MA==",
      "nickname": "人民日报",
      "alias": "rmrbwx",
      "round_head_img": "http://mmbiz.qpic.cn/mmbiz_png/2cKp26GearcCdicD5WVAqT3p6eI0vW6iaU4yY8HMgRiaIibS8y18M7w1Cq0Xz0p5z0y0y0/0?wx_fmt=png",
      "service_type": 1,
      "signature": "参与、沟通、记录时代。",
      "js_verify": "1"
    }
  ],
  "total": 12
}
```

### 2. Article List Response (`/article`)

```json
{
  "base_resp": {
    "ret": 0,
    "err_msg": "ok"
  },
  "articles": [
    {
      "aid": "2666358872",
      "appmsgid": 2666358872,
      "cover": "http://mmbiz.qpic.cn/sz_mmbiz_jpg/2cKp26GeardibG0e9mG4X9icj6IeicL2e6l2e6l2e6l2e6l2e6l/0?wx_fmt=jpeg",
      "create_time": 1736412402,
      "digest": "大爷拍的素颜巴黎火上热搜！本人回应",
      "itemidx": 1,
      "link": "https://mp.weixin.qq.com/s?__biz=MjM5MjAxNDM4MA==&mid=2666358872&idx=1&sn=...",
      "title": "“大爷拍的素颜巴黎”火上热搜！本人回应",
      "update_time": 1736412402
    }
    // ... more articles
  ]
}
```

### 3. Content Response (`/download`)

Requesting `format=markdown`:

```markdown
“大爷拍的素颜巴黎”火上热搜！本人回应
 人民日报 
 在小说阅读器中沉浸阅读
 近日一位河南大爷去法国巴黎旅游实拍的无美颜、无滤镜照片火遍全网相关话题“大爷拍的素颜巴黎火了”冲上热搜有网友在评论区解释，好天气和灯光都会为巴黎加分；也有网友认为，潮湿清冷、游客不多的巴黎，也是它真实的一面。
 ...
```
