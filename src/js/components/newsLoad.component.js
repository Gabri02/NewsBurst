import { displayNewsDetails } from './newsDisplay.component';
import { getNewsDetails } from './api.component';

const newsPerPage = 10;
let currentPage = 1;
let totalNewsCount = 0;
let currentNewsIds = [];

async function loadMoreNews() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.disabled = true;

  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;

  const prevPageBtn = document.getElementById('prevPageBtn');
  prevPageBtn.disabled = currentPage === 1;

  const { newsIds, loadedNewsCount, totalNewsCount } = await getLatestNewsIds(startIndex, endIndex);
  currentNewsIds = newsIds;
  const nextIds = currentNewsIds.slice(loadedNewsCount, loadedNewsCount + newsPerPage);
  prevPageBtn.disabled = currentPage === 1;

  const totalPages = Math.ceil(totalNewsCount / newsPerPage);
  const nextPageBtn = document.getElementById('nextPageBtn');
  nextPageBtn.disabled = currentPage === totalPages;

  const loadedNews = [];

  for (const id of nextIds) {
    const news = await getNewsDetails(id);
    if (news) {
      loadedNews.push(news);
    }
  }

  const newsContainer = document.getElementById('newsContainer');

  // Check if the current page div exists
  const currentPageDiv = document.getElementById(`page${currentPage}`);
  if (!currentPageDiv) {
    // If the div doesn't exist, create a new div for the current page and append it to newsContainer
    const newPageDiv = document.createElement('div');
    newPageDiv.id = `page${currentPage}`;
    newPageDiv.className = 'news-page';
    newsContainer.appendChild(newPageDiv);
  }

  loadedNews.forEach((news) => {
    displayNewsDetails(news, currentPage); // Pass the current page number
  });

  loadMoreBtn.disabled = false;
}


function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    loadNewsForCurrentPage();
  }
}

function goToNextPage() {
  const totalPages = Math.ceil(totalNewsCount / newsPerPage);
  if (currentPage < totalPages) {
    currentPage += 1;
    loadNewsForCurrentPage();
  }
}

async function loadNewsForCurrentPage() {
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  // Modifica il div della pagina corrente in base all'attributo 'data-page'
  const currentPageDiv = document.querySelector(`[data-page="${currentPage}"]`);

  const loadedNews = [];

  for (const id of currentNewsIds.slice(startIndex, endIndex)) {
    const news = await getNewsDetails(id);
    if (news) {
      loadedNews.push(news);
    }
  }

  // Hide all pages
  const allPages = document.getElementsByClassName('news-page');
  for (let i = 0; i < allPages.length; i++) {
    allPages[i].style.display = 'none';
  }

  // Check if the current page div exists
  if (currentPageDiv) {
    // If the div exists, display the news for the current page
    currentPageDiv.style.display = 'block';
  } else {
    // If the div doesn't exist, create a new div for the current page and display the news
    const newsContainer = document.getElementById('newsContainer');
    const newPageDiv = document.createElement('div');
    newPageDiv.id = `page${currentPage}`;
    newPageDiv.className = 'news-page';
    newsContainer.appendChild(newPageDiv);

    loadedNews.forEach((news) => {
      displayNewsDetails(news, currentPage); // Passa il numero di pagina corrente
    });
  }

  // Update the current page indicator
  const currentPageIndicator = document.getElementById('currentPage');
  currentPageIndicator.textContent = `Pagina ${currentPage}`;

  // Disable the next page button if it's the last page
  const totalPages = Math.ceil(totalNewsCount / newsPerPage);
  nextPageBtn.disabled = currentPage === totalPages;
}

export { loadMoreNews };
