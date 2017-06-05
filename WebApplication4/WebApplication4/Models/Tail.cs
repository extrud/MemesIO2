using SignalRMvc.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace WebApplication4.Models
{
    public class Tail
    {
        public List<Point> Points { get; set; }
        public Player Player { get; set; }

        public void MakePoint()
        {
            Points.Add(new Point(Player.PositionX, Player.PositionY));
        }
    }
}