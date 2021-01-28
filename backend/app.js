const exp=require("express");
const bp=require('body-parser');
const NotesRouts =require("./routes-js/notes-routes");
const CourseRoutes =require("./routes-js/courses-routes");
const AssignmentsRoutes =require("./routes-js/assignments-routes");
const SetRoutes =require("./routes-js/set-routes");
const FcRoutes =require("./routes-js/flashcard-routes");



const app=exp();
app.use(bp.urlencoded({extended:true}))
app.use("/api/courses",CourseRoutes);
app.use("/api/notes",NotesRouts);
app.use("/api/assignments",AssignmentsRoutes);
app.use("/api/sets",SetRoutes);
app.use("/api/flashcards",FcRoutes);





app.listen(5000,function(){
  console.log("server has started");
});