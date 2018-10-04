/**
 * Function that returns a string to create an HTML comparison file
 * @param {Object} input - Object containing user input from CLI (requires the .port property)
 */

const createCompareHTML = (input) => {
return `<!DOCTYPE html>
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
        margin-top: 10px;
        width: 100%;
      }
  
      #csr-div {
        margin-right: 40px;
      }
  
      #csr-div, #ssr-div {
        margin-bottom: 20px;
      }
  
      #csr-iframe,
      #ssr-iframe {
        width: 100%;
        height: 420px;
        border: 0px;
        padding: 2px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
  
      #csr-report-iframe,
      #ssr-report-iframe {
        width: 100%;
        height: 420px;
      }
  
      #csr-div,
      #ssr-div {
        width: 44%;
        float: left;
      }
  
      #button1 {
        text-align: center;
      }
  
      #button2 {
        text-align: center;
      }
  
      .btn {
        padding: 10px 25px;
        font-size: 15px;
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
        color: #fff;
        position: relative;
        border-left: 8px solid #4d1551;
        cursor: pointer;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        width: 130px;
      }
  
      .purple {
        background-color: #9b59b6;
      }
  
      .purple:hover {
        background-color: #B573D0;
      }
  </style>
  </head>
  <body>
    <div id="top-logo"><img src="https://s3-us-west-1.amazonaws.com/reactprimeimages/primeLogo.png" width="200"></div>
    <div id="iframe-wrapper">
      <div id="csr-div">
        <div>
          <p>Client-Side Rendered</p>
        </div>
        <iframe id="csr-iframe" src="http://localhost:${input.port}"></iframe>
        <div>
          <div id="button1" class="btn purple" onClick='document.getElementById("csr-report-iframe").src="http://localhost:5050/csr-report";window.scrollBy(0, 600);' className="btn purple">VIEW
            REPORT
          </div>
          <iframe id='csr-report-iframe' frameborder="0"></iframe>
        </div>
      </div>
      <div id="ssr-div">
        <div>
          <p>Server-Side Rendered</p>
        </div>
        <iframe id="ssr-iframe" src="http://localhost:8080"></iframe>
        <div>
          <div id="button2" class="btn purple" onClick='document.getElementById("ssr-report-iframe").src="http://localhost:5050/ssr-report";window.scrollBy(0, 600);' className="btn purple">VIEW
            REPORT
          </div>
          <iframe id='ssr-report-iframe' frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

module.exports = createCompareHTML;
