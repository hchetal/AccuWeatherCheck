using AccuWeatherService;
using AccuWeatherService.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace AccuWeatherService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract(SessionMode = SessionMode.NotAllowed)]
   
    
    public interface IServiceDB
    {

        [OperationContract]
        [WebGet(UriTemplate = "AddFavouritesToDb/{locationKey}/{place}/{country}/{region}/{userID}", ResponseFormat = WebMessageFormat.Json)]

        string AddFavouritesToDb(string locationKey, string place,string country,string region,string userID);

        [OperationContract]
        [WebGet(UriTemplate = "GetUsersFavourites/{userID}", ResponseFormat = WebMessageFormat.Json)]
        List<Favourite> GetUsersFavourites(string userID);


        
    }


    
}
