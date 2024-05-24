const playerForm = document.getElementById('player-form');
const playerNameInput = document.getElementById('player-name');
const playerSkillInput = document.getElementById('player-skill');
const playersList = document.getElementById('players-list');
const drawTeamsButton = document.getElementById('draw-teams');
const playersPerTeamInput = document.getElementById('players-per-team');
const teamsList = document.getElementById('teams-list');

let players = [];

playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = playerNameInput.value.trim();
    const skill = parseInt(playerSkillInput.value.trim());
    
    if (name && skill) {
        players.push({ name, skill });
        updatePlayersList();
        playerForm.reset();
    }
});

drawTeamsButton.addEventListener('click', () => {
    const playersPerTeam = parseInt(playersPerTeamInput.value);
    if (players.length >= playersPerTeam * 2) {
        const teams = drawTeams(players, playersPerTeam);
        displayTeams(teams);
    } else {
        alert('Número insuficiente de jogadores para formar os times.');
    }
});

function updatePlayersList() {
    playersList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.textContent = `${player.name} - Habilidade: ${player.skill}`;
        playersList.appendChild(li);
    });
}

function drawTeams(players, playersPerTeam) {
    // Ordena os jogadores por habilidade
    const sortedPlayers = players.slice().sort((a, b) => b.skill - a.skill);
    const teams = [];

    for (let i = 0; i < Math.ceil(players.length / playersPerTeam); i++) {
        teams.push([]);
    }

    let teamIndex = 0;
    let direction = 1;

    sortedPlayers.forEach(player => {
        teams[teamIndex].push(player);
        teamIndex += direction;
        if (teamIndex === teams.length || teamIndex === -1) {
            direction *= -1;
            teamIndex += direction;
        }
    });

    return teams;
}

function displayTeams(teams) {
    teamsList.innerHTML = '';
    teams.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        const teamTitle = document.createElement('h3');
        teamTitle.textContent = `Time ${index + 1}`;
        teamDiv.appendChild(teamTitle);
        team.forEach(player => {
            const playerP = document.createElement('p');
            playerP.textContent = `${player.name} - Habilidade: ${player.skill}`;
            teamDiv.appendChild(playerP);
        });
        teamsList.appendChild(teamDiv);
    });
}
