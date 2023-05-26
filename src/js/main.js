require('../sass/style.sass');

const { getLatestNewsIds } = require('./components/news.component');
const { loadMoreNews } = require('./components/newsLoad.component');

const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', loadMoreNews);

getLatestNewsIds();
