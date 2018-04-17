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
      highScore: 15,
      highScoreAchieved: false,
	    not_running: true,
	    paused: true,
	    intId: 0,
	    mode: "flash",
      cpuPos: 0.0,
      soundOn: true,
      diff: "medium"
    },
    computed: {
      // returns max(0, score)
      floorScore: function() {
        if (this.score >= 0) return this.score
        else return 0
      },
      // returns a difficulty multiplier based on what the user has selected
      diffMult: function() {
        if (this.diff == "easy") return 0.5
        else if (this.diff == "medium") return 1
        else if (this.diff == "hard") return 1.5
      }
    },
    methods: {
      // generates a new problem
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
          if (this.b > this.a) {
            var dummy = this.a
            this.a = this.b
            this.b = dummy
          }
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
      // checks the user's answer to the problem
      check_answer: function() {
        if (this.user_answer == this.answer) {
          if (this.soundOn) {
            var audio = new Audio('static/correct.wav');
            audio.play();
          }
          this.status = 1;
          this.numCorrect += 1;
        } else {
          if (this.soundOn) {
            var audio = new Audio('static/wrong.wav');
            audio.play();
          }
          this.status = -1;
        }
        this.score += this.status;
        if (this.score >= this.highScore) {
          this.highScore = this.score;
          if (!this.highScoreAchieved) {
            this.highScoreAchieved = true;
            if (this.soundOn) {
              var audio = new Audio('static/highscore.mp3');
              audio.play();
            }
          }
        }
        this.numAttempted += 1;
        this.percentRight = (this.numCorrect/this.numAttempted) * 100;
      },
      // resets the user's score to 0
      reset_score: function() {
        this.score = 0;
        this.numAttempted = 0;
        this.numCorrect = 0;
        this.percentRight = 0;
        this.status = 0;
        this.problem = "";
      },
      // function that runs every 25ms
      // handles movement of CPU car and losing the race
  	  run: function() {
  		  if (this.cpuPos >= 1) {
  			  this.pause_anim();
			  if (this.soundOn)
			  {
				  var audio = new Audio('static/racelose.m4a');
				  audio.play();
			  }
          this.status = -1;
  		  } else {
          var race_length = $("#gamecontent").width();
          this.cpuPos = this.cpuPos + (1/2400)*this.diffMult;
          var position = (race_length-250) * this.cpuPos + 10;
  			  $("#p2").css("left", position + "px");
  		  }
  	  },
      // starts the race
  	  begin_anim: function() {
        this.not_running = false;
    		this.paused = false;
    		this.cpuPos = 0.0;
        $("#p1").css("left", "10px");
        $("#p2").css("left", "10px");
    		if (this.soundOn) {
    			var audio = new Audio('static/racestart.mp3');
    			audio.play();
    		}
    		this.intId = setInterval(this.run, 25);
        this.new_problem();
  	  },
      // pauses the race
  	  pause_anim: function() {
  		  this.not_running = false;
  		  this.paused = true;
  		  clearInterval(this.intId);
  	  },
      // resumes the race
  	  resume_anim: function() {
  		  this.not_running = false;
  		  this.paused = false;
  		  this.intId = setInterval(this.run, 25);
  	  },
      // restarts the race
  	  restart_anim: function() {
  		  this.not_running = true;
  		  this.paused = true;
  		  this.cpuPos = 0.0;
        $("#p1").css("left", "10px");
        $("#p2").css("left", "10px");
  		  clearInterval(this.intId);
        this.reset_score();
        this.status = 0;
  	  },
      // checks user answer and moves user car in race mode
      race_check_ans: function() {
        this.check_answer();
        var race_length = $("#gamecontent").width();
        var position = (race_length-250) * this.floorScore / 10;
        $("#p1").css("left", position + "px");
        if (this.score == 10) {
          this.pause_anim();
          this.status = 1;
          if (this.soundOn) {
            var audio = new Audio('static/racewin.mp3');
            audio.play();
          }
        } else {
          this.new_problem();
        }
      },
      // switches to flashcard mode
      to_flash: function() {
        this.reset_score();
        this.mode = "flash";
      },
      // switches to race mode
      to_race: function() {
        this.reset_score();
        this.mode = "race";
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
