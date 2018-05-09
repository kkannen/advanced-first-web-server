let express = require("express");
let state = require("./state");
let users = state.users;
let bodyParser = require("body-parser");
let contactRoutes = reqire("./routes/contactRoutes")

app.use(contactRoutes);
const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/users",(request, response)=>{
    response.json(users)
})
// app.get("/users/1",(request, response)=>{
//     response.json(users[0]);
// })

// app.get("/users/:whatever/poop/:whateverElse", (request, response)=> {
//     console.log(request.params)
//     console.log(request.params.whatever)
//     console.log(request.params.whateverElse)
//     response.send("does this work?");})

app.get("/users/:userId", (request, response)=>{
    const foundUser = users.find(user => user["_id"] == request.params.userId)
    response.json(foundUser)
})


app.post("/users",(request, response)=>{
    let lastClientId = users.length;
    lastClientId ++;
    let newUser = {"_id":lastClientId, "name": request.body.name, "occupation": request.body.occupation};
    users.push(newUser);
    response.json(users);
})
app.delete("/users",(request, response)=>{
    users.pop();
    response.send("DELETED")
})


//server lives in port 3002
app.listen(3002, (err) => {
    if (err) {
    return console.log("Error", err);
    }
    console.log("Web server is now living in port 3002");
});
 