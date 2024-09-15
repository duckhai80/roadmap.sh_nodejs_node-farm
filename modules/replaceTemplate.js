module.exports = (template, product) => {
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
