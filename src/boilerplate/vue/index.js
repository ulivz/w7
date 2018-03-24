export default {
  css: `.button {
  color: white;
  border: 1px solid #e2e2e2;
  background: magenta;
  padding: 20px 0;
  font-size: 2rem;
  width: 200px;
}

.counter {
  margin-top: 20px;
}
`,
  html: `<div id="app">
  <h2>{{ count }}</h2>
  <button @click="inc">inc</button>
  <button @click="dec">dec</button>
</div>`,
  js: `new Vue({
  el: '#app',
  data: { count: 0 },
  methods: {
    inc() {
      this.count++
    },
    dec() {
      this.count--
    }
  }
})`
}
