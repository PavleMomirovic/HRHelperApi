import { Frame } from "./frame.js";

var f = new Frame("Branches");
f.draw(document.body);

let mainPart=document.querySelector(".mainPart");

let zaProbu= document.createElement("h3");
zaProbu.innerHTML="Here you can find basic data about branches";
mainPart.appendChild(zaProbu);

let zaProbu2= document.createElement("h4");
zaProbu2.innerHTML="For additional information, adding or deleting an employee search for him by his serial number in \"Employees\" section.";
mainPart.appendChild(zaProbu2);

//deo za prikaz:
let errorMsg= document.createElement("h2");
errorMsg.innerHTML="Something went wrong, choose a valid branch!";
errorMsg.style.visibility="hidden";
mainPart.appendChild(errorMsg);
errorMsg.classList.add("errorMsg");

//deo za prikaz filijale:


fetch("http://localhost:5158/api/Branches/GetBranchNames").then(resp=>{
    if(resp.ok){
        resp.json().then(json => {
            
            let labelAll = document.createElement("label");
            labelAll.innerHTML="See more about branch: ";
            mainPart.appendChild(labelAll);

            let branch = document.createElement("select");
            branch.innerHTML="select";
            mainPart.appendChild(branch);

            let op;

            op=document.createElement("option");
            op.innerHTML="Choose a branch...";
            branch.appendChild(op);

            json.forEach(el => {
                op= document.createElement("option");
                op.innerHTML=el;
                branch.appendChild(op);            
            });
            branch.onchange=(ev)=>drawBranch(branch.options[branch.selectedIndex].text);

            let branchBox= document.createElement("div");
            mainPart.appendChild(branchBox);
            branchBox.style.visibility="hidden";
            branchBox.classList.add("branchBox");
            branchBox.classList.add("showBox");

            let namel=document.createElement("h3");
            namel.classList.add("nameL");
            branchBox.appendChild(namel);

            let emplys=document.createElement("div");
            emplys.classList.add("employeesPart");
            branchBox.appendChild(emplys);
   
        })
    } else {

        let errorMsg=document.querySelector(".errorMsg");
        errorMsg.style.visibility="visible";
    }
})


function drawBranch(name){
    if(name!="Choose a branch...")
    fetch("http://localhost:5158/api/Branches/GetBranchByName?name="+name).then(resp=>{
    if(resp.ok){
        resp.json().then(json => {
            let errorMsg=document.querySelector(".errorMsg");
            errorMsg.style.visibility="hidden";
            resetBranch();
            console.log(json);
            showBranch(json); 

        })
    } else {

        resetBranch();
        let errorMsg=document.querySelector(".errorMsg");
        errorMsg.style.visibility="visible";
    }
    })
}

function showBranch(json){
    let b=document.querySelector(".branchBox");
    b.style.visibility="visible";
    let n=document.querySelector(".nameL");
    n.innerHTML+=json.name; 

    let e=document.querySelector(".employeesPart");

    let hed=document.createElement("h3");
    hed.innerHTML="Employees: ";
    e.appendChild(hed);

    json.employees.forEach(el=>{
        let empBlock=document.createElement("div");
        empBlock.classList.add("empBlock");
        empBlock.classList.add("dataBlock");
        e.appendChild(empBlock);

        let fullName=document.createElement("label");
        fullName.innerHTML="Full name: "+el.fullName;
        empBlock.appendChild(fullName);

        let age=document.createElement("label");
        age.innerHTML="Age: "+el.age;
        empBlock.appendChild(age);

        let department=document.createElement("label");
        department.innerHTML="Department: "+el.department;
        empBlock.appendChild(department);

        let btnInfo=document.createElement("button");
        btnInfo.innerHTML="Copy ID number";
        btnInfo.classList.add("btnInfo");
        empBlock.appendChild(btnInfo);
        btnInfo.onclick=(ev)=>{
            console.log("Uso sam u onClick");
            navigator.clipboard.writeText(el.jmbg);
            //alert("Copied jmbg: "+el.jmbg);
        };

    });
}

function resetBranch(){
    let b=document.querySelector(".branchBox");
    b.style.visibility="hidden";
    let n=document.querySelector(".nameL");
    n.innerHTML="Branch name: ";
    let e=document.querySelector(".employeesPart");
    e.innerHTML="";
}
