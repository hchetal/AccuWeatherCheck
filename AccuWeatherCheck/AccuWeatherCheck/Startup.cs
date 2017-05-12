using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AccuWeatherCheck.Startup))]
namespace AccuWeatherCheck
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
