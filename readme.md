# React Prime &nbsp; [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/react-prime.svg)](https://badge.fury.io/js/react-prime) ![alt text](https://david-dm.org/andyahn91/react-prime.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/91b75ab8918b4ef19e43b266e5ee17f1)](https://app.codacy.com/app/andyahn91/react-prime?utm_source=github.com&utm_medium=referral&utm_content=andyahn91/react-prime&utm_campaign=Badge_Grade_Dashboard)

Library to effortlessly convert your non-SSR React applications into responsive, SSR React applications.
https://ss-react.github.io/react-prime/

## Please Note

This library has been developed to work with Create-React-Apps exclusively. <br />
Dependencies that rely on the window object before checking if it exists will not be compatable with React-Prime.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Local installation

```
npm install --save react-prime
```
Then, install the required dependencies
```
npm i inquirer @babel/core @babel/plugin-syntax-dynamic-import @babel/preset-env @babel/preset-react @babel/register react-frontload react-helmet react-loadable md5-file
```


### Server-Side Rendering

The process of SSR with our library has been automated through a CLI.

- Add a script into your package.json and run the script.

```
scripts: {
  "prime": "prime"
}
```
```
npm run prime
```
<hr>
<img src="http://zillberrycom.fatcow.com/react-prime/react-prime-cli.png" width="650">
<hr>

## Deployment

Upon answering all of the CLI questions, a ```primessr``` directory is created which contains five files: 
- index.js
- server.js
- primeServer.js
- primeCompare.html

and either
- returnHTML.js

or, if you have Redux
- returnReduxHTML.js

Then, an SSR version of your application is automatically hosted on ```http://localhost:8080```.

## Performance Testing

To view side by side comparison of CSR and SSR renders:
```
prime:compare
```

While Prime compare server is running, execute the following to generate Lighthouse reports:
```
prime:CSRreport
```
```
prime:SSRreport
```

## Authors

* [Andrew Wong](https://github.com/andwong91)
* [Andy Ahn](https://github.com/andyahn91)
* [Brittany Miltenberger](https://github.com/brittanywm)
* [Greg Domingue](https://​github.com/gregdoming)

See also the list of [contributors](https://github.com/SS-React/react-prime/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you to [Patrick Cason](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e) for his excellent article on SSR.
* Huge shoutout to [Clariz Mariano](https://github.com/havengoer) for the logo. You can find more of her work on [dribbble](https://dribbble.com/clarizmariano)!
