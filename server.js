const express = require("express");
const app = express();
const db = require("./db/dbCommands");
const bodyParser = require('body-parser');
const port = 1337;

// Используем bodyParser для обработки данных в формате JSON
app.use(bodyParser.json());

//////////////////////////////users//////////////////////////////
app.get("/user/:login/:pass", async (req, res) => {
    db.checkUser(req.params.login,res);
});
app.post("/users/", async (req, res) => {
    const { name, login, password } = req.body;
    // console.log({ name, login, password });
    await db.createUser({ name, login, password },res);
});
app.get("/users", async (req, res) => {
    const users = await db.getAllUsers();
    res.status(200).json({ users });

});
app.get("/users/:id", async (req, res) => {
    const users = await db.getCurrentUser(req.params.id);
    res.status(200).json({ users });
});
app.patch("/users/:id", async (req, res) => {
    const id = await db.updateUser(req.params.id, req.body);
    res.status(200).json({ id });

});
app.delete("/users/:id", async (req, res) => {
    await db.deleteUser(req.params.id);
    res.status(200).json({ 
        success: true,
        id_deleted: req.params.id})

});
////////////////////////////groups/////////////////////////////////
app.post("/groups", async (req, res) => {
    const results = await db.createGroup(req.body);
    res.status(201).json({ id: results[0]});
});

app.get("/groups", async (req, res) => {
    const groups = await db.getAllGroups();
    res.status(200).json({ groups });
});

app.get("/groupsGetGroupsOwnerUser/:id", async (req, res) => {
    const groups = await db.getGroupsForCurrentOwnerUser(req.params.id);
    res.status(200).json({ groups });
});

app.patch("/groups/:id", async (req, res) => {
    const id = await db.updateGroup(req.params.id, req.body);
    res.status(200).json({ id });
});

app.delete("/groups/:id", async (req, res) => {
    await db.deleteGroup(req.params.id);
    res.status(200).json({ 
        success: true,
        id_deleted: req.params.id})
});
////////////////////////////usersInfo/////////////////////////////////
app.post("/usersInfo", async (req, res) => {
    const results = await db.createUsersInfo(req.body);
    res.status(201).json({ id: results[0]});
});

app.get("/usersInfo", async (req, res) => {
    const usersInfo = await db.getAllUsersInfo();
    res.status(200).json({ usersInfo });
});

app.get("/getUsersInfoForCurrentUser/:id", async (req, res) => {
    const usersInfo = await db.getUsersInfoForCurrentUser(req.params.id);
    res.status(200).json({ usersInfo });
});

app.get("/getUsersInfoForCurrentGroup/:id", async (req, res) => {
    const usersInfo = await db.getUsersInfoForCurrentGroup(req.params.id);
    res.status(200).json({ usersInfo });
});

app.patch("/usersInfo/:id", async (req, res) => {
    const id = await db.updateUsersInfo(req.params.id,req.body);
    res.status(200).json({ id });
});

app.delete("/usersInfo/:id", async (req, res) => {
    await db.deleteUsersInfo(req.params.id);
    res.status(200).json({ 
        success: true,
        id_deleted: req.params.id})
});

app.listen(port, () => console.log("Server is running on port 1337"));
// app.listen(
//     port, '192.168.0.3', () => console.log(`Server is running on port ${port}`)
//     );