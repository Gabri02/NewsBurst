const { getNewsDetails } = require('./api.component');
const { getLatestNewsIds } = require('./news.component');

async function loadMoreNews() {
    loadMoreBtn.disabled = true;

    const { newsIds, loadedNewsCount } = await getLatestNewsIds();
    const nextIds = _.slice(newsIds, loadedNewsCount, loadedNewsCount + 10);

    const loadedNews = [];

    for (const id of nextIds) {
        const news = await getNewsDetails(id);
        if (news) {
            loadedNews.push(news);
        }
    }

    loadedNews.forEach((news) => {
        displayNewsDetails(news);
    });

    loadMoreBtn.disabled = false;
}

module.exports = { loadMoreNews };
