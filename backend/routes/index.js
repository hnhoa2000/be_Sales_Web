import procductRouter from "./productRouter.js";
import homeRouter from "./homeRouter.js";
import accountRouter from "./accountRouter.js";
import authRouter from "./authRouter.js";
import categoryRouter from "./categoryRouter.js";

function route(app) {
    app.use('/account', accountRouter);
    app.use('/auth', authRouter);
    app.use('/category', categoryRouter);
    app.use('/product', procductRouter);
    app.use('/', homeRouter);
}

export default route;