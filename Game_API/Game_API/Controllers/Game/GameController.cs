using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Game_API.Controllers.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Game_API.Controllers.Game
{


    [ApiController]
    public class GameController : ControllerBase
    {
        string[] words = { "swarf", "vars", "wars", "arfs", "raws", "vaws", "jaws" , "jars", "saw","var","was", "vas", "vaw", "war", "raw","ras" ,"raj","jaw","jar", "far", "arf", "ars", "as", "aw", "fa", "ar"};
        static Dictionary<String, User> userDetails = new Dictionary<String, User>();
        static User u = new User();
        [HttpPost]
        [Route("api/[controller]/Signup")]
        public User Signup([FromBody] User u)
        {
            if (!userDetails.ContainsKey(u.username))
            {
                User user = new User();
                user.username = u.username;
                user.password = u.password;
                user.power = 100;
                userDetails.Add(u.username,user);
                return user;
            }
            else
                return null;
        }
        [HttpGet]
        [Route("api/[controller]/user")]
        public IEnumerable<User> get()
        {
            Dictionary<String, User>.ValueCollection values = userDetails.Values;
            return values;
        }
        [HttpPost]
        [Route("api/[controller]/Signin")]
        public User Signin([FromBody] string u)
        {
            String[] str = u.Split(":");
            if (userDetails.ContainsKey(str[0]) && userDetails[str[0]].password.Equals(str[1]))
            {
                var user = userDetails[str[0]];
                user.power = 100;
                user.isSignedin = true;
                return user;
            }
            else
                return null;
        }
        [HttpGet]
        [Route("api/[controller]/{username}")]
        public User username(string username)
        {
            if (userDetails.ContainsKey(username))
            {
                
               var value = userDetails[username];
               value.power = 100;

               return value;
            }
            else
                return null;
        }
        [HttpGet]
        [Route("api/[controller]/word/{word}")]
        public bool wordSearch(string word)
        {
            if (words.Contains(word))
            {
                return true;
            }
            else return false;
        }
        [HttpPost]
        [Route("api/[controller]/Sendpower")]
        public bool edit([FromBody] string power)
        {
            String[] str = power.Split(":");
            if (userDetails.ContainsKey(str[0]))
            {
                userDetails[str[0]].power = Convert.ToDouble(str[1]);
                return true;
            }
            else
            {
                return false;
            }
        }
        [HttpGet]
        [Route("api/[controller]/power/{username}")]
        public User getPower(string username)
        {
            if (userDetails.ContainsKey(username))
            {
                var user = userDetails[username];
                return user;
            }
            else
            {
                return null;
            }
        }
        [HttpPost]
        [Route("api/[controller]/logout/{username}")]
        public bool logout(string username)
        {
            if (userDetails.ContainsKey(username))
            {
                userDetails[username].isSignedin = false;
                return true;
            }
            else
            {
                return false;
            }

        }

    }
}