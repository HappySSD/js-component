var Direction = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37
};

var Common = {
    width: 20,
    height: 20,
    speed: 250,
    workThread: null,
};

window.onload = function() {
    var control = new Control();
    control.Init("pannel");
    document.getElementById("btnStart").onclick = function() {
        control.Start();
        this.disabled = true;
        document.getElementById("selSpeed").disabled = true;
        document.getElementById("selSize").disabled = true;
    };
    document.getElementById("selSpeed").onchange = function() {
        Common.speed = this.value;
    };
    document.getElementById("selSize").onchange = function() {
        Common.width = this.value;
        Common.height = this.value;
        control.Init("pannel");
    };
};

function Control() {
    this.snake = new Snake();
    this.food = new Food();
    this.Init = function(pid) {
        var html = [];
        html.push("<table>");
        for (var y = 0; y < Common.height; y++) {
            html.push("<tr>");
            for (var x = 0; x < Common.width; x++) {
                html.push('<td id="box_' + x + "_" + y + '"> </td>');
            }
            html.push("</tr>");
        }
        html.push("</table>");
        this.pannel = document.getElementById(pid);
        this.pannel.innerHTML = html.join("");
    };
    this.Start = function() {
        var me = this;
        this.MoveSnake = function(ev) {
            var evt = window.event || ev;
            me.snake.SetDir(evt.keyCode);
        };
        try {
            document.attachEvent("onkeydown", this.MoveSnake);
        } catch (e) {
            document.addEventListener("keydown", this.MoveSnake, false);
        }
        this.food.Create();
        Common.workThread = setInterval(function() {
            me.snake.Eat(me.food);
            me.snake.Move();
            document.getElementById('score').innerHTML='得分：'+me.snake.score;
        }, Common.speed);
    };
}

function Snake() {
    this.isDone = false;
    this.dir = Direction.RIGHT;
    this.pos = new Array(new Position());
    this.score=0;
}
Snake.prototype.Move = function() {
    document.getElementById("box_" + this.pos[0].X + "_" + this.pos[0].Y).className = "";
    for (var i = 0; i < this.pos.length - 1; i++) {
        this.pos[i].X = this.pos[i + 1].X;
        this.pos[i].Y = this.pos[i + 1].Y;
    }
    var head = this.pos[this.pos.length - 1];
    switch (this.dir) {
        case Direction.UP:
            head.Y--;
            break;
        case Direction.RIGHT:
            head.X++;
            break;
        case Direction.DOWN:
            head.Y++;
            break;
        case Direction.LEFT:
            head.X--;
            break;
    }
    this.pos[this.pos.length - 1] = head;
    for (var k = 0; k < this.pos.length; k++) {
        var isExits = false;
        for (var j = k + 1; j < this.pos.length; j++)
            if (this.pos[j].X == this.pos[k].X && this.pos[j].Y == this.pos[k].Y) {
                isExits = true;
                break;
            }
        if (isExits) {
            this.Over();
            break;
        }
        var obj = document.getElementById("box_" + this.pos[k].X + "_" + this.pos[k].Y);
        if (obj){
          obj.className = "snake";
        }
        else {
            this.Over();
            break;
        }
    }
    this.isDone = true;
};
Snake.prototype.Over = function() {
    clearInterval(Common.workThread);
    alert("游戏结束！得分："+this.score);
    location.reload();
};
Snake.prototype.Eat = function(food) {
    var head = this.pos[this.pos.length - 1];
    var isEat = false;
    switch (this.dir) {
        case Direction.UP:
            if (head.X == food.pos.X && head.Y == food.pos.Y + 1) isEat = true;
            break;
        case Direction.RIGHT:
            if (head.Y == food.pos.Y && head.X == food.pos.X - 1) isEat = true;
            break;
        case Direction.DOWN:
            if (head.X == food.pos.X && head.Y == food.pos.Y - 1) isEat = true;
            break;
        case Direction.LEFT:
            if (head.Y == food.pos.Y && head.X == food.pos.X + 1) isEat = true;
            break;
    }
    if (isEat) {
        this.pos[this.pos.length] = new Position(food.pos.X, food.pos.Y);
        food.Create(this.pos);
        this.score++;
    }
};
Snake.prototype.SetDir = function(dir) {
    switch (dir) {
        case Direction.UP:
            if (this.isDone && this.dir != Direction.DOWN) {
                this.dir = dir;
                this.isDone = false;
            }
            break;
        case Direction.RIGHT:
            if (this.isDone && this.dir != Direction.LEFT) {
                this.dir = dir;
                this.isDone = false;
            }
            break;
        case Direction.DOWN:
            if (this.isDone && this.dir != Direction.UP) {
                this.dir = dir;
                this.isDone = false;
            }
            break;
        case Direction.LEFT:
            if (this.isDone && this.dir != Direction.RIGHT) {
                this.dir = dir;
                this.isDone = false;
            }
            break;
    }
};

function Food() {
    this.pos = new Position();
    this.score=0;
    this.Create = function(pos) {
      this.score++;
        document.getElementById("box_" + this.pos.X + "_" + this.pos.Y).className = "";
        var x = 0,
            y = 0,
            isCover = false;
        do {
            x = parseInt(Math.random() * (Common.width - 1));
            y = parseInt(Math.random() * (Common.height - 1));
            isCover = false;
            if (pos instanceof Array) {
                for (var i = 0; i < pos.length; i++) {
                    if (x == pos[i].X && y == pos[i].Y) {
                        isCover = true;
                        break;
                    }
                }
            }
        } while (isCover);
        this.pos = new Position(x, y);
        document.getElementById("box_" + x + "_" + y).className = "food";
    };
}

function Position(x, y) {
    this.X = 0;
    this.Y = 0;
    if (arguments.length >= 2) {
        this.X = x;
        this.Y = y;
    }
}
