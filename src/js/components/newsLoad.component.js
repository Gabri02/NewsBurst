import { getNewsDetails } from './api.component';
import { getLatestNewsIds } from './news.component';
import _ from 'lodash';

const prevPageBtn = document.getElementById('prevPageBtn');
prevPageBtn.addEventListener('click', goToPreviousPage);

const nextPageBtn = document.getElementById('nextPageBtn');
nextPageBtn.addEventListener('click', goToNextPage);

let currentPage = 1;
let totalNewsCount = 0;
const newsPerPage = 10;

async function loadMoreNews() {
    loadMoreBtn.disabled = true;

    const newsPerPage = 10;
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;

    const prevPageBtn = document.getElementById('prevPageBtn');
    prevPageBtn.disabled = currentPage === 1;

    const { newsIds, loadedNewsCount } = await getLatestNewsIds();
    const nextIds = _.slice(newsIds, loadedNewsCount, loadedNewsCount + 10);
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;

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

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage -= 1;
        loadNewsForCurrentPage();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(totalNewsCount / 10);
    if (currentPage < totalPages) {
        currentPage += 1;
        loadNewsForCurrentPage();
    }
}

async function loadNewsForCurrentPage() {
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;

    const loadedNews = [];

    for (const id of currentNewsIds) {
        const news = await getNewsDetails(id);
        if (news) {
            loadedNews.push(news);
        }
    }

    // Clear existing news on the page
    const newsDiv = document.getElementById('newsDiv');
    newsDiv.innerHTML = '';

    // Display the loaded news
    loadedNews.forEach((news) => {
        displayNewsDetails(news);
    });

    // Update the current page indicator
    const currentPageIndicator = document.getElementById('currentPage');
    currentPageIndicator.textContent = `Pagina ${currentPage}`;

    // Disable the next page button if it's the last page
    const nextPageBtn = document.getElementById('nextPageBtn');
    const totalPages = Math.ceil(totalNewsCount / 10);
    nextPageBtn.disabled = currentPage === totalPages;
}

export { loadMoreNews };
