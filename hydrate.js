import ReactDOM from 'react-dom';

const hydrate = (e, id) => {
  ReactDOM.hydrate(e, document.getElementById(id));
}

module.exports = hydrate;