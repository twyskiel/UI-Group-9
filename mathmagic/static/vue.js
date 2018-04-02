var App = new Vue({
  delimiters: ['${', '}'],
  el: '#my-vue-app',
  data: {
    logged_in: false,
    username: "",
    problem: "",
    answer: "",
    user_answer: "",
    a: 0,
    b: 0,
    o: 0,
    ops: [" + ", " - ", " * "],
    status: 0   // 0 if waiting for answer, 1 if correct, -1 if wrong
  },
  methods: {
    new_problem: function() {
      this.status = 0
      this.user_answer = 0
      this.a = Math.floor((Math.random() * 10) + 1)
      this.b = Math.floor((Math.random() * 10) + 1)
      this.o = Math.floor(Math.random() * 3)
      var op = this.ops[this.o]
      this.problem = this.a.toString() + op + this.b.toString()
      if (op == " + ") {
        this.answer = this.a + this.b
      } else if (op == " - ") {
        this.answer = this.a - this.b
      } else if (op == " * ") {
        this.answer = this.a * this.b
      }
    },
    check_answer: function() {
      if (this.user_answer == this.answer) this.status = 1
      else this.status = -1
    }
  }
})
