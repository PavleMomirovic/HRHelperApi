using HRHelperApi.Models;
using HRHelperApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace HRHelperApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ProjectsService _ProjectsService;
    private readonly BranchesService _BranchesService;

    public ProjectsController(ProjectsService projectsService,BranchesService branchesService){
        _ProjectsService = projectsService;
        _BranchesService=branchesService;
    }

    [HttpGet]
    public async Task<List<Project>> Get() =>
        await _ProjectsService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Project>> Get(string id)
    {
        var Project = await _ProjectsService.GetAsync(id);

        if (Project is null)
        {
            return NotFound();
        }

        return Project;
    }

    [HttpGet("GetProjectNames")]
    public async Task<ActionResult<string>> GetNames(){
        var Projects = await _ProjectsService.GetAsync();
        if(Projects is null){
            return NotFound();
        }
        List<string> names=new List<string>(0);
        foreach(Project p in Projects){
            if(p.Name is null) continue;
            names.Add(p.Name);
        }
        return Ok(names);
    }
    [HttpGet("GetProjectByName")]
    public async Task<ActionResult<Project>> GetByName(string name){
        Project? tmp= await _ProjectsService.GetByNameAsync(name);
        if(tmp is null) return NotFound();
        return Ok(tmp);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Project newProject)
    {
        await _ProjectsService.CreateAsync(newProject);

        return CreatedAtAction(nameof(Get), new { id = newProject.Id }, newProject);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Project updatedProject)
    {
        var Project = await _ProjectsService.GetAsync(id);

        if (Project is null)
        {
            return NotFound();
        }

        updatedProject.Id = Project.Id;

        await _ProjectsService.UpdateAsync(id, updatedProject);

        return NoContent();
    }

    [HttpPut("RemoveEmpl")]
    public async Task<ActionResult> RemoveEmpl(string pName,string jmbg){
        Project? proj=await _ProjectsService.GetByNameAsync(pName);

        if(proj is null) return NotFound("Bad project name");
        if(proj._employeesID is null) return BadRequest("Project has no employees");  
        if(proj.Id is null) return BadRequest("Project ID is null");

        bool isThere=false;


        foreach(string emp in proj._employeesID){
            if(emp==jmbg){
                 isThere=true;
            }
        }
        if(!isThere) return NotFound("Employee not found");
        proj._employeesID.Remove(jmbg);
        await _ProjectsService.UpdateAsync(proj.Id,proj);
        return Ok();
    }
    [HttpPut("AddEmpl")]
    public async Task<ActionResult> AddEmpl(string pName,string jmbg){
        var proj=await _ProjectsService.GetByNameAsync(pName);

        if(proj is null) return NotFound();
        if(proj._employeesID is null) proj._employeesID=new List<string>(); 
        if(proj.Id is null) return BadRequest();

        bool isThere=false;

        var allBranches=await _BranchesService.GetAsync();
        foreach(Branch b in allBranches){
            if(b.employees is null) continue;
            foreach(Employee emp in b.employees){
                if(emp.JMBG==jmbg) {
                    isThere=true;
                    break;
                }
            }
        }
        if(!isThere) return NotFound();


        proj._employeesID.Add(jmbg);
        await _ProjectsService.UpdateAsync(proj.Id,proj);
        return Ok();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var Project = await _ProjectsService.GetAsync(id);

        if (Project is null)
        {
            return NotFound();
        }

        await _ProjectsService.RemoveAsync(id);

        return NoContent();
    }
    [HttpDelete("DeleteByName")]
    public async Task<IActionResult> DeleteByName(string name)
    {
        var Project = await _ProjectsService.GetByNameAsync(name);

        if (Project is null)
        {
            return NotFound();
        }
        if(Project.Id==null) return BadRequest();

        await _ProjectsService.RemoveAsync(Project.Id);

        return NoContent();
    }
}