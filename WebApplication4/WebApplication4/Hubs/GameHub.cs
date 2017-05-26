using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SignalRMvc.Models;


namespace SignalRMvc.Hubs
{
    public class GameHub : Hub
    {
        static List<Player> Players = new List<Player>();

        public void Connect(string username, int skinId, int color)
        {
            var id = Context.ConnectionId;

            if (!Players.Any(p => p.ConnectionId == id))
            {
                if (Players.Any(p => p.Name == username))
                {
                    // Such username exists
                    Clients.Caller.onLoginFailed();
                }
                else
                {
                    var newPlayer = new Player()
                    {
                        ColorId = new Random().Next(11),
                        ConnectionId = id,
                        IsDead = false,
                        Name = username
                    };
                    Players.Add(newPlayer);

                    // Посылаем сообщение текущему пользователю
                    Clients.Caller.onConnected(id, username, Players);

                    // Посылаем сообщение всем пользователям, кроме текущего
                    Clients.AllExcept(id).onNewPlayerConnected(id, newPlayer);
                }
            }
        }

        public void ChangeDir(int dir)
        {

        }
    }
}