using HRHelperApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace HRHelperApi.Services;

public class BranchesService
{
    private readonly IMongoCollection<Branch> _BranchesCollection;

    public BranchesService(
        IOptions<HRHelperDatabaseSettings> HRHelperDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            HRHelperDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            HRHelperDatabaseSettings.Value.DatabaseName);

        _BranchesCollection = mongoDatabase.GetCollection<Branch>("Branches");
    }

    public async Task<List<Branch>> GetAsync() =>
        await _BranchesCollection.Find(_ => true).ToListAsync();

    public async Task<Branch?> GetAsync(string id) =>
        await _BranchesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task<Branch?> GetByNameAsync(string name) =>
        await _BranchesCollection.Find(x => x.Name == name).FirstOrDefaultAsync();

    public async Task<Branch> GetBranchByEmployeeJMBG(string jmbg){   
        return await _BranchesCollection.Find($"{{\"employees.JMBG\":\'{jmbg}\'}}").FirstOrDefaultAsync();
    }
    public async Task CreateAsync(Branch newBranch) =>
        await _BranchesCollection.InsertOneAsync(newBranch);

    public async Task UpdateAsync(string id, Branch updatedBranch) =>
        await _BranchesCollection.ReplaceOneAsync(x => x.Id == id, updatedBranch);

    public async Task RemoveAsync(string id) =>
        await _BranchesCollection.DeleteOneAsync(x => x.Id == id);
}