using AccuWeatherService.Model;
using System;
using System.Collections.Generic;

namespace AccuWeatherService

{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.

    public class ServiceDb : IServiceDB
    {

        public string AddFavouritesToDb(string locationKey, string place, string country, string region, string userID)
        {
            try
            {
                var obj = DbController.AddFavouritesToDb(userID, locationKey,  place,  country,  region);
                return obj;
            }

            catch(Exception ex)
            {
                throw new Exception(ex.InnerException.ToString());
                
            }

        }

        public List<Favourite> GetUsersFavourites(string userID)
        {
            try
            {
                var obj = DbController.GetUsersFavourites(userID);
                return obj;
            }

            catch (Exception ex)
            {
                throw new Exception(ex.InnerException.ToString());

            }
        }

     }
}
