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
    };
  },

  computed: {
    monsterBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },
    playerBarStyles() {
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
      this.monsterHealth -= calculateRandomValue(5, 12);
      this.attackPlayer();
    },
    attackPlayer() {
      this.playerHealth -= calculateRandomValue(8, 15);
    },
    specialMonsterAttack() {
      this.currentRound++;
      this.monsterHealth -= calculateRandomValue(10, 25);
      this.attackPlayer();
    },
    healPlayer() {
      if (!this.isPlayerHeald) {
        this.isPlayerHeald = true;
        this.currentRound++;
        const randomValue = calculateRandomValue(8, 20);
        if (this.playerHealth + randomValue >= 100) {
          this.playerHealth = 100;
        } else {
          this.playerHealth += randomValue;
        }
      }
    },
  },
});

app.mount("#game");
