using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HRHelperApi.Models;

public class Employee
{
    public String? JMBG { get; set; } //aj da probamo da ovo bude Key, moramo da sredimo da budu unique !!

    public String? FullName {get;set;}

    public Int16? Age {get;set;}

    public String? Department {get;set;} //enum or String (HR user friendly) 

    public Int32? Salary {get;set;} //by Month

    public String? JobTitle {get;set;}
    //public List<Employee> employees{get;set;}

}