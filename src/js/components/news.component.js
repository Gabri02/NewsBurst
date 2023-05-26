const axios = require('axios');
const _ = require('lodash');

const { displayNewsDetails } = require('./newsDisplay.component');
const { getNewsDetails } = require('./api.component');

const apiUrl = process.env.API_URL;

let loadedNewsCount = 0;
let currentPage = 1;
let totalNewsCount = 0;
const newsIds = await getLatestNewsIds(startIndex, endIndex);


async function getLatestNewsIds(startIndex, endIndex) {
  let newsIds = [];
  try {
    const response = await axios.get(`${apiUrl}/newstories.json`);
    newsIds = response.data.slice(startIndex, endIndex);

    for (const id of newsIds) {
      const news = await getNewsDetails(id);
      if (news) {
        displayNewsDetails(news);
      }
      totalNewsCount += 1;
    }

    loadedNewsCount += 10;
  } catch (error) {
    console.error('Errore durante il recupero degli ID delle ultime notizie:', error);
  }

  return { newsIds, loadedNewsCount };
}

module.exports = { getLatestNewsIds };
