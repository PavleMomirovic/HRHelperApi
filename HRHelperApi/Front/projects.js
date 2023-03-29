import { Frame } from "./frame.js";

var f = new Frame("Projects");
f.draw(document.body);

let mainPart=document.querySelector(".mainPart");

let zaProbu= document.createElement("h3");
zaProbu.innerHTML="Here you can find all data about company projects";
mainPart.appendChild(zaProbu);

let errorMsg= document.createElement("h2");
errorMsg.innerHTML="Something went wrong, choose a valid project!";
errorMsg.style.visibility="hidden";
mainPart.appendChild(errorMsg);
errorMsg.classList.add("errorMsg");

//deo za dodavanje projekta:
let projectAddBox=document.createElement("div");
projectAddBox.classList.add("showBox");
projectAddBox.classList.add("projectAddBox");
mainPart.appendChild(projectAddBox);


let projAdd=document.createElement("button");
projectAddBox.appendChild(projAdd);
projAdd.className="btnAdd";
projAdd.innerHTML="Add a new project";
projAdd.onclick=(ev)=>projectAdd();

let namel=document.createElement("h4");
namel.innerHTML="Name: ";
projectAddBox.appendChild(namel);

let nameIn=document.createElement("input");
nameIn.classList.add("nameAdd");
projectAddBox.appendChild(nameIn);

let budget=document.createElement("h4");
budget.innerHTML="Budget: ";
projectAddBox.appendChild(budget);   

let budgIn=document.createElement("input");
budgIn.type="number";
budgIn.classList.add("budgAdd");
projectAddBox.appendChild(budgIn);

let descr=document.createElement("h4");
descr.innerHTML="Description: ";
projectAddBox.appendChild(descr);

let descIn=document.createElement("textarea");
descIn.classList.add("descrAdd");
projectAddBox.appendChild(descIn);



//deo za prikaz projekta:
fetch("http://localhost:5158/api/Projects/GetProjectNames").then(resp=>{
    if(resp.ok){
        resp.json().then(json => {
            
            let labelAll = document.createElement("label");
            labelAll.innerHTML="<br><br>See more about project: ";
            labelAll.className="bigLabel";
            mainPart.appendChild(labelAll);

            let project = document.createElement("select");
            project.innerHTML="select";
            mainPart.appendChild(project);

            let op;

            op=document.createElement("option");
            op.innerHTML="Choose a project...";
            project.appendChild(op);

            json.forEach(el => {
                op= document.createElement("option");
                op.innerHTML=el;
                op.className=el;
                project.appendChild(op);            
            });
            project.onchange=(ev)=>drawProject(project.options[project.selectedIndex].text);

            let projectBox= document.createElement("div");
            mainPart.appendChild(projectBox);
            projectBox.style.visibility="hidden";
            projectBox.classList.add("projectBox");
            projectBox.classList.add("showBox");

            let namel=document.createElement("h3");
            namel.classList.add("nameL");
            projectBox.appendChild(namel);

            let budget=document.createElement("h3");
            budget.classList.add("money");
            projectBox.appendChild(budget);            

            let decsr=document.createElement("h4");
            decsr.classList.add("descr");
            projectBox.appendChild(decsr);
            
            let emplys=document.createElement("div");
            emplys.classList.add("employeesPart");
            projectBox.appendChild(emplys);

            
   
        })
    } else {

        let errorMsg=document.querySelector(".errorMsg");
        errorMsg.style.visibility="visible";
        errorMsg.innerHTML="There was an issue regarding one of the projects in database";
    }
})

function drawProject(name){
    if(name=="Choose a project...") resetProject();
    else
    fetch("http://localhost:5158/api/Projects/GetProjectByName?name="+name).then(resp=>{
        if(resp.ok){
            resp.json().then(json => {
                let errorMsg=document.querySelector(".errorMsg");
                errorMsg.style.visibility="hidden";
                resetProject();
    
                console.log(json);
                showProject(json);
    
            })
        } else {
    
            resetProject();
            let errorMsg=document.querySelector(".errorMsg");
            errorMsg.style.visibility="visible";
            errorMsg.innerHTML="Something went wrong regarding this project!";
        }
        })
}

function showProject(json){
    let b=document.querySelector(".projectBox");
    b.style.visibility="visible";
    let n=document.querySelector(".nameL");
    n.innerHTML+=json.name; 
    let d=document.querySelector(".descr");
    d.innerHTML+=json.description; 
    let m=document.querySelector(".money");
    m.innerHTML+=json.budget; 

    let e=document.querySelector(".employeesPart");

    let hed=document.createElement("button");
    hed.innerHTML="Show employees ";
    hed.classList.add("btnInfo");
    hed.onclick=(ev)=>showEmpls(hed,json._employeesID,json.name);
    e.appendChild(hed);

    let lista=document.createElement("div");
    lista.classList.add("empList");
    e.appendChild(lista);

    let del=document.createElement("button");
    del.innerHTML="DELETE PROJECT";
    del.classList.add("btnEmp");
    del.onclick=(ev)=>delProj(json.name);
    e.appendChild(del);
}

