import axios from 'axios';
import { displayNewsDetails } from './newsDisplay.component';
import { getNewsDetails } from './api.component';

const apiUrl = process.env.API_URL;

let loadedNewsCount = 0;
let currentPage = 1;
let totalNewsCount = 0;
let newsIds = [];

export async function getLatestNewsIds(startIndex = 0, endIndex = 10) {
  try {
    const response = await axios.get(`${apiUrl}/newstories.json`);
    newsIds = response.data.slice(startIndex, endIndex);
    totalNewsCount = newsIds.length; // Aggiungi questa riga per aggiornare correttamente totalNewsCount

    for (let i = 0; i < newsIds.length; i++) {
      const newsItem = await getNewsDetails(newsIds[i]);
      if (newsItem) {
        displayNewsDetails(newsItem, currentPage); // Passa il numero di pagina corrente
      }
      loadedNewsCount += 1;
    }

    loadedNewsCount += 10;
  } catch (error) {
    console.error('Errore durante il recupero degli ID delle ultime notizie:', error);
  }

  return { newsIds, loadedNewsCount, totalNewsCount }; // Aggiungi totalNewsCount alla risposta
}
