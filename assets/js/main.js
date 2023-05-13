const tarefa = document.querySelector('.nova-tarefa');
const btn = document.querySelector('.btn');
const listaTarefa = document.querySelector('.tarefas');


function criaLi(){
    const li = document.createElement('li'); 
    return li;
}

tarefa.addEventListener('keypress', function(e){
    if(e.keyCode ===13){
        if(!tarefa.value) return;
        criaTarefa(tarefa.value);
        
    }
})

function criaApagar(li){
    li.innerHTML += ' ';
    const apagar = document.createElement('button');
    apagar.innerText = 'Apagar';
    apagar.setAttribute('class','apagar')
    li.appendChild(apagar);
}


function limpa(){
    tarefa.value = '';
    tarefa.focus();
}

function criaTarefa(texto){
   const li =  criaLi();
   li.innerText = texto;
   listaTarefa.appendChild(li);
   limpa()
   criaApagar(li)
   salvarTarefa();
}


btn.addEventListener('click',function(){
    if(!tarefa.value) return;
     criaTarefa(tarefa.value);
})

document.addEventListener('click',function(e){
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefa();
    }
})

function salvarTarefa(){
    const liTarefas = listaTarefa.querySelectorAll('li');
    const listaDeTarefas = [];
     
    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
      }
      const tarefasJSON = JSON.stringify(listaDeTarefas);
       localStorage.setItem('tarefas', tarefasJSON);
}

function adcionaTarefas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

adcionaTarefas();