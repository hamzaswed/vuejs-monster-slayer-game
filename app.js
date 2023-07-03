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

  methods: {
    attackMonster() {
      this.monsterHealth -= calculateAttackValue(5, 12);
      console.log(this.monsterHealth);
      this.attackPlayer();
    },
    attackPlayer() {
      this.playerHealth -= calculateAttackValue(8, 15);
    },
  },
});

app.mount("#game");
