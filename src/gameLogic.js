export const ROLES = {
  KILLER: 'Killer',
  DOCTOR: 'Doctor',
  DETECTIVE: 'Detective',
  JOKER: 'Joker',
  CIVILIAN: 'Civilian'
};

export const TEAMS = {
  IMPOSTOR: 'Impostor',
  CIVILIAN: 'Civilian'
};

export function distributeRoles(players) {
  const count = players.length;
  let pool = [ROLES.KILLER, ROLES.DOCTOR, ROLES.DETECTIVE, ROLES.CIVILIAN];
  
  if (count >= 5) pool.push(ROLES.JOKER);
  while (pool.length < count) pool.push(ROLES.CIVILIAN);
  
  // Shuffle array randomly
  pool = pool.sort(() => Math.random() - 0.5);
  
  return players.map((player, index) => ({
    id: player.id || index.toString(),
    name: player.name,
    avatar: player.avatar || '👤',
    role: pool[index],
    isAlive: true
  }));
}

export function checkWinCondition(players, votedOutId) {
  const alivePlayers = players.filter(p => p.isAlive);
  const killer = alivePlayers.find(p => p.role === ROLES.KILLER);
  
  // 1. If Joker is voted out -> Impostors win immediately
  if (votedOutId) {
    const votedPlayer = players.find(p => p.id === votedOutId);
    if (votedPlayer && votedPlayer.role === ROLES.JOKER) {
      return TEAMS.IMPOSTOR;
    }
  }

  // 2. If Killer is dead -> Civilians win
  if (!killer && (!votedOutId || players.find(p => p.id === votedOutId)?.role === ROLES.KILLER)) {
    return TEAMS.CIVILIAN;
  }

  // 3. If Killer is the only one left (or 1 killer vs 1 civilian) -> Impostors win
  const aliveCivilians = alivePlayers.filter(p => p.role !== ROLES.KILLER && p.role !== ROLES.JOKER);
  if (aliveCivilians.length === 0 || (alivePlayers.length <= 2 && killer)) {
    return TEAMS.IMPOSTOR;
  }

  return null; // Game continues
}
