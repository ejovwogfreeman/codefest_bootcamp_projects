let data = window.addEventListener('DOMContentLoaded', ()=> {
    const tasks = localStorage.getItem('tasks')
    const taskArr = JSON.parse(tasks)
    // console.log(taskArr)

    taskArr.forEach((task)=> {
        createTask(task)
    })

} )

var tasks = document.getElementById('tasks')

var submitBtn = document.getElementById('new-task-submit')
submitBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    var inputBar = document.getElementById('new-task-input')
    createTask(inputBar.value)
    // createTask()
    saveData()
    inputBar.value = '';
})


function createTask(taskData){
    // var inputBar = document.getElementById('new-task-input')

    if(!taskData) {
        alert('You must add an input')
    } else {
      
        var task = document.createElement('div')

        var content = document.createElement('div')
        var input = document.createElement('input')
        var actions = document.createElement('div')
        var btn1 = document.createElement('button')
        var btn2 = document.createElement('button')
        var btn3 = document.createElement('button')
        var time = document.createElement('small')

        var date = 'created on ' + new Date().toDateString() + ' | ' + new Date().toLocaleTimeString()

        time.textContent = date;

        task.classList.add('task')
        content.classList.add('content')
        actions.classList.add('actions')

        btn1.textContent = 'Edit'
        btn2.textContent = 'Delete'
        btn3.textContent = 'Done'

        input.classList.add('text')
        input.setAttribute('type', 'text')
        input.setAttribute('value', taskData)
        input.setAttribute('readonly', 'readonly')

        btn1.classList.add('edit')
        btn2.classList.add('delete')
        btn3.classList.add('done')

        content.appendChild(input)
        content.appendChild(time)
        actions.appendChild(btn1)
        actions.appendChild(btn3)
        actions.appendChild(btn2)
        
        task.appendChild(content)
        task.appendChild(actions)
        tasks.prepend(task)
      
        btn1.addEventListener('click', (e)=> {
            e.preventDefault()
            if(btn1.textContent === 'edit' ) {
                btn1.textContent = 'save'
                input.removeAttribute('readonly')
                saveData()
            }else if(btn1.textContent === 'edit' || input.value === ''){
                alert('You must enter a value')
            }
            else{
                btn1.textContent = 'edit';
                input.setAttribute('readonly', 'readonly')
                saveData()
            }          
        })

        btn3.addEventListener('click', (e)=> {
            e.preventDefault()
            if(btn3.textContent === 'done' ) {
                btn3.textContent = 'undone'
                input.classList.add('strike')
                saveData()
            }else{
                btn3.textContent = 'done';
                input.classList.remove('strike')
                saveData()
            }          
        })

        btn2.addEventListener('click', (e)=> {
            e.preventDefault()
            tasks.removeChild(task)
            saveData()
        })

    }

    saveData()
}

function saveData() {
    const tasks = document.querySelectorAll('.task')

    const taskArr = []   
    tasks.forEach((task)=> {
        const input = task.querySelector('input');
        taskArr.push(input.value)
    })

    localStorage.setItem('tasks', JSON.stringify(taskArr))
}

