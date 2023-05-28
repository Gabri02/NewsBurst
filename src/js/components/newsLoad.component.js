import { displayNewsDetails } from "./newsDisplay.component";
import { getNewsDetails, getLatestNewsIds as getLatestNewsIdsAPI } from "./news.component";
import axios from "axios";

const apiUrl = process.env.API_URL;
const newsPerPage = 10;
let currentPage = 1;
let totalNewsCount = 0;
let currentNewsIds = [];
let currentPageDiv = null;

export function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    loadNewsForCurrentPage();
  }
}

export function goToNextPage() {
  const totalPages = Math.ceil(totalNewsCount / newsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    loadNewsForCurrentPage();
  }
}

export async function loadNewsForCurrentPage() {
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;

  currentNewsIds = await getLatestNewsIdsAPI(startIndex, endIndex);

  // Aggiorna totalNewsCount solo se è inferiore al numero di notizie caricate fino ad ora
  const loadedNewsCount = startIndex + currentNewsIds.length;
  if (loadedNewsCount > totalNewsCount) {
    totalNewsCount = loadedNewsCount;
  }

  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "";

  currentPageDiv = document.getElementById(`page${currentPage}`);
  if (currentPageDiv) {
    currentPageDiv.style.display = "none";
  }

  const newPageDiv = document.createElement("div");
  newPageDiv.id = `page${currentPage + 1}`;
  newPageDiv.className = "news-page";
  newsContainer.appendChild(newPageDiv);

  currentPageDiv = newPageDiv;

  for (const newsId of currentNewsIds) {
    const newsDetails = await getNewsDetails(newsId);
    if (newsDetails) {
      displayNewsDetails(newsDetails, currentPage + 1);
    }
  }

  updateCurrentPageIndicator();
  updatePaginationButtons();
}

async function getLatestNewsCount() {
  try {
    const response = await axios.get(`${apiUrl}/newstories.json`);
    const newsIds = response.data;
    return newsIds.length;
  } catch (error) {
    console.error(
      "Errore durante il recupero del numero totale di notizie:",
      error
    );
    return 0;
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

export async function loadMoreNews() {
  const totalPages = Math.ceil(totalNewsCount / newsPerPage);
  if (currentPage < totalPages || totalPages === 1) {
    currentPage++;
    loadNewsForCurrentPage();
    updatePaginationButtons();
  }
}

function updatePaginationButtons() {
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");

  const totalPages = Math.ceil(totalNewsCount / newsPerPage);

  if (currentPage === 1) {
    prevPageBtn.disabled = true;
  } else {
    prevPageBtn.disabled = false;
  }

  if (currentPage === totalPages) {
    nextPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
  }
}

function updateCurrentPageIndicator() {
  const currentPageIndicator = document.getElementById("currentPage");
  currentPageIndicator.textContent = `Pagina ${currentPage}`;
}
