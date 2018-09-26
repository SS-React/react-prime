const createCompareHTML = () => {
return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>title</title>
  </head>
  <body>
    <iframe src="http://localhost:3000"></iframe>
    <iframe src="http://localhost:8080"></iframe>
  </body>
</html>
`;
};

module.exports = createCompareHTML;