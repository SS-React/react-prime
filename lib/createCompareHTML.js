const createCompareHTML = () => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>React Prime</title>
      <style>
        html, body {
          margin: 0;
          padding: 0;
        }
  
        body {
          background-color: white;   
        }
  
        p {
          text-align: center;
          font-family: Arial, Helvetica, sans-serif;
        }
  
        iframe {
          border: 0px;
          padding: 2px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
  
        #top-logo {
          padding: 20px;
          background-color: black;
          margin: 0 auto;
          width: 100%;
        }
  
        #top-logo img {
          margin-left: 2%;
        }
  
        #iframe-wrapper {
          margin-left: 4%;
          margin-right: 4%;
          margin-top: 40px;
          width: 100%;
        }
  
        #csr-div {
          margin-right: 40px;
        }
  
        #csr-iframe, #ssr-iframe {
          width: 100%;
          height: 420px;
        }
  
        #csr-div, #ssr-div {
          width: 44%;
          float: left;
        }
      </style>
    </head>
    <body>
        <div id="top-logo"><img src="prime_light_sm.png" width="200"></div>
        <div id="iframe-wrapper">
          <div id="csr-div">
            <div><p>Client-Side Rendered</p></div>
            <iframe id="csr-iframe" src="http://localhost:3000"></iframe>
          </div>
          <div id="ssr-div">
            <div><p>Server-Side Rendered</p></div>
            <iframe id="ssr-iframe" src="http://localhost:8080"></iframe>
          </div>
        </div>
    </body>
  </html>
`;
};

module.exports = createCompareHTML;
