using System;
using System.Collections.Generic;


namespace AccuWeatherService.Model
{
    public static class DbController
    {
        public static string  AddFavouritesToDb(string userId,string locationKey, string place, string country, string region)
        {
            using (var objAccuWeatherEntities = new AccuWeatherEntitiesContext())
            {
                try
                {
                    var userFavorites = new Favourite
                    {

                        UserId = userId,
                        LocationKey = locationKey,
                        Place=place,
                        Country=country,
                        Region=region
                        
                    };

                    objAccuWeatherEntities.Favourites.Add(userFavorites);
                    objAccuWeatherEntities.SaveChanges();
                }
                catch(Exception ex) {

                    throw new  InvalidOperationException(ex.InnerException.ToString());
                }

                return "Data Saved";
            }

        }

        public static List<Favourite> GetUsersFavourites(string userId)
        {
            using (var objAccuWeatherEntities = new AccuWeatherEntitiesContext())
            {
                try
                {
                    var list = objAccuWeatherEntities.Favourites;

                    List<Favourite> userList = new List<Favourite>();
                    foreach (var item in list)
                    {
                        if (item.UserId == userId)
                            userList.Add(item);
                    }
                    return userList;
                }
                catch (Exception ex)
                {

                    throw new InvalidOperationException(ex.InnerException.ToString());
                }

               
            }
        }

    }
}