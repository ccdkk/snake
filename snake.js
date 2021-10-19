var x = '<td></td>'
var y = '<tr></tr>'
var table = document.getElementById("map")
var apple_location = [0, 1]
var tale_location = [0, 0, ""]
var score = []

for (let i = 0; i < 20; i++) {
    $('.container').append(y)
};

for (let i = 0; i < 20; i++) {
    $('tr').append(x)
};


table.rows[0].cells[0].className += " snake"

let direction = "";

var head_location = [0, 0];
var curved_points = []


window.addEventListener("keydown", move_head)
function move_head(e) {
    if (e.keyCode == 38) {
        direction = "상"
        curved_points.push([...head_location, direction])
    } else if (e.keyCode == 37) {
        direction = "좌"
        curved_points.push([...head_location, direction])
    } else if (e.keyCode == 39) {
        direction = "우"
        curved_points.push([...head_location, direction])
    } else if (e.keyCode == 40) {
        direction = "하"
        curved_points.push([...head_location, direction])
    }
}

function reverse_direction하(e) {
    if (e.keyCode == 38) {
        게임종료()
    }
}

function reverse_direction상(e) {
    if (e.keyCode == 40) {
        게임종료()
    }
}

function 게임종료() {
    clearInterval(interval);
    document.getElementById('gameover_banner').className += " gameover_show";
    document.getElementById('score_board').innerHTML = 'score:' + score.length * 10
}


function reverse_direction좌(e) {
    if (e.keyCode == 39) {
        게임종료()
    }
}

function reverse_direction우(e) {
    if (e.keyCode == 37) {
        게임종료()
    }
}

function change_apple() {
    apple_location = [rand(0, 19), rand(0, 19)]

    table.rows[apple_location[0]].cells[apple_location[1]].className += " apple";
}



function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

function snake_game() {
    change_apple();


    interval = setInterval(function () {
        const cur_apple = table.rows[apple_location[0]].cells[apple_location[1]];
        const cur_tale_location = table.rows[tale_location[0]].cells[tale_location[1]];
        while (cur_apple.className == " snake apple" || cur_apple.className == "snake apple") {
            cur_apple.className = cur_apple.className.substring(0, cur_apple.className.indexOf('apple') - 1)
            change_apple();
        }
        if (curved_points.length > 0) {
            if (tale_location[0] == curved_points[0][0] && tale_location[1] == curved_points[0][1]) {

                tale_location[2] = curved_points[0][2];
                curved_points.shift();
            }
        }


        if (tale_location[2] == "하") {
            cur_tale_location.className = cur_tale_location.className.substring(0, cur_tale_location.className.indexOf('snake') - 1);
            tale_location[0] = tale_location[0] + 1
        } else if (tale_location[2] == "상") {
            cur_tale_location.className = cur_tale_location.className.substring(0, cur_tale_location.className.indexOf('snake') - 1);
            tale_location[0] = tale_location[0] - 1
        } else if (tale_location[2] == "좌") {
            cur_tale_location.className = cur_tale_location.className.substring(0, cur_tale_location.className.indexOf('snake') - 1);
            tale_location[1] = tale_location[1] - 1
        } else if (tale_location[2] == "우") {
            cur_tale_location.className = cur_tale_location.className.substring(0, cur_tale_location.className.indexOf('snake') - 1);
            tale_location[1] = tale_location[1] + 1
        }


        if (direction == "하") {
            head_location[0] = head_location[0] + 1
            if (head_location[0] == 20) {
                게임종료()
            }
            table.rows[head_location[0]].cells[head_location[1]].className += " snake";
        } else if (direction == "상") {
            head_location[0] = head_location[0] - 1
            if (head_location[0] == -1) {
                게임종료()
            }
            table.rows[head_location[0]].cells[head_location[1]].className += " snake";
        } else if (direction == "우") {
            head_location[1] = head_location[1] + 1
            if (head_location[1] == 20) {
                게임종료()
            }
            table.rows[head_location[0]].cells[head_location[1]].className += " snake";
        }
        else if (direction == "좌") {
            head_location[1] = head_location[1] - 1
            if (head_location[1] == -1) {
                게임종료()
            }
            table.rows[head_location[0]].cells[head_location[1]].className += " snake";
        };




        if (apple_location[0] == head_location[0] && apple_location[1] == head_location[1]) {

            cur_apple.className = cur_apple.className.substring(cur_apple.className.indexOf('snake'), cur_apple.className.indexOf('snake') + 5)
            change_apple();

            score.push([...apple_location]);

            if (tale_location[2] == "하") {
                tale_location[0] = tale_location[0] - 1
            } else if (tale_location[2] == "상") {
                tale_location[0] = tale_location[0] + 1
            } else if (tale_location[2] == "좌") {
                tale_location[1] = tale_location[1] + 1
            } else if (tale_location[2] == "우") {
                tale_location[1] = tale_location[1] - 1
            }
        };


        if (table.rows[head_location[0]].cells[head_location[1]].className == " snake snake") {
            게임종료()
        }
    }, 100)

}


document.getElementById("btn-start").addEventListener('click', function () {
    snake_game()
});

window.onload = function () {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        snake_game();
    }
}

function reloadP() {
    sessionStorage.setItem("reloading", "true");
    document.location.reload();
}