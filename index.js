const fs = require("fs");
const http = require("http");
const url = require("url");

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

const replaceTemplate = (template, product) => {
  let newTemplate = template.replace(/{%PRODUCTNAME%}/g, product.productName);

  newTemplate = newTemplate.replace(/{%ID%}/g, product.id);
  newTemplate = newTemplate.replace(/{%IMAGE%}/g, product.image);
  newTemplate = newTemplate.replace(/{%PRICE%}/g, product.price);
  newTemplate = newTemplate.replace(/{%FROM%}/g, product.from);
  newTemplate = newTemplate.replace(/{%NUTRIENTS%}/g, product.nutrients);
  newTemplate = newTemplate.replace(/{%QUANTITY%}/g, product.quantity);
  newTemplate = newTemplate.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic)
    newTemplate = newTemplate.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return newTemplate;
};

const server = http.createServer((req, res) => {
  const pathName = req.url;

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
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
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
