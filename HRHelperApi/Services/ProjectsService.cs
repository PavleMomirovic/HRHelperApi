using HRHelperApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace HRHelperApi.Services;

public class ProjectsService
{
    private readonly IMongoCollection<Project> _ProjectsCollection;

    public ProjectsService(
        IOptions<HRHelperDatabaseSettings> HRHelperDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            HRHelperDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            HRHelperDatabaseSettings.Value.DatabaseName);

        _ProjectsCollection = mongoDatabase.GetCollection<Project>("Projects");
    }

    public async Task<List<Project>> GetAsync() =>
        await _ProjectsCollection.Find(_ => true).ToListAsync();

    public async Task<Project?> GetAsync(string id) =>
        await _ProjectsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    
    public async Task<Project?> GetByNameAsync(string name) =>
        await _ProjectsCollection.Find(x => x.Name == name).FirstOrDefaultAsync();

    public async Task CreateAsync(Project newProject) =>
        await _ProjectsCollection.InsertOneAsync(newProject);

    public async Task UpdateAsync(string id, Project updatedProject) =>
        await _ProjectsCollection.ReplaceOneAsync(x => x.Id == id, updatedProject);

    public async Task RemoveAsync(string id) =>
        await _ProjectsCollection.DeleteOneAsync(x => x.Id == id);
}