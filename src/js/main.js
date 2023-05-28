import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/style.sass";

import { getLatestNewsIds } from "./components/news.component";
import {
  loadMoreNews,
  goToPreviousPage,
  goToNextPage,
  loadNewsForCurrentPage,
} from "./components/newsLoad.component";

const loadMoreBtn = document.getElementById("loadMoreBtn");
loadMoreBtn.addEventListener("click", loadMoreNews);

const prevPageBtn = document.getElementById("prevPageBtn");
prevPageBtn.addEventListener("click", goToPreviousPage);

const nextPageBtn = document.getElementById("nextPageBtn");
nextPageBtn.addEventListener("click", goToNextPage);

getLatestNewsIds().then(() => {
  loadNewsForCurrentPage();
});
