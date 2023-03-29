import { Frame } from "./frame.js";

var f = new Frame("Employees");
f.draw(document.body);

let mainPart=document.querySelector(".mainPart");

let zaProbu= document.createElement("h3");
zaProbu.innerHTML="Here you can find details about employees";
mainPart.appendChild(zaProbu);

//pretraga deo:
let errorMsg= document.createElement("h2");
errorMsg.innerHTML="Employee not found";
errorMsg.style.visibility="hidden";
mainPart.appendChild(errorMsg);
errorMsg.classList.add("errorMsg");

let labelJMBG = document.createElement("label");
labelJMBG.innerHTML="Search for an employee by Id: ";
mainPart.appendChild(labelJMBG);

let inputJMBG = document.createElement("input");
inputJMBG.classList.add("input"); //mozda beskorisno
inputJMBG.type="number";
inputJMBG.onkeydown=(ev)=>search(ev,inputJMBG.value);
mainPart.appendChild(inputJMBG);

//prikaz radnika
let block=document.createElement("div");
mainPart.appendChild(block);
block.style.visibility="hidden";
block.classList.add("empBlock");

let photo=document.createElement("div");
photo.classList.add("fakePhoto");
block.appendChild(photo);

let photoText = document.createElement("label");
photoText.innerHTML="Photo not available";
photo.appendChild(photoText);

let data=document.createElement("div");
block.appendChild(data);
data.classList.add("dataBlock");

let fullName=document.createElement("label");
data.appendChild(fullName);
fullName.classList.add("fullName");

let age=document.createElement("label");
//age.type="number";
data.appendChild(age);
age.classList.add("age");

let department=document.createElement("label");
data.appendChild(department);
department.classList.add("department");

let jobTitle=document.createElement("label");
data.appendChild(jobTitle);
jobTitle.classList.add("jobTitle");

let salary=document.createElement("label");
//salary.type="number";
data.appendChild(salary);
salary.classList.add("salary");

let btnDel=document.createElement("button");
btnDel.innerHTML="Delete employee";
btnDel.classList.add("btnDel");
btnDel.classList.add("btnEmp");
block.appendChild(btnDel);

//dodavanje radnika
let blockHeader=document.createElement("h4");
blockHeader.innerHTML="New employees addition:";
mainPart.appendChild(blockHeader);

let blockD=document.createElement("div");
mainPart.appendChild(blockD);
blockD.style.visibility="visible";
blockD.classList.add("empBlock");

let photoD=document.createElement("div");
photoD.classList.add("fakePhoto");
blockD.appendChild(photoD);

let photoDbtn = document.createElement("button");
photoDbtn.innerHTML="Upload photo";
photoDbtn.classList.add("photoFakeBtn");
photoDbtn.onclick=(ev)=>{alert("Photo features are not available at the moment");};
photoD.appendChild(photoDbtn);

let dataD=document.createElement("div");
blockD.appendChild(dataD);
dataD.classList.add("dataBlock");

let dataD2=document.createElement("div");
blockD.appendChild(dataD2);
dataD2.classList.add("dataBlock");

let fullNameD=document.createElement("label");
dataD.appendChild(fullNameD);
fullNameD.innerHTML="Full Name: ";
fullNameD.classList.add("fullNameD");

let fullNameIn=document.createElement("input");
dataD.appendChild(fullNameIn);
fullNameIn.classList.add("fullNameIn");

let BranchD=document.createElement("label");
dataD.appendChild(BranchD);
BranchD.innerHTML="Branch Name: ";
BranchD.classList.add("BranchD");

let BranchIn=document.createElement("input");
dataD.appendChild(BranchIn);
BranchIn.classList.add("BranchIn");

let jmbgD=document.createElement("label");
dataD.appendChild(jmbgD);
jmbgD.innerHTML="ID: (13 digits)";
jmbgD.classList.add("jmbgD");

let jmbgIn=document.createElement("input");
jmbgIn.type="number";
dataD.appendChild(jmbgIn);
jmbgIn.classList.add("jmbgIn");

let ageD=document.createElement("label");
//ageD.type="number";
ageD.innerHTML="Age: ";
dataD2.appendChild(ageD);
ageD.classList.add("ageD");

let ageIn=document.createElement("input");
ageIn.type="number";
dataD2.appendChild(ageIn);
ageIn.classList.add("ageIn");

let departmentD=document.createElement("label");
dataD2.appendChild(departmentD);
departmentD.innerHTML="Department: ";
departmentD.classList.add("departmentD");

