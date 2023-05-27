import axios from 'axios';
import { displayNewsDetails } from './newsDisplay.component';
import { getNewsDetails } from './api.component';

const apiUrl = process.env.API_URL;

let loadedNewsCount = 0;
let currentPage = 1;
let totalNewsCount = 0;
let newsIds = [];

export async function getLatestNewsIds(startIndex, endIndex) {
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
