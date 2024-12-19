
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    // Prevent the default form submission
    event.preventDefault();

    // prevents adding an empty task
    if(inputBox.value === '') {
        return;
    }
    
    else {
        // creates an li (list-item) element
        // inserts whatever task was entered by user in inputBox into the li's inner HTML
        // appends this new list item to the listContainer
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // creates a span element to be able to include cross/delete icon at end of each list-item
        let span = document.createElement("span");
        span.innerHTML = ('<i class="fa-solid fa-xmark"></i>');
        li.appendChild(span);
    }

    // clears inputBox field after task has been added
    inputBox.value = '';
    saveData();
}


listContainer.addEventListener("click", function(e){

    /* 
    If a listContainer element is clicked,
    and it is LI (list-item), we add the .checked class to the list-item.
    If the list-item already has the .checked class, the class is removed from that list-item.
    This is because we used classList followed by toggle.
    */

    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }

    /* 
    If a listContainer element is clicked, and it is SPAN element, its parent element is deleted.
    We defined the parent element of each span (delete button) to be a list-item,
    hence the corresponding list-item gets deleted.
    */

    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);


/*
The list-items present in the listContainer are all saved to localStorage in the browser
so that refreshing does not erase the whole list.
Call the saveData() function after checking/unchecking, deleting a task, and adding a new task.
*/
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

/*
To actually get the saved data from localStorage to the listContainer, call the showData function.
This function gets the data stored in localStorage and stores it in the listContainer's inner HTML.
*/
function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

/* The function is called here*/
showData();