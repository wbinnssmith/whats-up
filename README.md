What'sUp?
=========

What'sUp? is an example of using React with an Express/Socket.io backend for
realtime chat. It explores React's philosophy of top-down data flow as well as
using Browserify and npm to manage dependencies (even css) and build the whole
project. It has a permanent chat log inbetween visits and uses the new web
notification APIs. The chat log is stored entirely in memory on the server, so 
don't go too crazy :)

## Building
To develop, just `npm install && npm watch & node ./server.js`, and to prepare a
minified build for production simply `npm install && npm run build`.

## Screenshot
![](https://raw.githubusercontent.com/wbinnssmith/whats-up/master/WhatUpScreenshot.jpg)
