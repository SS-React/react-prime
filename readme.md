# React Prime

Library to effortlessly convert your non-SSR React applications into responsive, SSR React applications.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

- Local installation

```
npm install --save react-prime
```

- Install dependencies

```
npm install —save http-server concurrently md5-file ajv ignore-styles react-loadable react-helmet react-router react-frontload workbox-cli
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
** Add picture of CLI here **
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
