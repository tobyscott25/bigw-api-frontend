# BIG W API Frontend

A frontend for the public facing BIG W API at https://api.bigw.com.au/. This project is not affiliated with BIG W or Woolworths Limited in any way.


## CORS Issue

Unfortunately, you are required to have CORS disabled in your browser for this.
To open Chome without web security (checking for CORS), use the following commands.
#### MacOS
```sh
$ open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```
#### GNU/Linux
```sh
$ google-chrome --disable-web-security
```




## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).