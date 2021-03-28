const rp = require("request-promise");
const $ = require("cheerio");

const url =
  "https://variety.com/2021/film/box-office/box-office-bob-odenkirk-nobody-opening-weekend-1234939689/";

// getDataPage(url)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {});

async function getDataPage(url) {
  console.log(url);
  const spacesRegex = /[\s+\t\n]+/gimu;
  const html = await rp(url);

  const title = $("h1", html)
    .text()
    .split(spacesRegex)
    .filter((x) => x.length > 0)
    .join(" ");

  const divContainer = $("div .vy-cx-page-content", html);
  const content = $("p", divContainer).text();

  const image = $("div.lrv-a-crop-16x9 > img", html).first()[0].attribs[
    "data-lazy-src"
  ];
  return {
    title,
    content,
    image,
  };
}

module.exports = getDataPage;
