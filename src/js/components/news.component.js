const axios = require('axios');
const _ = require('lodash');

const { displayNewsDetails } = require('./newsDisplay.component');
const { getNewsDetails } = require('./api.component');

const apiUrl = process.env.API_URL;

let loadedNewsCount = 0;

async function getLatestNewsIds() {
  let newsIds = [];
  try {
    const response = await axios.get(`${apiUrl}/newstories.json`);
    newsIds = response.data.slice(loadedNewsCount, loadedNewsCount + 10);

    for (const id of newsIds) {
      const news = await getNewsDetails(id);
      if (news) {
        displayNewsDetails(news);
      }
    }

    loadedNewsCount += 10;
  } catch (error) {
    console.error('Errore durante il recupero degli ID delle ultime notizie:', error);
  }

  return { newsIds, loadedNewsCount };
}

module.exports = { getLatestNewsIds };
