$(document).ready( function() {
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
      ops: [" + ", " - ", " * ", " / "],
      status: 0,   // 0 if waiting for answer, 1 if correct, -1 if wrong
      score: 0,
      opsChecked: [" + ", " - ", " * ", " / "],
      numAttempted: 0,
      numCorrect: 0,
      percentRight: 0,
      highScore: 0,
	  not_running: true,
	  paused: true,
	  intId: 0,
	  playerPos: 10
    },
    methods: {
      new_problem: function() {
        this.status = 0
        this.user_answer = ""
        this.a = Math.floor((Math.random() * 10) + 1)
        this.b = Math.floor((Math.random() * 10) + 1)
        this.o = Math.floor(Math.random() * this.opsChecked.length)
        var op = this.opsChecked[this.o]
        if (op == " + ") {
          this.answer = this.a + this.b
        } else if (op == " - ") {
          this.answer = this.a - this.b
        } else if (op == " * ") {
          this.answer = this.a * this.b
        } else if (op == " / ") {
          this.answer = Math.floor((Math.random() * 10) + 1)
          this.a = this.b * this.answer
        }
        this.problem = this.a.toString() + op + this.b.toString();
        $('#user_input').focus();
      },
      check_answer: function() {
        if (this.user_answer == this.answer) {
          var audio = new Audio('static/correct.wav');
          audio.play();
          this.status = 1;
          this.numCorrect += 1;
        } else {
          var audio = new Audio('static/wrong.wav');
          audio.play();
          this.status = -1;
        }
        this.score += this.status;
        if (this.score >= this.highScore) this.highScore = this.score;
        this.numAttempted += 1;
        this.percentRight = (this.numCorrect/this.numAttempted) * 100;
      },
      reset_score: function() {
        this.score = 0;
        this.numAttempted = 0;
        this.numCorrect = 0;
        this.percentRight = 0;
        this.status = 0;
        this.problem = "";
      },
	  run: function() {
		  var race_length = $("#gamecontent").width()
		  if (this.playerPos >= race_length - 215)
		  {
			  clearInterval(this.intId);
			  this.not_running = true;
			  this.paused = true;
		  }
		  else
		  {
			  this.playerPos++;
			  $("#p2").css("left", this.playerPos + "px");
		  }
	  },
	  begin_anim: function() {
		  this.not_running = false;
		  this.paused = false;
		  this.playerPos = 10;
		  $("#p2").css("left", this.playerPos + "px");
		  this.intId = setInterval(this.run, 25);
	  },
	  pause_anim: function() {
		  this.not_running = false;
		  this.paused = true;
		  clearInterval(this.intId);
	  },
	  resume_anim: function() {
		  this.not_running = false;
		  this.paused = false;
		  this.intId = setInterval(this.run, 25);
	  },
	  restart_anim: function() {
		  this.not_running = true;
		  this.paused = true;
		  this.playerPos = 10;
		  $("#p2").css("left", this.playerPos + "px");
		  clearInterval(this.intId);
	  }
    },
    directives: {
      focus: {
        // directive definition
        inserted: function (el) {
          el.focus();
        }
      }
    }
  })
});
