document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('.start-button')
    const width = 10

    //L tetromino
    const lTetromino = [
        [1,width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    //O
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    //T
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    //Z
    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2, width*2+1],
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2, width*2+1]
    ]
    //I
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const tetrominos = [lTetromino, oTetromino, zTetromino,tTetromino, iTetromino]

    let currentPosition = 3
    let currentRotation = 0
    let randomTetrimino = Math.floor(Math.random()*tetrominos.length)
    let randomOrientation = Math.floor(Math.random()*4)
    let current = tetrominos[randomTetrimino][currentRotation]


    //draw the tetromino
    function draw(){
        current.forEach(index => {
            squares[currentPosition+index].classList.add('tetromino')
        });
    }
    //udraws the tetrominos drawn
    function unDraw(){
        current.forEach(index => {
            squares[currentPosition+index].classList.remove('tetromino')
        });
    }

    //assign functions to keycodes
    function  control(e){
        if(e.keyCode===37) moveLeft()
        else if(e.keyCode===38) rotate()
        else if(e.keyCode===39) moveRight()
        else if(e.keyCode===40) moveDown()
    }
    document.addEventListener('keyup', control)

    //automove the tetromino down
    function moveDown(){
        unDraw()
        currentPosition+=width
        draw()
        freeze()
    }

    function freeze(){
        if(current.some(index =>squares[currentPosition+index+width].classList.contains('taken'))){
            current.forEach(index=>squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            randomTetrimino =  Math.floor(Math.random()*tetrominos.length)
            current = tetrominos[randomTetrimino][currentRotation]
            currentPosition = 3
            draw()
        }
    }

    //move the tetromino left, until hit the left edge
    function moveLeft(){
        unDraw()
        const isAtLeftEdge = current.some(index=>(currentPosition+index)%width==0)
        if(!isAtLeftEdge){
            currentPosition -=1
        }
        if(current.some(index=>squares[currentPosition+index].classList.contains('taken'))){
            currentPosition+=1
        }
        draw()
    }

    function moveRight(){
        unDraw()
        const isAtRightEdge = current.some(index=>(currentPosition+index)%width==width-1)
        if(!isAtRightEdge){
            currentPosition +=1
        }
        if(current.some(index=>squares[currentPosition+index].classList.contains('taken'))){
            currentPosition+=1
        }
        draw()
    }

    function rotate(){
        unDraw()
        currentRotation++
        if(currentRotation == current.length) currentRotation=0
        current = tetrominos[randomTetrimino][currentRotation]

        draw()
    }


    timerId = setInterval(moveDown, 1000)


    //show up-next tetromino in the mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    

























    // draw();
})