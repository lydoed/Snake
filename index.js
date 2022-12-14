import fs from 'fs'
import express  from 'express'
import path from 'path'
import bodyParser from 'body-parser'


const __dirname = path.resolve()


const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({extended : false}))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})  

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'page'));


app.get('/', (req, res) => {
    res.render(path.resolve(__dirname, 'page', 'main.ejs'), {record:record()})
})


app.post('/', (req, res) => {
    let a = 1
    let name = JSON.parse(req.body.name)
    if(a == 1){
        fs.appendFile('records.txt', `|${name.name}|${name.score}`, err =>{})
        a++
    }else if(a == 2){}
})


function record(){
    let user_record = []
    let text_with_rec = fs.readFileSync('records.txt', 'utf-8',()=>{}).split('|')
    let coun = 0
    let modul = 1
    text_with_rec.forEach((value)=>{
    if(coun%2 == 0){
        user_record.push({user:value})
        coun++
    }else if(coun%2 == 1){
        user_record[coun-modul].score = Number(value)
        coun++
        modul++
    }})
    return user_record
}


