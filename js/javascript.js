// modal
let modal = document.getElementById('todo-modal');
let addTodo = document.getElementById('openModal');
let span = document.getElementsByClassName("close")[0];

addTodo.addEventListener('click', function() {
	modal.style.display = "block";
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
let cancelButton=document.querySelector('#cancel');

let todoArray=[];
saveButton.addEventListener('click', (e)=>{
    if(activityName===''){
        activityName.value="please enter the activity";
    }
    console.log("hi");
    e.preventDefault();
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
});

function fetchTodo(){
    let allList=document.querySelector("#all");
    let data=JSON.parse(localStorage.getItem('Todo'));
    console.log(data)

    if(data.length>0){
        let appendTo = '<table id="todoTable">';
		for (let i = 0; i < data.length; i++) {
            appendTo += `<tr class="" id='${i}'><td  onclick='viewData(${i})'>${data[i].activity}</td><td>${data[i].date} ${data[i].time}</td><td><img onclick='deleteTodo(${i})' src="images/delete.png" id='delete'/></td></tr>`;
        //     console.log(data[i].activity)
        //     let objectWithGroupByName = {};
        //     for (let key in data){
        //        let name = data[key].category;
        //     if (!objectWithGroupByName[name]){
        //        objectWithGroupByName[name] = [];
        //     }
        //     objectWithGroupByName[name].push(data[key]);
        // }
        // console.log(objectWithGroupByName);
		}
        allList.innerHTML = appendTo+"</table>";

	}else {
		allList.innerHTML = "No saved datas";
	   
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