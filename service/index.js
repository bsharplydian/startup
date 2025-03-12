const express = require('express');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const app = express();

let users = []
let games = []
let inventories = []

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.get('*', (_req, res) => {
    res.send({ msg: 'Congratulations! You have reached the generic Bag of Holding GET endpoint' });
});
apiRouter.post("/auth/login");
apiRouter.post("/auth/create");
apiRouter.delete("/auth/logout");
apiRouter.get("/games");
apiRouter.post("/game");
apiRouter.get("/players");
apiRouter.post("/player");
apiRouter.get("/equipment_items");
apiRouter.post("/equipment_item");
apiRouter.listen(port, () => {
    console.log(`Listening on port ${port}`);
});