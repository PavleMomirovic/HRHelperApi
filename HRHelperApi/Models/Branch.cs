using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HRHelperApi.Models;

public class Branch
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public String? Id { get; set; }

    public String? Name {get;set;} //LOCATION ex. Belgrade branch, Viennaa branch etc.

    public List<Employee>? employees{get;set;}


}