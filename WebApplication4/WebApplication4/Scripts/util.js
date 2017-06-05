var plr;
var OthPlrs;
function Start() {
}
function getChar(event) {
    return String.fromCharCode(event.keyCode || event.charCode);
}
$(function () {
    var chat = $.connection.gameHub;
      
    plr = {
        x: 1,
        y: 1,
        movx: +1,
        movy: 0
    }

    


    var c = document.getElementById("cnv");
    ctx = c.getContext("2d");
    $("body").keydown(function control(event) {
          
        var k = getChar(event);
          
        if (k == "W") {
            plr.movx = 0;
            plr.movy = -1;
            chat.server.changeDir(0);
        }
        if (k == "S") {
            plr.movx = 0;
            plr.movy = 1;
            chat.server.changeDir(2);
        }
        if (k == "A") {
            plr.movx =-1;
            plr.movy = 0;
            chat.server.changeDir(3);
        }
        if (k == "D") {
            plr.movx = 1;
            plr.movy = 0;
            chat.server.changeDir(1);
        }
    });
    function Draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillRect(plr.x * 30, plr.y * 30, 30, 30);
        for (i = 0; i < OthPlrs; i++) {
            ctx.fillRect(OthPlrs[i].x * 30, OthPlrs[i].y * 30, 30, 30);
        }
    }
    chat.onConnected = function (id, userName, allUsers) {

          
        OthPlrs = allUsers;
    }
     
    chat.client.update = function () {

        plr.x += plr.movx;
        plr.y += plr.movy;
        for (i = 0; i < OthPlrs; i++)
        {
            OthPlrs[i].x += OthPlrs[i].movx;
            OthPlrs[i].y += OthPlrs[i].movy;
        }
        Draw();

    }

    // Ссылка на автоматически-сгенерированный прокси хаба
    var game = $.connection.gameHub;

    // Функция, вызываемая при подключении нового пользователя
    game.client.onConnected = function (id, userName, allUsers) {
        
        console.log("Connected.");
        console.log(allUsers);
    }

    game.client.onLoginFailed = function () {

        console.log("Such username exists!");
    }

    // Добавляем нового пользователя
    game.client.onNewPlayerConnected = function (id, newPlayer) {

        AddPlayer(id, newPlayer.name);
    }

    // Удаляем пользователя
    game.client.onPlayerDisconnected = function (id, userName) {

        // код чата
        // $('#' + id).remove();
    }

    game.client.onDirectionChanged = function (dir) {

        // вызывается метод хаба чтобы оповестить об изминении движения игрока
        game.server.changeDir(dir);
    }

    game.client.notifyDirectionChanged = function () {

        // оповещает всех игроков, что другой игрок изменил движение

    }

    // Открываем соединение
    $.connection.hub.start().done(function () {

        // обработка логина
        $("#btnLogin").click(function () {

            console.log("'btnLogin' Click");
            var name = $("#lgnUserName").val();
            if (name.length > 0) {
                game.server.connect(name, 0, 0);
            }
            else {
                alert("Введите имя.");
            }
        });
    });
});
// Кодирование тегов
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}
//Добавление нового пользователя
function AddPlayer(id, name) {

    var userId = $('#hdId').val();

    if (userId != id) {

        console.log(name + " connected!");
        // код чата
        // $("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
    }
}