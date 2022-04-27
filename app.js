const express = require('express');
const path = require('path');
const app = express();

const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

const session = require('express-session');
const cookieParser = require('cookie-parser'); 

const acceso = require('./src/middlewares/acceso');

const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRouter');
const userRouter = require('./src/routes/userRouter');
const shoppingCartRouter = require('./src/routes/shoppingCartRouter');

const adminProductRoutes = require('./src/routes/admin/adminProductRoutes');

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());


//Middlewares que levantan el servidor
app.set('puerto', process.env.PORT || "8080");
app.listen(app.get('puerto'), () => {
    console.log(`[app] http://localhost:8080`);
} );

//Middlewares que habilitan la funcionalidad de session y cookies
app.use(session({
    secret : 'Vigilancia Argentina Sessions',
    resave: true,
    saveUninitialized: true,
}))
app.use(cookieParser());


//Middleware de aplicación que se encarga de controlar si el usuario está logueado o no.
app.use(acceso);

//Middlewares que hablitan las rutas
app.use(mainRouter); 
app.use('/product', productRouter); 
app.use(userRouter); 
app.use(shoppingCartRouter);

app.use('/admin/product', adminProductRoutes);