const axios = require('axios');
const _ = require('lodash');

let newsIds = [];
let loadedNewsCount = 0;

async function getLatestNewsIds() {
    try {
        const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
        newsIds = response.data.slice(0, 10); // Prendi solo i primi 10 ID

        for (const id of newsIds) {
            const news = await getNewsDetails(id);
            if (news) {
                displayNewsDetails(news);
            }
        }
    } catch (error) {
        console.error('Errore durante il recupero degli ID delle ultime notizie:', error);
    }
}

getLatestNewsIds();

async function getNewsDetails(id) {
    try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
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
    const nextIds = _.slice(newsIds, loadedNewsCount, loadedNewsCount + 10);
    loadedNewsCount += 10;

    for (const id of nextIds) {
        const news = await getNewsDetails(id);
        if (news) {
            displayNewsDetails(news);
        }
    }
}

const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', loadMoreNews);
