var GameBoard = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1425;
        this.canvas.height = 550;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function startGame() {
    // background = new asset(1400, 550, "/assets/forest", 0, 0, "image");
    myGamePiece = new component(150, 150, "/assets/kirby.png", 200, 200, "image");
    question = new personal(100, 100, "/assets/questionbox.png", 600, 100, "image");
    linked = new linkedin(100, 100, "/assets/linkedin.png", 900, 100, "image");
    github = new git(100, 100, "/assets/github.png", 1200, 100, "image");
    GameBoard.start();
    jumpsound = new sound("/assets/jump.wav");
    sit = new sound("/assets/sit.wav");
    coin = new sound("/assets/coin.wav");
    lvlup = new sound("/assets/lvlup.wav")
    powerup = new sound("/assets/powerup.wav")
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.7;
    this.gravitySpeed = 5;
    this.bounce = 0.8;
    this.update = function() {
        ctx = GameBoard.context;
        ctx.save();
        ctx.translate(this.x, this.y); 
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height); 
        ctx.restore(); 
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitLeft();
        this.hitRight();
    }
    this.hitBottom = function() {
    	var rockbottom = GameBoard.canvas.height - 100;
    		if (this.y > rockbottom) {
    			this.y = rockbottom;
    			this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    		}
    }
    this.hitLeft = function() {
    	var Left = 90;
    		if (this.x < Left) {
    			this.x = Left;
    		}
    }
    this.hitRight = function() {
    	var Right = GameBoard.canvas.width - (this.width) + 90;
    		if (this.x > Right) {
    			this.x = Right;
    		}
    }
    this.touch = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
}


function asset(width, height, color, x, y, type) {
    this.counter = 1;
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color + this.counter + ".gif";
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.update = function() {
        this.counter += 1
        ctx = GameBoard.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function linkedin(width, height, color, x, y, type) {
    this.type = type;
    this.available = true;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = GameBoard.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.reaction = function() {
        if (this.available) {
            myGamePiece.y = 275;
            this.y = 75;
            this.image.src = "/assets/linkedout.png"
            setTimeout(resetlinkBox,500);
            setTimeout(resetlinkBoxImage, 1000);
            setTimeout(resetLinkAvailable, 2000);
            this.available = false;
            lvlup.play();
            OpenInNewTab("https://www.linkedin.com/in/dannyhwangca")
        } else {
            myGamePiece.y = 275;
            this.y = 75;
            this.image.src = "/assets/linkedout.png"
            setTimeout(resetlinkBox, 500);
            setTimeout(resetlinkBoxImage, 1000);
            lvlup.play();
        }
    }
}

function resetlinkBox() {
    linked.y = 100;
}

function resetlinkBoxImage() {
    linked.image.src = "/assets/linkedin.png";
}

function resetLinkAvailable() {
    linked.available = true;
}


function personal(width, height, color, x, y, type) {
    this.type = type;
    this.available = true;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = GameBoard.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.reaction = function() {
        if (this.available) {
            myGamePiece.y = 275;
            this.y = 75;
            this.image.src = "/assets/reactionbox.ico"
            setTimeout(resetBox,500);
            setTimeout(resetBoxImage, 1000);
            setTimeout(resetPersonAvailable, 2000);
            this.available = false;
            coin.play();
            OpenInNewTab("http://dannyhwangca.github.io/index.html")
        } else {
            myGamePiece.y = 275;
            this.y = 75;
            this.image.src = "/assets/reactionbox.ico"
            setTimeout(resetBox, 500);
            setTimeout(resetBoxImage, 1000);
            coin.play();
        }
    }
}

function resetPersonAvailable() {
    question.available = true;
}

function resetBox() {
    question.y = 100;
}

function resetBoxImage() {
    question.image.src = "/assets/questionbox.png";
}

function git(width, height, color, x, y, type) {
    this.type = type;
    this.available = true;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = GameBoard.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.reaction = function() {
        if (this.available) {
            myGamePiece.y = 275;
            this.y = 75;
            this.image.src = "/assets/githubup.png"
            setTimeout(resetGitBox,500);
            setTimeout(resetGitBoxImage, 1000);
            setTimeout(resetAvailable, 2000);
            this.available = false;
            powerup.play();
            OpenInNewTab("https://github.com/DannyHwangCA")
        } else {
            myGamePiece.y = 275;
            this.y = 75;
            this.image.src = "/assets/githubup.png"
            setTimeout(resetGitBox, 500);
            setTimeout(resetGitBoxImage, 1000);
            powerup.play();
        }
    }
}

function resetGitBox() {
    github.y = 100;
}

function resetGitBoxImage() {
    github.image.src = "/assets/github.png";
}

function resetAvailable() {
    github.available = true;
}

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
   		myGamePiece.y = 150;
   		jumpsound.play();
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
        window.clearInterval(lR);
        window.clearInterval(rR);
        for (var i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
        setInterval(updateGameArea, 20)
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        myGamePiece.image.src = "/assets/kirby.png"
        sit.play();
    }
    else if (e.keyCode == '37') {
       // left arrow
       	myGamePiece.speedX += -3;
       	myGamePiece.image.src = "/assets/kirby.png";
        lR = setInterval(rotateL, 30);
        window.clearInterval(rR);
        if (myGamePiece.speedX <= -10) {
            myGamePiece.speedX = -10
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
        myGamePiece.speedX += 3;
        myGamePiece.image.src = "/assets/kirby.png";
        rR = setInterval(rotateR, 30);
        window.clearInterval(lR);
        if (myGamePiece.speedX >= 10) {
            myGamePiece.speedX = 10;
        }
    }
}

function rotateL() {
    myGamePiece.angle -= 30 * Math.PI / 180; ;
}

function rotateR() {
    myGamePiece.angle += 30 * Math.PI / 180;
}

function clearmove() {
    myGamePiece.image.src = "/assets/kirby.png";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function updateGameArea() {
    if (myGamePiece.touch(question)) {
        question.reaction();
        GameBoard.clear();
        // background.update();
        question.update();
        linked.update();
        github.update();
        myGamePiece.newPos();
        myGamePiece.update();
    } else if (myGamePiece.touch(linked)) {
        linked.reaction();
        GameBoard.clear();
        // background.update();
        question.update();
        linked.update();
        github.update();
        myGamePiece.newPos();
        myGamePiece.update();
    } else if (myGamePiece.touch(github)) {
        github.reaction();
        GameBoard.clear();
        // background.update();
        question.update();
        linked.update();
        github.update();
        myGamePiece.newPos();
        myGamePiece.update();
    } else {
        GameBoard.clear();
        // background.update();
        question.update();
        linked.update();
        github.update();
        myGamePiece.newPos();
        myGamePiece.update();
    }
}
