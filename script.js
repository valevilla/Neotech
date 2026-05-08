// Configuración de niveles
const levels = [
    {
        id: 1,
        title: "El Despertar",
        theory: "¡Bienvenido, Recluta! Todo gran sitio web comienza con un título. Escribe una etiqueta <h1>Hola Mundo</h1> para empezar.",
        goal: "<h1>Hola Mundo</h1>",
        xp: 100
    },
    {
        id: 2,
        title: "Dándole Estilo",
        theory: "¡Excelente! Ahora vamos a darle color. Agrega una etiqueta <style> h1 { color: red; } </style>",
        goal: "color: red",
        xp: 200
    }
];

let currentLevelIndex = parseInt(localStorage.getItem('userLevel')) || 0;
let totalXP = parseInt(localStorage.getItem('userXP')) || 0;

// Elementos DOM
const editor = document.getElementById('code-editor');
const runBtn = document.getElementById('run-btn');
const nextBtn = document.getElementById('next-lvl-btn');
const theoryText = document.getElementById('theory-text');
const xpDisplay = document.getElementById('xp-points');
const levelDisplay = document.getElementById('current-level-num');
const progressFill = document.getElementById('progress-fill');

function initGame() {
    loadLevel(currentLevelIndex);
    updateUI();
}

function loadLevel(index) {
    const level = levels[index];
    theoryText.innerHTML = `<p>${level.theory}</p>`;
    levelDisplay.innerText = level.id;
    nextBtn.disabled = true;
    
    // Calcular porcentaje de progreso
    const progress = ((index) / levels.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function updateUI() {
    xpDisplay.innerText = totalXP;
}

runBtn.addEventListener('click', () => {
    const code = editor.value;
    const preview = document.getElementById('preview-window').contentDocument;
    
    // Inyectar código en el iframe
    preview.open();
    preview.write(code);
    preview.close();

    // Validar si cumplió el objetivo
    const currentGoal = levels[currentLevelIndex].goal;
    if (code.toLowerCase().includes(currentGoal.toLowerCase())) {
        completeLevel();
    }
});

function completeLevel() {
    if (nextBtn.disabled) {
        totalXP += levels[currentLevelIndex].xp;
        nextBtn.disabled = false;
        saveProgress();
        updateUI();
        alert("¡Nivel Completado! + " + levels[currentLevelIndex].xp + " XP");
    }
}

nextBtn.addEventListener('click', () => {
    if (currentLevelIndex < levels.length - 1) {
        currentLevelIndex++;
        loadLevel(currentLevelIndex);
        editor.value = "";
        saveProgress();
    } else {
        alert("¡Has terminado todos los niveles actuales! Eres un Maestro Web.");
    }
});

function saveProgress() {
    localStorage.setItem('userLevel', currentLevelIndex);
    localStorage.setItem('userXP', totalXP);
}

// Iniciar
initGame();
