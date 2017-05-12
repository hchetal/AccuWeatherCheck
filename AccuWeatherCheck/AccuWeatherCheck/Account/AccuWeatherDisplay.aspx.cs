using System;

namespace AccuWeatherCheck.Account
{
    public partial class AccuWeatherDisplay : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            userLoggedIn.Value = Context.User.Identity.Name;
        }
    }
}