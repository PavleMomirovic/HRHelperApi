export class Frame{

    constructor(name){
        this.name=name;
        this.kontejner=null;
    }

    draw(host){
        let header=document.createElement("div");
        header.className="header";
        document.body.appendChild(header);

        let logo=document.createElement("div");
        header.appendChild(logo);
        logo.className="logo";

        let tit=document.createElement("h1");
        header.appendChild(tit);
        tit.innerHTML="HR Helper - "+this.name;

        let notHeader=document.createElement("div");
        notHeader.className="notHeader";
        document.body.appendChild(notHeader);

        let menu = document.createElement("div");
        menu.className="menu";
        notHeader.appendChild(menu);

        let mainPart = document.createElement("div");
        mainPart.className="mainPart";
        notHeader.appendChild(mainPart);

        let menuEls=["Projects","Branches","Employees","Help"];

        menuEls.forEach(el => {
            let div = document.createElement("div");
            menu.appendChild(div);
            div.classList.add("menuElement");
            if(el==this.name) div.classList.add("clickedElement");
            else {
                div.classList.remove("clickedElement");
                div.onclick=(ev)=>this.otherPage(el);
            }
            let text = document.createElement("h3");
            text.innerHTML=el;
            div.appendChild(text);

        });
    }
    otherPage(el){
        switch(el){
            case "Projects": location.href="projects.html"; break;
            case "Branches": location.href="branches.html"; break;
            case "Employees": location.href="employees.html"; break;
            case "Help": location.href="index.html"; break;
            default: console.log(el);
        }
    
    }
}