using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HRHelperApi.Models;

public class Project
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public String? Id { get; set; }

    public String? Name {get;set;}

    public String? Description {get;set;}

    public Int64? Budget {get;set;}

    //TODO: Enum Type 

    public List<String>? _employeesID {get;set;}

}