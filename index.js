const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

/* SERVER */
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, path: pathName } = url.parse(req.url, true);

  //  Overview page
  if (pathName === "/" || pathName === "/overview") {
    const cardsHtml = dataObj
      .map((dataItem) => replaceTemplate(templateCard, dataItem))
      .join("");
    const templateOverviewFilled = templateOverview.replace(
      /{%PRODUCT_CARDS%}/g,
      cardsHtml
    );

    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(templateOverviewFilled);
  }
  //  Product page
  else if (pathName === `/product?id=${query.id}`) {
    const dataNeeded = dataObj.find((dataItem) => dataItem.id === +query.id);

    res.writeHead(200, { "Content-type": "text/html" });

    if (dataNeeded) {
      const templateProductFilled = replaceTemplate(
        templateProduct,
        dataNeeded
      );

      res.end(templateProductFilled);
    } else {
      res.end("<h1>Page not found</h1>");
    }
  }
  //  API page
  else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  //  Not found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening from port 8000");
});

/* FILE */
// //  Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on: ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

// //  Non-blocking, asynchronous way
// fs.readFile('./txt/startttttt.txt', "utf-8", (err, data1) => {
//   if(err) return console.log("Error! 🤣")

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       fs.writeFile('./txt/final.txt', `${data3}\n${data2}`, 'utf-8', (err) => {
//         console.log("Your file has been written!")
//       })
//     })
//   })
// })
