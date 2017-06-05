using SignalRMvc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading;
namespace WebApplication4.Models
{
    public class GameManager
    {
      
        public GameManager()
        {
            Players = new List<Player>();
            Tails = new List<Tail>();
            Blocks = new List<Block>();

         

        }
        public SignalRMvc.Hubs.GameHub Hub;
        public List<Player> Players { get; set; }
        public List<Tail> Tails { get; set; }
        public List<Block> Blocks { get; set; }

        public void MainLoop()
        {
            while (true)
            {
                Thread.Sleep(700);
                Hub.AllUpdate();
                Update();
            }
        }

        public void Update()
        {
            foreach (var p in Players)
            {
                p.PositionX += p.MoveX;
                p.PositionY += p.MoveY;

            }
        }

        public void ControlInput(int id, int control)
        {

        }

        public void CheckCollisions(Player player)
        {

        }
    }
}