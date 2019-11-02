using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TrainingAPI.Models;
using TrainingDataAccess;

namespace TrainingAPI.Controllers
{
    public class TrainingController : ApiController
    {
        public string GetAPIStatus()
        {
            return "API is up and running";
        }

        public IHttpActionResult Post([FromBody] TrainingData training)
        {
            try
            {
                if(training == null)
                {
                    return BadRequest("Request had paramters");
                }

                DateTime startDate = (DateTime)training.StartDate;
                DateTime endDate = (DateTime)training.EndDate;

                int days = (endDate - startDate).Days;
                using (TrainingEntities entities = new TrainingEntities())
                {
                    entities.TrainingDatas.Add(training);
                    entities.SaveChanges();
                }
                return Ok(days);

            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
            
        }

    }
}
