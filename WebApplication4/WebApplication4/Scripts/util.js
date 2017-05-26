$(function () {
    
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