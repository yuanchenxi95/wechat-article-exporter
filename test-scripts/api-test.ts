
interface Response<T> {
    base_resp: {
        ret: number;
        err_msg: string;
    };
    [key: string]: any;
}

const BASE_URL = 'http://localhost:3000/api/public/v1';

async function main() {
    const keyword = process.argv[2] || '人民日报';
    console.log(`Searching for account: ${keyword}`);

    // 1. Search Account
    const searchResp = await fetch(`${BASE_URL}/account?keyword=${encodeURIComponent(keyword)}`);
    const searchJson = await searchResp.json() as Response<any>;

    console.log('\n--- API: /account Response ---');
    console.log(JSON.stringify(searchJson, null, 2));
    console.log('------------------------------\n');

    if (searchJson.base_resp?.ret !== 0) {
        console.error('Search failed:', searchJson);
        return;
    }

    const list = searchJson.list || [];
    if (list.length === 0) {
        console.error('No accounts found.');
        return;
    }

    const account = list[0];
    console.log(`Found account: ${account.nickname} (fakeid: ${account.fakeid})`);
    const fakeid = account.fakeid;

    // 2. Get Articles
    console.log(`\nFetching articles for fakeid: ${fakeid}`);
    const articleResp = await fetch(`${BASE_URL}/article?fakeid=${fakeid}`);
    const articleJson = await articleResp.json() as any;

    console.log('\n--- API: /article Response ---');
    console.log(JSON.stringify(articleJson, null, 2));
    console.log('------------------------------\n');

    if (articleJson.base_resp?.ret !== 0) {
        console.error('Get articles failed:', articleJson);
        return;
    }

    const articles = articleJson.articles || [];
    console.log(`Retrieved ${articles.length} articles.`);

    if (articles.length === 0) {
        console.log('No articles to download.');
        return;
    }

    // 3. Get Content
    const firstArticle = articles[0];
    console.log(`\nFetching content for article: ${firstArticle.title}`);
    console.log(`URL: ${firstArticle.link}`);

    const contentResp = await fetch(`${BASE_URL}/download?url=${encodeURIComponent(firstArticle.link)}&format=markdown`);

    if (!contentResp.ok) {
        console.error('Download failed:', await contentResp.text());
        return;
    }

    const content = await contentResp.text();
    console.log('--- Content Preview ---');
    console.log(content);
    console.log('-----------------------------------------');
}

main().catch(console.error);
