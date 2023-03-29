
import { Frame } from "./frame.js";

var f = new Frame("Help");
f.draw(document.body);

let mainPart=document.querySelector(".mainPart");

let zaProbu=document.createElement("h3");
zaProbu.innerHTML="Welcome, this is a help page.";
mainPart.appendChild(zaProbu);

let text1= document.createElement("label");
mainPart.appendChild(text1);
text1.innerHTML="This website is devided into 3 main parts: Branches, Projects and Employees.<br><br>"+
    "In Branches section, select a branch that you would like to see additional information about, keep in mind that you cannot add or remove a branch without contacting administrator.<br><br>"+
    "In Projects section, select a project to see it's description and budget, if you are interested to see more about employees you can click on \"Show Employees\".<br><br>"+
    "In Employee section you can Add or Delete employees and find additional information about an employee by using his ID (which is necessery to do before Deleting him).<br><br>"+
    "We hope this helped you navigate through our website, for additional questions you can contact us via email adress: info@hrhelp.org";