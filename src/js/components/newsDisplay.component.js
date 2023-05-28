export function displayNewsDetails(news, page) {
  const { title, url, time } = news;

  const div = document.createElement("div");
  div.classList.add("news-item");
  const heading = document.createElement("h6");
  const link = document.createElement("a");
  const paragraph = document.createElement("p");
  const date = document.createElement("p");

  heading.textContent = `Title: ${title}`;
  link.textContent = `Link: ${url}`;
  link.href = url;
  paragraph.appendChild(link);
  date.textContent = `Date: ${new Date(time * 1000).toLocaleString()}`;

  div.appendChild(heading);
  div.appendChild(paragraph);
  div.appendChild(date);

  const pageNumber = page > 0 ? page : 1;
  const pageDiv = document.getElementById(`page${pageNumber}`);
  if (pageDiv) {
    pageDiv.appendChild(div);
  } else {
    console.error(`Unable to find page ${pageNumber} div`);
  }
}
