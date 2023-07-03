function calculateAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },

  computed: {
    monsterBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },
    playerBarStyles() {
      return { width: `${this.playerHealth}%` };
    },
  },

  methods: {
    attackMonster() {
      this.monsterHealth -= calculateAttackValue(5, 12);
      this.attackPlayer();
    },
    attackPlayer() {
      this.playerHealth -= calculateAttackValue(8, 15);
    },
  },
});

app.mount("#game");
