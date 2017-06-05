using SignalRMvc.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace WebApplication4.Models
{
    public class Block
    {
        public Player Player { get; set; }
        public Point Position { get; set; }
    }
}