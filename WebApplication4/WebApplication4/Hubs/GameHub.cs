using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SignalRMvc.Models;
using WebApplication4.Models;
using System.Threading;
using System.Drawing;

namespace SignalRMvc.Hubs
{
    public class GameHub : Hub
    {
        static GameManager gm = new GameManager();

        static bool GameOn =false;
        public GameHub()
        {
           
            if (!GameOn)
            {
                GameOn = true;
                gm.Hub = this;
                Thread t = new Thread(gm.MainLoop);
                t.Start();
            }
           
        }

        public void AllUpdate()
        {
            
                Clients.All.Update();
            
        }
        
        public void Connect(string username, int skinId, int color)
        {
            var id = Context.ConnectionId;

            if (!gm.Players.Any(p => p.ConnectionId == id))
            {
                if (gm.Players.Any(p => p.Name == username))
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
                        Name = username,

                        PositionX =0,
                        PositionY =0,
                        MoveX = 1,
                        MoveY =0

                        Tail = new Tail()

                    };
                    // Посылаем сообщение текущему пользователю
                    Clients.Caller.onConnection(id, username, gm.Players);
                    gm.Players.Add(newPlayer);
                    //Players.Add(newPlayer);

          

                    // Посылаем сообщение всем пользователям, кроме текущего
                    Clients.AllExcept(id).onNewPlayerConnected(id, newPlayer);
                }
            }
        }

        public void ChangeDir(int dir)
        {
            var id = Context.ConnectionId;

            if (gm.Players.Any(p => p.ConnectionId == id))
            {
                var player = gm.Players.FirstOrDefault(p => p.ConnectionId == id);
                switch(dir)
                {
                    case 1:
                        player.MoveX = 0;

                        player.MoveY = -1;

                        player.Tail.MakePoint(new Point(player.PositionX, player.PositionY));

                        break;
                    case 2:
                        player.MoveX = 1;
                        player.MoveY = 0;
                        player.Tail.MakePoint(new Point(player.PositionX, player.PositionY));
                        break;
                    case 3:
                        player.MoveX = 0;

                        player.MoveY = 1;

                        player.Tail.MakePoint(new Point(player.PositionX, player.PositionY));

                        break;
                    case 4:
                        player.MoveX = -1;
                        player.MoveY = 0;
                        player.Tail.MakePoint(new Point(player.PositionX, player.PositionY));
                        break;
                }

                Clients.Caller.notifyDirectionChanged(player);
                Clients.AllExcept(id).notifyDirectionChanged(player);
            }
        }
    }
}