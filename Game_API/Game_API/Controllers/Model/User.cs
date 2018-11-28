using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Game_API.Controllers.Model
{
    public class User
    {
        
        //public List<MobileDetails> mobileList;
        public User()
        {
            //mobileList = new List<MobileDetails>();
        }
        public User(string username, string password, double power, bool isSignedin)
        {
            this.username = username;
            this.password = password;
            this.power = power;
            this.isSignedin = isSignedin;

            //  mobileList = new List<MobileDetails>();
        }
        public string username
        {
            get;
            set;
        }
        public string password
        {
            get;
            set;
        }
        public double power
        {
            get;
            set;
        }

        public bool isSignedin
        {
            get;
            set;
        }
    }
}
