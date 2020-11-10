const fs = require("fs");
const xml2js = require("xml2js");
fs.readFile("./site-map-arnavgupta-ssl.xml", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }

  // convert XML data to JSON object
  xml2js.parseString(data, (err, result) => {
    if (err) {
      throw err;
    }

    // add a new database to list
    const postgres = {
      loc: "PostgreSQL",
      lastmod: "RDBMS",
      changefreq: "monthly",
      priority: "1.0",
    };

    result.urlset.url.push(postgres);

    // convert SJON objec to XML
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(result);

    // write updated XML string to a file
    fs.writeFile("site-map-arnavgupta-ssl.xml", xml, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Updated XML is written to a new file.`);
    });
  });
});
