const createHtmlScript = () => {
return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>title</title>
  </head>
  <body>
    <iframe  src="http://localhost:3000"></iframe>
    <iframe src="http://localhost:5000"></iframe>
  </body>
</html>
`;
};

module.exports = createHtmlScript;