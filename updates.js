const xml2js = require("xml2js");
const fs = require("fs");
const User = require("./models/User");

await fs.readFile(
  path.resolve(__dirname, "./../../client/public/site-map-arnavgupta-ssl.xml"),
  "utf-8",
  (err, data) => {
    if (err) {
      throw err;
    }

    // convert XML data to JSON object
    xml2js.parseString(data, async (err, result) => {
      if (err) {
        throw err;
      }
      // add a new database to list
      const postgres = {
        loc: `https://www.arnavgupta.net/profiles?value=${req.body.name}`,
        changefreq: "monthly",
        priority: "1.0",
      };

      result.urlset.url.push(postgres);

      // convert SJON objec to XML
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      // write updated XML string to a file
      fs.writeFile(
        path.resolve(
          __dirname,
          "./../../client/public/site-map-arnavgupta-ssl.xml"
        ),
        xml,
        (err) => {
          if (err) {
            throw err;
          }

          console.log(`Updated XML is written to a new file.`);
        }
      );
    });
  }
);

await fs.readFile(
  path.resolve(__dirname, "./../../client/public/site-map-arnavgupta.xml"),
  "utf-8",
  (err, data) => {
    if (err) {
      throw err;
    }

    // convert XML data to JSON object
    xml2js.parseString(data, async (err, result) => {
      if (err) {
        throw err;
      }
      // add a new database to list
      const postgres = {
        loc: `http://www.arnavgupta.net/profiles?value=${req.body.name}`,
        changefreq: "monthly",
        priority: "1.0",
      };

      result.urlset.url.push(postgres);

      // convert SJON objec to XML
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      // write updated XML string to a file
      fs.writeFile(
        path.resolve(
          __dirname,
          "./../../client/public/site-map-arnavgupta.xml"
        ),
        xml,
        (err) => {
          if (err) {
            throw err;
          }

          console.log(`Updated XML is written to a new file.`);
        }
      );
    });
  }
);

await fs.readFile(
  path.resolve(
    __dirname,
    "./../../client/public/site-map-passionatebloggers-ssl.xml"
  ),
  "utf-8",
  (err, data) => {
    if (err) {
      throw err;
    }

    // convert XML data to JSON object
    xml2js.parseString(data, async (err, result) => {
      if (err) {
        throw err;
      }
      // add a new database to list
      const postgres = {
        loc: `https://www.passionatebloggers.me/profiles?value=${req.body.name}`,
        changefreq: "monthly",
        priority: "1.0",
      };

      result.urlset.url.push(postgres);

      // convert SJON objec to XML
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      // write updated XML string to a file
      fs.writeFile(
        path.resolve(
          __dirname,
          "./../../client/public/site-map-passionatebloggers-ssl.xml"
        ),
        xml,
        (err) => {
          if (err) {
            throw err;
          }

          console.log(`Updated XML is written to a new file.`);
        }
      );
    });
  }
);

await fs.readFile(
  path.resolve(
    __dirname,
    "./../../client/public/site-map-passionatebloggers.xml"
  ),
  "utf-8",
  (err, data) => {
    if (err) {
      throw err;
    }

    // convert XML data to JSON object
    xml2js.parseString(data, async (err, result) => {
      if (err) {
        throw err;
      }
      // add a new database to list
      const postgres = {
        loc: `http://www.passionatebloggers.me/profiles?value=${req.body.name}`,
        changefreq: "monthly",
        priority: "1.0",
      };

      result.urlset.url.push(postgres);

      // convert SJON objec to XML
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      // write updated XML string to a file
      fs.writeFile(
        path.resolve(
          __dirname,
          "./../../client/public/site-map-passionatebloggers.xml"
        ),
        xml,
        (err) => {
          if (err) {
            throw err;
          }

          console.log(`Updated XML is written to a new file.`);
        }
      );
    });
  }
);
