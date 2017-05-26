using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRMvc.Models
{
    public class Player
    {
        [JsonProperty("id")]
        public string ConnectionId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("positionX")]
        public int PositionX { get; set; }
        [JsonProperty("positionY")]
        public int PositionY { get; set; }
        [JsonProperty("moveX")]
        public int MoveX { get; set; }
        [JsonProperty("moveY")]
        public int MoveY { get; set; }
        [JsonProperty("isDead")]
        public bool IsDead { get; set; }
        [JsonProperty("colorId")]
        public int ColorId { get; set; }

        public Player()
        {
            Initialize();
        }

        private void Initialize()
        {
            switch(new Random().Next(1, 4))
            {
                case 1:
                    this.MoveX = 0;
                    this.MoveY = 1;
                    break;
                case 2:
                    this.MoveX = 1;
                    this.MoveY = 0;
                    break;
                case 3:
                    this.MoveX = 0;
                    this.MoveY = -1;
                    break;
                case 4:
                    this.MoveX = -1;
                    this.MoveY = 0;
                    break;
            }

            this.PositionX = 0;
            this.PositionY = 0;
        }
    }
}