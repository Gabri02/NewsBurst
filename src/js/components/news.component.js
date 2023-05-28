import axios from "axios";

const apiUrl = process.env.API_URL;

export async function getNewsDetails(id) {
  try {
    const response = await axios.get(`${apiUrl}/item/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(
      `Errore durante il recupero dei dettagli della notizia con ID ${id}:`,
      error
    );
    return null;
  }
}

export async function getLatestNewsIds(startIndex = 0, endIndex = 10) {
  try {
    const response = await axios.get(`${apiUrl}/newstories.json`);
    const newsIds = response.data;
    const slicedNewsIds = newsIds.slice(startIndex, endIndex);
    return slicedNewsIds;
  } catch (error) {
    console.error(
      "Errore durante il recupero degli ID delle ultime notizie:",
      error
    );
    return [];
  }
}

