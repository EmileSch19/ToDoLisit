console.log("To-Do List app started!");

// Sélectionner les éléments du DOM
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Écouteur d'événement sur le formulaire
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const task = input.value.trim(); // Récupère la valeur du champ
    if (task !== "") {
        addTask(task);
        input.value = ""; // Vide le champ après ajout
    }
});

// Fonction pour ajouter une tâche
function addTask(task, isCompleted = false) {
    const li = document.createElement('li');

    // Ajouter le texte de la tâche
    const taskText = document.createElement('span');
    taskText.textContent = task;
    if (isCompleted) {
        taskText.classList.add('completed'); // Si la tâche est marquée comme complétée
    }
    li.appendChild(taskText);

    // Bouton "Complété"
    const completeButton = document.createElement('button');
    completeButton.textContent = "Complété";
    completeButton.style.marginLeft = "10px";
    completeButton.style.backgroundColor = "#007bff";
    completeButton.style.color = "#fff";
    completeButton.style.border = "none";
    completeButton.style.borderRadius = "4px";
    completeButton.style.cursor = "pointer";
    completeButton.addEventListener('click', function () {
        taskText.classList.toggle('completed'); // Marque ou démarque comme complétée
        saveTasks(); // Sauvegarde après modification
    });
    li.appendChild(completeButton);

    // Bouton "Supprimer"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Supprimer";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.backgroundColor = "#dc3545";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "none";
    deleteButton.style.borderRadius = "4px";
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener('click', function () {
        li.remove(); // Supprime la tâche
        saveTasks(); // Sauvegarde après suppression
    });
    li.appendChild(deleteButton);

    // Ajouter la tâche (avec les boutons) à la liste
    todoList.appendChild(li);

    // Sauvegarder la liste mise à jour
    saveTasks();
}

// Fonction pour sauvegarder les tâches dans localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        const taskText = li.querySelector('span').textContent;
        const isCompleted = li.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour charger les tâches depuis localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text, task.completed);
    });
}

// Charger les tâches au démarrage
loadTasks();
