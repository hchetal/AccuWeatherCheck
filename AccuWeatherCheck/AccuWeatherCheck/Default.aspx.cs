using AccuWeatherService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services.Description;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AccuWeatherCheck
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var userName= Context.User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                Response.Redirect("Account/Login.aspx");
            }
            
          

                    
        }
    }
}