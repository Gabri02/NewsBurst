import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ('../sass/style.sass');

import { getLatestNewsIds } from './components/news.component';
import { loadMoreNews } from './components/newsLoad.component';

const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', loadMoreNews);

getLatestNewsIds();
