//format
data = [{}, {}];
finalData = [];
keyword = "";
Array.map((e) =>
  data.title.includes(keyword)
    ? finalData.push(e)
    : data.body.icludes(keyword)
    ? finalData.push(e)
    : (finalData = finalData)
);