let departmentIn=document.createElement("input");
dataD2.appendChild(departmentIn);
departmentIn.classList.add("departmentIn");

let jobTitleD=document.createElement("label");
jobTitleD.innerHTML="Job title: ";
dataD2.appendChild(jobTitleD);
jobTitleD.classList.add("jobTitle");

let jobTitleIn=document.createElement("input");
dataD2.appendChild(jobTitleIn);
jobTitleIn.classList.add("jobTitleIn");

let salaryD=document.createElement("label");
salaryD.innerHTML="Salary: (in Euros)";
//salary.type="number";
dataD2.appendChild(salaryD);
salaryD.classList.add("salaryD");

let salaryIn=document.createElement("input");
salaryIn.type="number";
dataD2.appendChild(salaryIn);
salaryIn.classList.add("salaryIn");


let btnAdd=document.createElement("button");
btnAdd.innerHTML="Add an employee";
btnAdd.classList.add("btnEmp");
btnAdd.onclick=(ev)=>addEmpl();
blockD.appendChild(btnAdd);


function search(ev,jmbg){
    if(ev.keyCode==13){
        let str=jmbg.toString();
        if(str.length==13){
            console.log(jmbg);
            fetch("http://localhost:5158/api/Branches/"+str).then(resp=>{
                if(resp.ok){
                    resp.json().then(json => {
                        console.log(json.fullName);
                        let block=document.querySelector(".empBlock");
                        block.style.visibility="visible";
                        let errorMsg=document.querySelector(".errorMsg");
                        errorMsg.style.visibility="hidden";

                        reset(block);

                        let fullName=document.querySelector(".fullName");
                        fullName.innerHTML+=json.fullName;
                        let department=document.querySelector(".department");
                        department.innerHTML+=json.department;
                        let age=document.querySelector(".age");
                        age.innerHTML+=json.age;
                        let jobTitle=document.querySelector(".jobTitle");
                        jobTitle.innerHTML+=json.jobTitle;
                        let salary=document.querySelector(".salary");
                        salary.innerHTML+=json.salary;

                        btnDel=document.querySelector(".btnDel");

                        btnDel.onclick=(ev)=>deleteEmp(str);

                                                

                    })
                } else {
                    let block=document.querySelector(".empBlock");
                    block.style.visibility="hidden";

                    let errorMsg=document.querySelector(".errorMsg");
                    errorMsg.style.visibility="visible";
                }
            })
        }
        else console.log("JMBG mora biti broj duzine 13");
    }
}

function reset(block){
    let fullName=document.querySelector(".fullName");
    fullName.innerHTML="Full name: ";
    let department=document.querySelector(".department");
    department.innerHTML="Department: ";
    let age=document.querySelector(".age");
    age.innerHTML="Age: ";
    let jobTitle=document.querySelector(".jobTitle");
    jobTitle.innerHTML="Job title: ";
    let salary=document.querySelector(".salary");
    salary.innerHTML="Salary: ";
}

function deleteEmp(str){
    if (confirm("Are you sure that you want to delete employee from the database") == true) {
        console.log(str);
        fetch("http://localhost:5158/api/Branches/DeleteEmployeeByJMBG/"+str,{method: 'POST'}).then(resp=>{
            if(resp.ok){
                alert("You have successfully deleted an employee from a database");
                let block=document.querySelector(".empBlock");
                block.style.visibility="hidden";
                reset(block);
            }
            else {
                alert("Something went wron't, employee could not be deleted");
            }
        })
    } 
}

function addEmpl(){
    let fullName=document.querySelector(".fullNameIn").value;
    let jmbg=document.querySelector(".jmbgIn").value;
    let branch=document.querySelector(".BranchIn").value;
    let department=document.querySelector(".departmentIn").value;
    let age=document.querySelector(".ageIn").value;
    let jobTitle=document.querySelector(".jobTitleIn").value;
    let salary=document.querySelector(".salaryIn").value;


    const object = {
        "jmbg": jmbg,
        "fullName": fullName,
        "age": age,
        "department": department,
        "salary": salary,
        "jobTitle": jobTitle
      }
    fetch('http://localhost:5158/api/Branches/AddEmployee?branchName='+branch, {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-Type': 'application/json'
          }
    }).then(resp=>{
        if (resp.ok) alert("Employee added to the branch: "+branch+"\nwith the following info: "+jmbg+'\n'+fullName+"\n"+department+'\n'+age+'\n'+jobTitle+'\n'+salary);
        else if(resp.status==404) alert("Branch not found");
        else if(resp.status==400) alert("An employee with the same ID already exists");
        else alert("Something went wrong");

    });

}