const canv = document.querySelector("#snake")
const cont = canv.getContext("2d")
const score_html = document.querySelector("#score")
const user_name = document.querySelector("#user")
const name_form = document.querySelector("#name")


const user = []
let usernow = ''

name_form.addEventListener("submit", e => {
    e.preventDefault()
    usernow = user_name.value
    score_html.insertAdjacentHTML("afterend", `<p>${usernow}</p>`)
    user_name.value = ''
    document.addEventListener("keydown", e =>{
        if(e.code == "KeyW"){
            if(par.speedY == par.size){}else{
                par.speedY = -par.size
                par.speedX = 0
            }  
        }else if(e.code == "KeyA"){
            if(par.speedX == par.size){}else{
                par.speedX = -par.size
                par.speedY = 0
            }   
        }else if(e.code == "KeyS"){
            if(par.speedY == -par.size){}else{
                par.speedY = par.size
                par.speedX = 0
            }      
        }else if(e.code == "KeyD"){
            if(par.speedX == -par.size){}else{
                par.speedX = par.size
                par.speedY = 0
            }  
        }else if(e.code == "KeyQ"){
            game()
        }else if(e.code == "KeyE"){
            cancelAnimationFrame( myrek )
        }else if(e.code == "KeyR"){
            cancelAnimationFrame( myrek )
            restart()

        }
    })
})


let myrek =1

const score = {
    real : 0,
    fake : 0
}

let count = 1
const par = {
    speed : 10,
    speedX : 16,
    speedY : 0,
    size : 16,
}

const snake_head = {
    posX: 96,
    posY: 96
}

const snake_taill = {
    count_of_tails: 2,
    tails:[]
}

const dot = {
    x: undefined,
    y: undefined,
    price : 0
}

function random(min,max){
    return Math.round(Math.random()*(max - min) + min)
}


function game(){
    myrek = requestAnimationFrame ( game )
    if (count < par.speed){count++}else{
        count = 1
        cont.clearRect(0 ,0, 320, 400)
        snake()
        dott()
        score_html.innerText = score.real
        if(score.fake >= 50){
            score.fake -= 50
            par.speed *= 0.6
        }
    }
    
}


function snake(){
    cont.fillStyle = "green"
    cont.fillRect(snake_head.posX, snake_head.posY, par.size, par.size)
    snake_taill.tails.forEach( value =>{
        cont.fillStyle = "blue"
        cont.fillRect(value.x, value.y, par.size, par.size)
        if(value.x == snake_head.posX && value.y == snake_head.posY){
            $(() =>{
                $.ajax({
                    async: true,
                    type: 'POST',
                    data: `name={"name":"${usernow}", "score":${score.real}}`,
                })
            });
            newrecord()
            location.reload()
            cancelAnimationFrame( myrek )
            restart()
        }
    })
    if(snake_taill.tails.length == snake_taill.count_of_tails){
        snake_taill.tails.shift()
    }
    snake_taill.tails.push({x:snake_head.posX, y:snake_head.posY})
    snake_head.posX += par.speedX
    snake_head.posY += par.speedY
    if (snake_head.posX >= 320 ){
        snake_head.posX = 0
    }else if(snake_head.posX < 0 ){
        snake_head.posX = 320 - 16
    }else if(snake_head.posY >= 400){
        snake_head.posY = 0
    }else if(snake_head.posY < 0){
        snake_head.posY = 400 - 16
    }
}

function dott(){
    if(dot.x == undefined && dot.y == undefined){
        dot.x = random(0, 19)*16
        dot.y = random(0, 24)*16
        dot.price = random(1,3)
        if(dot.price == 2){
            dot.price = 5
        }else if(dot.price == 3){
            dot.price = 10
        }return
    }else if(snake_head.posX == dot.x && snake_head.posY == dot.y){
        score.real += dot.price
        score.fake += dot.price
        snake_taill.count_of_tails += 1
        dot.x = undefined
        dot.y = undefined
    }else{
        if(dot.price == 1){
            cont.fillStyle = "red"
        }else if(dot.price == 5){
            cont.fillStyle = "brown"
        }else if(dot.price == 10){
            cont.fillStyle = "black"
        }    
        cont.fillRect(dot.x, dot.y, par.size, par.size)
    }
    snake_taill.tails.forEach( value =>{
        if(dot.x == value.x && dot.y == value.y){
            dot.x = undefined
            dot.y = undefined
        }
    })
}

function restart(){
    cont.clearRect(0 ,0, 320, 400)
    snake_taill.count_of_tails = 2
    snake_taill.tails = []
    snake_head.posX = 96
    snake_head.posY = 96
    dot.x = undefined
    dot.y = undefined
    score.real = 0
    score.fake = 0
    par.speed = 10
}