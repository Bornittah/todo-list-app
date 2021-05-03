// modal
let modal = document.getElementById('todo-modal');
let addTodo = document.getElementById('openModal');
let span = document.getElementsByClassName("close")[0];

addTodo.addEventListener('click', function() {
	modal.style.display = "block";
    saveButton.style.display = "block";
    updateButton.style.display = "none";
});
document.querySelector('#cancel').addEventListener('click',(e)=>{
e.preventDefault();
modal.style.display = "none";
});
window.addEventListener('load',function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

let activityName=document.querySelector('#activity_name');
let activityDate=document.querySelector('#date');
let activityTime=document.querySelector('#time');
let activityCategory=document.querySelector('#category');
let activityRepeat=document.querySelector('#repeat');
let saveButton=document.querySelector('#saveTodo');
let updateButton=document.querySelector('#updateTodo');
let cancelButton=document.querySelector('#cancel');


let todoArray=[];
saveButton.addEventListener('click', (e)=>{
    e.preventDefault();
    if(activityName.value.length===0){
        window.alert("please enter the activity");
        activityName.focus();
    }
    else{
     let pickedDate= new Date(activityDate.value);
     let today = new Date();
    if(pickedDate < today){
        window.alert("Set present date");
        activityDate.value=new Date();
    }else{
        let todo={
            'activity':activityName.value,
            'date':activityDate.value,
            'time':activityTime.value,
            'category':activityCategory.value,
            'repeat':activityRepeat.value
        }
       todoArray.push(todo);
    
       let data=JSON.parse(localStorage.getItem('Todo'));
       if(data==null){
        localStorage.setItem('Todo', '[]');
        let emptyList=[];
        emptyList.push('empty');
    }
       let newTodoList=JSON.parse(localStorage.getItem('Todo'));
        newTodoList.push(todo);
        localStorage.setItem('Todo', JSON.stringify(newTodoList));
        modal.style.display = "none";
        fetchTodo();
        modal.reset();
    } 
    }
     
});

function fetchTodo(){
    let allList=document.querySelector("#all");
    let data=JSON.parse(localStorage.getItem('Todo'));

    if(data.length>0){
        let appendTo = '<table id="todoTable">';
		for (let i = 0; i < data.length; i++) {
            appendTo += `<tr class="" id='${i}'><td  onclick='viewData(${i})'><i class="fa fa-check"></i> ${data[i].activity}</td><td><i class="fa fa-calendar"></i> ${data[i].date}</td><td><i class="fa fa-clock-o"> ${data[i].time}</td><td><img onclick='deleteTodo(${i})' src="images/delete.png" id='delete'/></td></tr>`;
		}
        allList.innerHTML = appendTo+"</table>";

    //     let objectWithGroupByName = {};
    //     for (let key in data){
    //        let name = data[key].category;
    //        if(name="Personal"){
    //         let personalList=`<ul>`
          
    //         personalList += `<li>${data[i].activity}</li>`
         
    //         document.querySelector("#personal").innerHTML=personalList +"</ul>";
    //        }
    //     if (objectWithGroupByName[name]){
    //        objectWithGroupByName[name] = [];
    //     }
    //     objectWithGroupByName[name].push(data[key]);
    // }
    // console.log(objectWithGroupByName);

	}else {
		allList.innerHTML = "No saved todo!";
	   
	}

}

let todo=JSON.parse(localStorage.getItem('Todo'));

function viewData(index){
    let id = index;
    modal.style.display = "block";
    activityName.value=todo[id].activity,
    activityDate.value=todo[id].date,
    activityTime.value=todo[id].time,
    activityCategory.value=todo[id].category,
    activityRepeat.value=todo[id].repeat
    saveButton.style.display = "none";
    updateButton.style.display = "block";
    document.querySelector('#h3').value="Your Activity";

 
 updateButton.addEventListener('click', function(e){
        e.preventDefault();
          if (confirm("Are you sure, you want to do these changes? ")) {
        
        let newTodo={
            'activity':activityName.value,
            'date':activityDate.value,
            'time':activityTime.value,
            'category':activityCategory.value,
            'repeat':activityRepeat.value
        }
        todo[id] = newTodo;
            localStorage.setItem('Todo',JSON.stringify(todo));
            modal.style.display = "none";
            fetchTodo();
            modal.reset();
        } else {
        //dont update
        modal.style.display = "none";
        }
        
    });

}

	// when delete button is clicked
 function deleteTodo(id){
        if (confirm("You are about to delete this todo, Do you want to continue? ")) {
            todo.splice(id, 1);
            localStorage.setItem('Todo',JSON.stringify(todo));
            fetchTodo();
        }else{
           
        }
    }
  

    function search(){
    const searchli=document.getElementById('search');
        let searchbar = searchli.value.toUpperCase();
        let todoList = document.querySelector('#todoTable');
        let mysearch=todoList.getElementsByTagName('tr');
    
        for (let i = 0; i < mysearch.length; i++) {
            let searchResult=mysearch[i].getElementsByTagName('td')[0];
            if(searchResult){
                let searchvalue=searchResult.textContent || searchResult.innerHTML;
                if(searchvalue.toUpperCase().indexOf(searchbar) > -1){
                    mysearch[i].style.display="";
    
                }else{
                    mysearch[i].style.display="none";
                }
            }
        }
    }
window.addEventListener('load',()=>{
    fetchTodo();
                });