const express = require('express');
const hbs = require('hbs');
const path = require('path');
// const favicon = require('serve-favicon'); // WHEN YOU INSERT A FAVICON
const bodyParser = require('body-parser');

const livereload = require('livereload'); // Live Reload
const connectLiveReload = require('connect-livereload'); // Live Reload

const indexRouter = require('./src/routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './src/views');
const partialsPath = path.join(__dirname, './src/views/partials');

// //Live Reload ----------------------------------
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirPath);
liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});

app.use(connectLiveReload());
// //Finish Live Reload ----------------------------

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));
// app.use(favicon(path.join(__dirname, './public/img/favicon/', 'favicon.ico'))); // WHEN YOU INSERT A FAVICON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`);
});
