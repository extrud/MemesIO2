var plr;
var OthPlrs;
function Start() {
}
function getChar(event) {
    return String.fromCharCode(event.keyCode || event.charCode);
}
$(function () {

    var on = false;
    var chat = $.connection.gameHub;
    var game = chat;
    plr = {
        x: 0,
        y: 0,
        movx: +1,
        movy: 0
    }

    


    var c = document.getElementById("cnv");
    ctx = c.getContext("2d");
    ctx.font = "15px Arial";
    $("body").keydown(function control(event) {
          
        var k = getChar(event);
          
        if (k == "W") {
            plr.movx = 0;
            plr.movy = -1;

            chat.server.changeDir(1);

        }
        if (k == "S") {
            plr.movx = 0;
            plr.movy = 1;

            chat.server.changeDir(3);

        }
        if (k == "A") {
            plr.movx =-1;
            plr.movy = 0;

            chat.server.changeDir(4);

        }
        if (k == "D") {
            plr.movx = 1;
            plr.movy = 0;

            chat.server.changeDir(2);

        }
    });
    function Draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillRect(plr.x * 30, plr.y * 30, 30, 30);
        ctx.fillText("You", plr.x * 30, plr.y * 30 -15);
        if (OthPlrs !== undefined)
        for (i = 0; i < OthPlrs.length; i++) {
            ctx.fillRect(OthPlrs[i].Posx * 30, OthPlrs[i].Posy * 30, 30, 30);
            ctx.fillText(OthPlrs[i].name, OthPlrs[i].Posx * 30, OthPlrs[i].Posy * 30 - 15);
        }
    }


     

    chat.client.update = function () {
        if (!on)
            return;
        plr.x += plr.movx;
        plr.y += plr.movy;
        if(OthPlrs !==undefined)
        for (i = 0; i < OthPlrs.length; i++)
        {
            OthPlrs[i].Posx += OthPlrs[i].movex;
            OthPlrs[i].Posy += OthPlrs[i].movey;
        }
        Draw();

    }


    // Функция, вызываемая при подключении нового пользователя


    game.client.onLoginFailed = function () {

        console.log("Such username exists!");
    }

    // Добавляем нового пользователя
    game.client.onNewPlayerConnected = function (id, newPlayer) {

        AddPlayer(id, newPlayer.name);
        OthPlrs.push(newPlayer);
     
    }

    // Удаляем пользователя
    game.client.onPlayerDisconnected = function (id, userName) {

        // код чата
        // $('#' + id).remove();
    }

    game.client.onDirectionChanged = function (dir, id) {

        // вызывается метод хаба чтобы оповестить об изминении движения игрока
        for (i = 0; i < OthPlrs.length; i++) {
            if (OthPlrs[i].id == id) {
                switch (dir) {
                    case 1:
                        OthPlrs[i].movex = 0;
                        OthPlrs[i].movy = -1;
                        break;
                    case 2:
                        OthPlrs[i].movex = 1;
                        OthPlrs[i].movy = 0;
                        break;
                    case 3:

                        OthPlrs[i].movex = 0;
                        OthPlrs[i].movy = 1;
                        break;
                    case 4:

                        OthPlrs[i].movex = -1;
                        OthPlrs[i].movy = 0;
                        break;
                }
            }
        }
    }



            game.client.notifyDirectionChanged = function (plr) {
                console.log(plr);
                for (i = 0; i < OthPlrs.length; i++) {
                    if (OthPlrs[i].id == plr.id)
                    {
                        console.log("CHANGE");
                        OthPlrs[i] = plr;
                    }


                    
                    console.log("Direction changed");

                }
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
            game.client.onConnection = function (id, userName, allUsers) {

    
                OthPlrs = allUsers;
                console.log(allUsers);
                on = true;
            }
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