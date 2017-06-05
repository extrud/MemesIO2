using Newtonsoft.Json;
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
        [JsonProperty("points")]
        public List<Point> Points { get; set; }

        public Tail()
        {
            Points = new List<Point>();
        }

        public void MakePoint(Point point)
        {
            Points.Add(point);
        }
    }
}