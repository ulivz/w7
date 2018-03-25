<p align="center">
  <img src="https://rawgit.com/ulivz/w7/master/.media/logo.png" alt="w7">
</p>

<p align="center">
  <b><i>Server the pure htmls, Updates the browser on changes.</i></b>
</p>

<p align="center">
  <a href="https://npmjs.com/package/w7"><img src="https://img.shields.io/npm/v/w7.svg?style=flat" alt="NPM version"></a> 
  <a href="https://npmjs.com/package/w7"><img src="https://img.shields.io/npm/dm/w7.svg?style=flat" alt="NPM downloads"></a>
  <a href="https://circleci.com/gh/ulivz/w7/tree/master"><img src="https://circleci.com/gh/ulivz/w7/tree/master.svg?style=shield" alt="CircleCI"></a>
  <a href="https://github.com/ulivz/donate"><img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat" alt="donate"></a>
</p>


## Features

* Simple CLI without built process.
* Hot code reloading.
* Automatically transforms JS files using Buble/Babel (Vue & React).
* Built-in boilerplates

## Install

```bash
npm i w7 -g
```

## Usage

```bash
  w7                                     # Default entry: './index.html'   
  w7 --entry app.html                    # Custom entry (alias: -c)
  w7 app.html                            # Shortcut
  w7 --entry ./app.html --port 1994      # Custom port (alias: -p)
  w7 app.html --cwd src                  # Custom cwd (alias: -c)
  w7 src/app.html --cwd src              # Ditto 
  w7 app.html --open-in-browser          # Open browser when server started (alias: -o)
```

All options:

```
  COMMAND OPTIONS

    -c, --cwd            Current working directory.
    -e, --entry          Entry html file.
    -p, --port           Dev server's port [Default: 4000]
    -o, --openInBrowser  Whether to open browser when server started.

  GLOBAL OPTIONS

    -v, --version  Display version
    -h, --help     Display help
```

## Q & A

- Is this project not the opposite of front-end engineering?

  No, the reason for the birth of this project is not to resist front-end engineering. It is only for the excessive development of front-end engineering. We often need a lot of construction processes to test a very simple function. With this project, it will be very useful when just testing some simple prototype features. In other words, it is more like an offline version of [**_codepan_**](https://codepan.net)


## Boilerplate

From `w7@0.0.4`, some preset boilerplates for you to kick off your project quickly.

```bash
  w7 init              # Generate a simple html file with random filename (includes git user name.)
  w7 init --lib vue    # Generate a Counter boilerplate with vue.
  w7 init --lib react  # Generate a Counter boilerplate with React+JSX.
```

Built-in boilerplates for now:

- vue
- react
- rxjs

Unbuilt libraries will be injected from unpkg directly:

```bash
  w7 init -lib jquery   # <script src="http://unpkg.com/jquery"></script> will be injected.
```

Free free to tell me what your want to be built in. :)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**w7** © [ulivz](https://github.com/ULIVZ), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by ulivz with help from contributors ([list](https://github.com/ULIVZ/w7/contributors)).

> [github.com/ulivz](https://github.com/ulivz) · GitHub [@ulivz](https://github.com/ULIVZ)
