const axios = require('axios');
const _ = require('lodash');
const {getLatestNewsIds} = require("./components/getLatestNewsId.component");
const {getNewsDetails} = require("./components/getNewsDetails.component");
const {displayNewsDetails} = require("./components/displayNewsDetail.component");
const {loadMoreNews} = require("./components/loadMoreNews.component");

require("../sass/style.sass");

const newsDiv = document.getElementById("newsDiv");

const apiUrl = process.env.API_URL;
let loadedNewsCount = 0;

getLatestNewsIds();

getNewsDetails(id);

displayNewsDetails(news)

loadMoreNews();

const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', loadMoreNews);
