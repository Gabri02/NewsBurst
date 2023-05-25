const axios = require('axios');
const _ = require('lodash');
const {NewsIds} = require("./components/NewsId.component");
const {NewsDetails} = require("./components/NewsDetails.component");
const {displayNews} = require("./components/displayNews.component");
const {loadMore} = require("./components/loadMore.component");

require("../sass/style.sass");

let loadedNewsCount = 0;

NewsIds();

NewsDetails();

displayNews()

loadMore();

const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', loadMore);
