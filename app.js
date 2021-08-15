const express = require('express');
const path = require('path');
const app = express();

const mainRouter = require('./src/routes/mainRouter');
const userRouter = require('./src/routes/userRouter');

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.set('view engine', 'ejs');

app.set('puerto', process.env.PORT || "8080");

app.listen(app.get('puerto'), () => {
    console.log(`[app] http://localhost:8080`);
} );


app.use(mainRouter); 
app.use(userRouter); 