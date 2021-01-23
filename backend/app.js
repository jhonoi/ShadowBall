const exp=require("express");
const bp=require('body-parser');
const NotesRouts =require("./routes-js/notes-routes");



const app=exp();
app.use(bp.urlencoded({extended:true}))

app.use("/api/notes",NotesRouts);





app.listen(5000,function(){
  console.log("server has started");
});