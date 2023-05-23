const axios = require('axios');
const _ = require('lodash');

const apiUrl = process.env.API_URL;
let loadedNewsCount = 0;

async function getLatestNewsIds() {
    let newsIds = [];

    try {
        const response = await axios.get(
            `${apiUrl}/newstories.json`
        );
        newsIds = response.data.slice(loadedNewsCount, loadedNewsCount + 10);

        for (const id of newsIds) {
            const news = await getNewsDetails(id);
            if (news) {
                displayNewsDetails(news);
            }
        }

        loadedNewsCount += 10; // Incrementa il numero di notizie caricate
    } catch (error) {
        console.error('Errore durante il recupero degli ID delle ultime notizie:', error);
    }

    return { newsIds, loadedNewsCount };
}

getLatestNewsIds();

async function getNewsDetails(id) {
    try {
        const response = await axios.get(`${apiUrl}/item/${id}.json`);
        return response.data;
    } catch (error) {
        console.error(`Errore durante il recupero dei dettagli della notizia con ID ${id}:`, error);
        return null;
    }
}

function displayNewsDetails(news) {
    const { title, url, time } = news;
    console.log(`Titolo: ${title}`);
    console.log(`Link: ${url}`);
    console.log(`Data: ${new Date(time * 1000).toLocaleString()}`);
    console.log('---');
}

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

const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', loadMoreNews);
