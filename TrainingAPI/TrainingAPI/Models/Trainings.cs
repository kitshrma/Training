﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingAPI.Models
{
    public class Trainings
    {
        public string Name {get;set;}
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}