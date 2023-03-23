import Settings from './Settings';

export default class ActionMenu {
    options = [];

    #isOpen = false;
    #menu = null;
    #container = null;
    #search = null;
    #template = null;

    constructor() {
        this.#menu = document.getElementById("action-menu");
        this.#search = document.getElementById("action-menu-search");
        this.#container = document.getElementById("action-menu-container");
        this.#template = document.getElementById("action-menu-item");

        this.#search.addEventListener('keyup', (e) => {
            this.search();
        });

        document.addEventListener("click", (e) => {
            if(this.#isOpen && !this.#menu.contains(e.target)){
                this.close();
                e.preventDefault();
            }
        });

        document.addEventListener("keydown", (e)=>{
            if(e.code == "Space"){
                if(this.#isOpen){return;}

                this.#isOpen = true;
                this.#menu.style.display = "block";
                this.#search.value = "";
                this.#search.focus();
                this.search();
                e.preventDefault();
            }

            if(e.code == "Escape"){
                if(!this.#isOpen){return;}

                this.close();
            }
        });
    }
    
    add(name, description, callback, icon, hide){
        var converted = encodeURIComponent(name);
        var instance = this.#template.content.cloneNode(true);

        instance.querySelectorAll("div")[0].id = converted;
        instance.querySelectorAll("i")[0].classList.add(icon);
        instance.querySelectorAll("p")[0].textContent = name;
        instance.querySelectorAll("p")[1].textContent = description;

        if(hide){
            instance.querySelectorAll("div")[0].style.display = "none";
        }

        this.#container.appendChild(instance);
        var elem = document.getElementById(converted);
        elem.addEventListener('click', (e) => {
            this.close();
            callback();
            e.preventDefault();
        });
        
        this.options.push({name, description, callback, icon, elem, hide});
    }

    search(){
        var value = this.#search.value;
        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            
            option.elem.style.display = "none";
            if(!option.hide && (value.length <= 0 || option.name.toLowerCase().includes(value.toLowerCase()))){
                option.elem.style.display = "block";
            }
        }
    }
    
    trigger(name){
        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            if(option.name == name){
                option.callback();
                return;
            }
        }
    }

    close(){
        this.#isOpen = false;
        this.#menu.style.display = "none";
    }
}