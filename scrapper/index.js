const rp = require("request-promise");
const $ = require("cheerio");

const url =
  "https://variety.com/2021/film/box-office/box-office-bob-odenkirk-nobody-opening-weekend-1234939689/";

// getDataPage(url).then((result) => {
//   console.log(result);
// });

async function getDataPage(url) {
  const spacesRegex = /[\s+\t\n]+/gimu;
  const html = await rp(url);

  const title = $("h1", html)
    .text()
    .split(spacesRegex)
    .filter((x) => x.length > 0)
    .join(" ");

  const divContainer = $("div .vy-cx-page-content", html);
  const content = $("p", divContainer).text();

  return {
    title,
    content,
  };
}

module.exports = getDataPage;