function resetProject(){
    let b=document.querySelector(".projectBox");
    b.style.visibility="hidden";
    let n=document.querySelector(".nameL");
    n.innerHTML="Project name: ";
    let d=document.querySelector(".descr");
    d.innerHTML="Description: ";
    let m=document.querySelector(".money");
    m.innerHTML="Budget: "; 
    let e=document.querySelector(".employeesPart");
    e.innerHTML="";
}

function showEmpls(hed,list,pName){
    let e=document.querySelector(".empList");
    if(hed.innerHTML=="Hide employees"){
        hed.innerHTML="Show employees";
        e.innerHTML="";
        let err=document.querySelector(".errorMsg");
        err.style.visibility="hidden";
    } else{
        hed.innerHTML="Hide employees";

        let textAdd = document.createElement("label");
        textAdd.innerHTML="Assign a new employee to this project:";
        e.appendChild(textAdd);

        let btnAdd = document.createElement("input");
        btnAdd.classList.add("Assign");
        e.appendChild(btnAdd);
        btnAdd.type="number";

        btnAdd.onkeydown=(ev)=>addEmpl(ev,pName,btnAdd.value);

        

    list.forEach(el=>{

        fetch("http://localhost:5158/api/Branches/"+el).then(resp=>{
                if(resp.ok){
                    resp.json().then(json => {
                        console.log(json.fullName);
                        
                        let empBlock=document.createElement("div");
                        empBlock.classList.add("empBlock");
                        empBlock.classList.add("dataBlock");
                        e.appendChild(empBlock);

                        let fullName=document.createElement("label");
                        fullName.innerHTML="Full name: "+json.fullName;
                        empBlock.appendChild(fullName);

                        let age=document.createElement("label");
                        age.innerHTML="Age: "+json.age;
                        empBlock.appendChild(age);

                        let department=document.createElement("label");
                        department.innerHTML="Department: "+json.department;
                        empBlock.appendChild(department);

                        let btnInfo=document.createElement("button");
                        btnInfo.innerHTML="Copy ID number";
                        btnInfo.classList.add("btnInfo");
                        empBlock.appendChild(btnInfo);
                        btnInfo.onclick=(ev)=>{
                            console.log("Uso sam u onClick");
                            navigator.clipboard.writeText(json.jmbg);
                            //alert("Copied jmbg: "+el.jmbg);
                        };

                        let btnRem=document.createElement("button");
                        btnRem.innerHTML="Remove employee ";
                        btnRem.classList.add("btnInfo");
                        empBlock.appendChild(btnRem);
                        btnRem.onclick=(ev)=>{
                            console.log("ovde se brisu empl iz proj" + json.jmbg);
                            fetch("http://localhost:5158/api/Projects/RemoveEmpl?pName="+pName+"&jmbg="+json.jmbg,{
                                method:'PUT'
                            }).then(resp=>{
                                if(resp.ok){ alert("Employee removed successfully");
                                    resetProject();
                                    drawProject(pName);
                                }
                                else {
                                    let errorMsg=document.querySelector(".errorMsg");
                                    errorMsg.style.visibility="visible";
                                    errorMsg.innerHTML="Employee couldn't be removed";
                                }
                            })
                        };

                                                

                    })
                } else {
                    // let block=document.querySelector(".projectBox");
                    // block.style.visibility="hidden";

                     let errorMsg=document.querySelector(".errorMsg");
                     errorMsg.style.visibility="visible";
                     errorMsg.innerHTML="Something went wrong regarding employees on this project";
                    //alert("Something went wrong!");
                }
        });
    });
    }
}

function addEmpl(ev,name,jmbg){
    if(ev.keyCode==13){
        if(jmbg.length!=13) alert("ID needs to have 13 characters");
        else{
            fetch("http://localhost:5158/api/Projects/AddEmpl?pName="+name+"&jmbg="+jmbg,{
                                method:'PUT'
                            }).then(resp=>{
                                if(resp.ok) {
                                    alert("Employee assigned successfully");
                                    resetProject();
                                    drawProject(name);
                                }
                                else {
                                    let errorMsg=document.querySelector(".errorMsg");
                                    errorMsg.style.visibility="visible";
                                    errorMsg.innerHTML="Employee couldn't be assigned";
                                }
                            })
            

        }
    }
}

function delProj(name){
    if (confirm("Are you sure that you want to delete a project?") == true) {
        fetch("http://localhost:5158/api/Projects/DeleteByName?name="+name,{
            method: 'DELETE'
        }).then(resp=>{
            if(resp.ok) {
                alert("Project successfully deleted.");
                location.reload();                
                
            }
            else{
                let errorMsg=document.querySelector(".errorMsg");
                errorMsg.style.visibility="visible";
                errorMsg.innerHTML="Project couldn't be deleted";
            }
        })
    }
}

function projectAdd(){
    resetProject();
    let box=document.querySelector(".projectAddBox");
    box.style.visibility="visible";
    let n=document.querySelector(".nameAdd").value;
    let d=document.querySelector(".descrAdd").value;
    let b=document.querySelector(".budgAdd").value;

    if(n.length==0 || d.length==0 || b.length==0) alert("Project needs a name, budget and description");
    else{
    
        const object = {
            "name": n,
            "description":d,
            "budget":b,
            "_employeesID":[]
        }
        fetch('http://localhost:5158/api/Projects', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp=>{
            if (resp.ok){
                alert("Project added to the database");
                location.reload();
            }
            else alert("Something went wrong");
        });
    }
    
}