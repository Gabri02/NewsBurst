export function displayNewsDetails(news, page) {
  const pageDiv = document.getElementById(`page${page}`);
  if (!pageDiv) {
    console.error(`Impossibile trovare il div della pagina ${page}`);
    return;
  }

  const { title, url, time } = news;

  const div = document.createElement('div');
  const heading = document.createElement('h6');
  const link = document.createElement('a');
  const paragraph = document.createElement('p');
  const date = document.createElement('p');
  const hr = document.createElement('hr');

  heading.textContent = `Titolo: ${title}`;
  link.textContent = `Link: ${url}`;
  link.href = url;
  paragraph.appendChild(link);
  date.textContent = `Data: ${new Date(time * 1000).toLocaleString()}`;

  div.appendChild(heading);
  div.appendChild(paragraph);
  div.appendChild(date);
  div.appendChild(hr);

  pageDiv.appendChild(div);
}
