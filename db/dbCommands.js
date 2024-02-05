const { json } = require("body-parser");
const knex = require("./knex");

/////////////////////////users////////////////////////////////

async function createUser(user,res) {
    const login = user.login;
    const loginExists = !!await knex("users").where("login",login).first();
    if(loginExists){
        res.status(201).json({  login: "exists" });
    }else{
        console.log(user);
        res.status(201).json({ user: "added" });
        return knex("users").insert(user);
    }
};
function getAllUsers(){
    return knex("users").select("*");
};
function getCurrentUser(id){
    return knex("users").select('*').where("id", id);
}
function deleteUser(id) {
    return knex("users").where("id", id).del();
};

function updateUser(id, user) {
    return knex("users").where("id", id).update(user);
};

async function checkUser(login,res) {
    const user = await knex("users")
    .where("login", login)
    .first(); 
    
    const userExists = !!user; // Преобразуем объект пользователя в boolean
    
    if (userExists) {
        // Пользователь существует
        res.status(200).json({ login: true });
        console.log("Пользователь найден - " + userExists);
    } else {
        // Пользователь не существует
        res.status(200).json({ login: false });
        console.log("Пользователь не найден - " + userExists);
    }
    return userExists;
};

/////////////////////////group////////////////////////////////

function createGroup(group) {
    return knex("groups").insert(group);
};
function getAllGroups(){
    return knex("groups").select("*");
};
function getGroupsForCurrentOwnerUser(id){
    return knex("groups").select('*').where("owner", id);
};
function getGroupsForCurrentUser(id){
    const varr = knex("usersInfo").select('*').where("userId", id);
    // const varr2 = knex("groups").select('*').where("id", varr.select('2'));
    return knex("groups").select('*').where("id", varr.select('groupId'));
};
function updateGroup(id,group){
    return knex("groups").where("groupId", id).update(group);
};
function deleteGroup(id){
    return knex("groups").where("groupId", id).del();
};

/////////////////////////usersInfo////////////////////////////////

function createUsersInfo(usersInfo) {
    return knex("usersInfo").insert(usersInfo);
};
function getAllUsersInfo(){
    return knex("usersInfo").select("*");
};
function getUsersInfoForCurrentUser(userId){
    return knex("usersInfo").select('*').where("userId", userId);
};
function getUsersInfoForCurrentGroup(groupId){
    return knex("usersInfo").select('*').where("groupId", groupId);
};
function updateUsersInfo(id,usersInfo){
    return knex("usersInfo").where("id", id).update(usersInfo);
};
function deleteUsersInfo(id){
    return knex("usersInfo").where("id", id).del();
};


module.exports = {
    createUser,
    getAllUsers,
    getCurrentUser,
    deleteUser,
    updateUser,
    checkUser,

    deleteGroup,
    getAllGroups,
    updateGroup,
    getGroupsForCurrentUser,
    getGroupsForCurrentOwnerUser,
    createGroup,

    createUsersInfo,
    deleteUsersInfo,
    getAllUsersInfo,
    updateUsersInfo,
    getUsersInfoForCurrentUser,
    getUsersInfoForCurrentGroup
}