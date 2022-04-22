const express = require('express')
const path = require('path')
const hbs = require('hbs')
require("./db/conn")
const UserEnquiry = require("./models/userEnquiry")
const app = express()
const port = process.env.PORT || 3000;


//Setting the path  
const staticPath = path.join(__dirname, "../public")

app.use(express.json())
app.use(express.urlencoded({extended:false}))


//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")))
app.use(express.static(staticPath))

app.set("view engine", "hbs")
const template_Path = path.join(__dirname, "../templates/views")
app.set("views", template_Path)


//to register partials
const partial_Path = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partial_Path)

app.get("/", (req, res) => {
  res.render("index")
})


app.post("/contact", async(req, res) => {
  try{  
    // res.send(req.body)
    const user_data = new UserEnquiry(req.body);
    await user_data.save();
    res.status(201).render("index")
  }catch(err){
    res.status(500).send(err)
  }
})

app.get("*", (req,res) =>{
  res.render('404Error', {
      errorMsg : "Opps! page not found, Click Here to go back and Expereince Expertise"
  })
})


app.listen(port, () => { console.log("connection established to express") })

