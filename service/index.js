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
apiRouter.post("/auth/login", async (req, res) => {
    const user = await getUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            res.cookie("authToken", user.token, { secure: true, httpOnly: true, sameSite: 'strict' })
            res.send({ username: user.username })
            return
        }
    }
    res.status(401).send({ msg: 'Username or password is incorrect' })
});
apiRouter.post("/auth/create", async (req, res) => {
    if (await getUser('username', req.body.username)) {
        res.status(409).send({ msg: "User already exists" })
    } else {
        const user = await createUser(req.body.username, req.body.password)
        res.cookie("authToken", user.token, { secure: true, httpOnly: true, sameSite: 'strict' })
        res.send({ username: user.username })
    }
});
apiRouter.delete("/auth/logout", async (req, res) => {
    const user = await getUser('authToken', req.cookies["authToken"]);
    if (user) {
        delete user.token;
    }
    res.clearCookie("authToken");
    res.status(204).end();
});
apiRouter.get("/games");
apiRouter.post("/games");
apiRouter.delete("/games/:id");
apiRouter.get("/games/:id/players");
apiRouter.post("/games/:id/players");
apiRouter.delete("/games/:id/players/:id");
apiRouter.get("/games/:id/players/:id/equipment-items");
apiRouter.post("/games/:id/players/:id/equipment-items");
apiRouter.delete("/games/:id/players/:id/equipment-items/:id");

async function getUser(field, value) {
    if (!value) {
        return null
    }
    return users.find((user) => user[field] === value)
}
async function createUser(username, password) {
    const passHash = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: passHash,
        authToken: uuid.v4()
    };
    users.push(user)
    return user
}
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});