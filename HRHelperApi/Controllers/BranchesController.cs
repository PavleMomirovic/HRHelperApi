using HRHelperApi.Models;
using HRHelperApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace HRHelperApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BranchesController : ControllerBase
{
    private readonly BranchesService _BranchesService;
    private readonly ProjectsService _ProjectsService;

    public BranchesController(BranchesService branchesService,ProjectsService projectsService){
        _BranchesService = branchesService;
        _ProjectsService = projectsService;
    }

    [HttpGet]
    public async Task<List<Branch>> Get() =>
        await _BranchesService.GetAsync();
    
    [HttpGet("GetBranchNames")]
    public async Task<List<String>> GetNames(){
        List<Branch> branches = await _BranchesService.GetAsync();
        List<String> names=new List<string>(branches.Count);

        foreach (Branch b in branches){
            if(b.Name is null) continue;
            names.Add(b.Name);
        }
        return names;
    }

    [HttpGet("GetBranchByID{id:length(24)}")]
    public async Task<ActionResult<Branch>> Get(string id)
    {
        var Branch = await _BranchesService.GetAsync(id);

        if (Branch is null)
        {
            return NotFound();
        }

        return Branch;
    }
    [HttpGet("GetBranchByName")]
    public async Task<ActionResult<Branch>> GetByName(string name)
    {
        var Branch = await _BranchesService.GetByNameAsync(name);

        if (Branch is null)
        {
            return NotFound();
        }

        return Branch;
    }

    [HttpGet("{jmbg:length(13)}")]
    public async Task<ActionResult<Employee>> GetEmployeeByJMBG(string jmbg)
    {
        var branch = await _BranchesService.GetBranchByEmployeeJMBG(jmbg);

        if (branch is null)
        {
            return NotFound();
        }

            if (branch.employees==null) return BadRequest();
            foreach(Employee emp in branch.employees){
                if(emp.JMBG==jmbg) return emp;
            }

        return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Branch newBranch)
    {
        // if(newBranch.employees!=null){
        //     foreach (Employee e in newBranch.employees) {
                
        //     }
        // }
        await _BranchesService.CreateAsync(newBranch);

        return CreatedAtAction(nameof(Get), new { id = newBranch.Id }, newBranch);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Branch updatedBranch)
    {
        var Branch = await _BranchesService.GetAsync(id);

        if (Branch is null)
        {
            return NotFound();
        }

        updatedBranch.Id = Branch.Id;

        await _BranchesService.UpdateAsync(id, updatedBranch);

        return NoContent();
    }
    [HttpPost("DeleteEmployeeByJMBG/{jmbg:length(13)}")]
    public async Task<IActionResult> DeleteEmployee(string jmbg){

         var branch = await _BranchesService.GetBranchByEmployeeJMBG(jmbg);

        if (branch is null)
        {
            return NotFound();
        }
        List<Project> projs;

            if (branch.employees==null) return BadRequest();
            foreach(Employee emp in branch.employees){
                if(emp.JMBG==jmbg) {
                    branch.employees.Remove(emp);
                    if(branch.Id is null) return BadRequest(); 
                    else await _BranchesService.UpdateAsync(branch.Id, branch);
                    projs=await _ProjectsService.GetAsync();
                    foreach(Project p in projs){
                        if(p._employeesID is null) continue;
                        if( p._employeesID.Contains(emp.JMBG)){
                             p._employeesID.Remove(emp.JMBG);
                             if(p.Id is null) return BadRequest();
                             else await _ProjectsService.UpdateAsync(p.Id,p);
                        }
                    }
                    break;
                }
            }
        
        return Ok();
    }
    [HttpPost("AddEmployee")]
    public async Task<IActionResult> AddEmployee(Employee employee,string branchName){

         var branch = await _BranchesService.GetByNameAsync(branchName);

        if (branch is null)
        {
            return NotFound("We couldn't find specified branch");
        }
        if(branch.employees is null){
            return BadRequest("Something went wrong");
        }

        List<Branch> allBranches = await _BranchesService.GetAsync();

        foreach(Branch b in allBranches){
            if(b.employees is null) continue;
            foreach(Employee emp in b.employees){
                    if(emp.JMBG==employee.JMBG) return BadRequest("Employee with this ID already exists");
            }
        }

        branch.employees.Add(employee);

        if(branch.Id is null) return BadRequest();
        await _BranchesService.UpdateAsync(branch.Id,branch);

        return Ok("Employee added");
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var Branch = await _BranchesService.GetAsync(id);

        if (Branch is null)
        {
            return NotFound();
        }

        await _BranchesService.RemoveAsync(id);

        return NoContent();
    }
}