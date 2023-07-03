function calculateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      isPlayerHeald: false,
      gameWinner: null,
      messagesLog: [],
    };
  },

  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: `0%` };
      }
      return { width: `${this.monsterHealth}%` };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: `0%` };
      }
      return { width: `${this.playerHealth}%` };
    },
    isSpecialAttackAvailable() {
      return this.currentRound % 4 !== 0;
    },
  },

  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.gameWinner = "It's a Draw 🦸‍♀️🤜🤛👾";
      } else if (value <= 0) {
        this.gameWinner = "You 🦸‍♀️ Won";
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.gameWinner = "It's a Draw 🦸‍♀️🤜🤛👾";
      } else if (value <= 0) {
        this.gameWinner = "Monster 👾 Won";
      }
    },
  },

  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = calculateRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addBattleMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = calculateRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addBattleMessage("monster", "attack", attackValue);
    },
    specialMonsterAttack() {
      this.currentRound++;
      const attackValue = calculateRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addBattleMessage("player", "special-attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      if (!this.isPlayerHeald) {
        this.isPlayerHeald = true;
        this.currentRound++;
        const healValue = calculateRandomValue(8, 20);
        this.addBattleMessage("player", "heal", healValue);
        if (this.playerHealth + healValue >= 100) {
          this.playerHealth = 100;
        } else {
          this.playerHealth += healValue;
        }
      }
    },
    startNewGameHandler() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.isPlayerHeald = false;
      this.messagesLog = [];
      this.gameWinner = null;
    },
    surrender() {
      this.gameWinner = "Monster 👾 Won";
      this.addBattleMessage("Palyer", "surrender", "-");
    },
    addBattleMessage(who, what, value) {
      this.messagesLog.unshift({
        actionCreator: who,
        acitonDescription: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
