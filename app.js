$(document).ready(function() {
  var options = [
    {
      question:
        "In one episode, Jerry agreed to wear a particular article of clothing for an interview on The Today Show. What was it?",
      choice: [
        "Cowboy Hat",
        "Puffy Shirt",
        "Hawaiian Shirt",
        "Football Jersey"
      ],
      answer: 1
    },
    {
      question:
        "Which Seinfeld writer voiced George Steinbrenner on and off from seasons five through nine?",
      choice: [
        "Peter Mehlman",
        "Spike Feresten",
        "Larry Charles",
        "Larry David"
      ],
      answer: 3
    },
    {
      question:
        "Which of these occupations did George's alias, Art Vanderlay, NOT purport to peddle in?",
      choice: ["Garbageman", "Novelist", "Latex Salesman", "Importer/Exporter"],
      answer: 0
    },
    {
      question: "Hear ye, hear ye! It's a Festivus for...",
      choice: ["The Ages!", "For Us!", "The Rest of Us!", "All Eternity!"],
      answer: 2
    },
    {
      question: "What is Kramer's first name?",
      choice: ["Conrad", "Kelly", "He Has No First Name", "Cosmo"],
      answer: 3
    },
    {
      question: "Who is the postman in Jerry's apartment building?",
      choice: ["Newman", "George", "Kramer", "Art Vanderlay"],
      answer: 0
    },
    {
      question:
        "Who claims to have invented the 'it's not you, it's me' routine?",
      choice: ["Elaine", "Newman", "George", "Mulva"],
      answer: 2
    },
    {
      question: "What was George's idea for the Yankees uniforms?",
      choice: [
        "Switch to Shorts",
        "Go From Polyester to Cotton",
        "Change the Color to Green",
        "Switch the Hat to a Visor"
      ],
      answer: 1
    },
    {
      question:
        "In the episode 'The Pothole', Elaine goes to great lengths to order a particular dish from a nearby Chinese restaurant. What is the name of the dish?",
      choice: [
        "Supreme Flounder",
        "Chicken Lo Mein",
        "Egg Drop Soup",
        "Sesame Chicken"
      ],
      answer: 0
    },
    {
      question:
        "George causes Antonio to lose his job at a restaurant. What was Antonio's job?",
      choice: ["Server", "Chef", "Dish Washer", "Bus Boy"],
      answer: 3
    }
  ];

  var correctCount = 0;
  var wrongCount = 0;
  var unanswerCount = 0;
  var timer = 20;
  var intervalId;
  var userGuess = "";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];

  $("#reset").hide();

  $("#start").on("click", function() {
    $("#start").hide();
    displayQuestion();
    runTimer();
    for (var i = 0; i < options.length; i++) {
      holder.push(options[i]);
    }
  });
  function runTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }
  function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer--;

    if (timer === 0) {
      unanswerCount++;
      stop();
      $("#answerblock").html(
        "<p>Time is up! The correct answer is: " +
          pick.choice[pick.answer] +
          "</p>"
      );
    }
  }
  function stop() {
    running = false;
    clearInterval(intervalId);
  }
  function displayQuestion() {
    index = Math.floor(Math.random() * options.length);
    pick = options[index];

    if (pick.shown) {
      displayQuestion();
    } else {
      console.log(pick.question);

      $("#questionblock").html("<h2>" + pick.question + "</h2>");
      for (var i = 0; i < pick.choice.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(pick.choice[i]);
        userChoice.attr("data-guessvalue", i);
        $("#answerblock").append(userChoice);
      }
    }
    $(".answerchoice").on("click", function() {
      userGuess = parseInt($(this).attr("data-guessvalue"));

      if (userGuess === pick.answer) {
        stop();
        correctCount++;
        userGuess = "";
        $("#answerblock").html("<p>Correct!</p>");
        setTimeout(function() {
          displayQuestion();
          runTimer();
        }, 3000);
      } else {
        stop();
        wrongCount++;
        userGuess = "";
        $("#answerblock").html(
          "<p> Wrong! The correct answer is: " +
            pick.choice[pick.answer] +
            "</p>"
        );
        setTimeout(function() {
          displayQuestion();
          runTimer();
        }, 3000);
      }
    });
  }

  if (wrongCount + correctCount + unanswerCount === qCount) {
    $("#questionblock").empty();
    $("#questionblock").html("<h3> Game Over! How'd you do? </h3>");
    $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
    $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
    $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
    $("#reset").show();
    correctCount = 0;
    wrongCount = 0;
    unanswerCount = 0;
  } else {
    // runTimer();
    // displayQuestion();
  }

  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for (var i = 0; i < holder.length; i++) {
      options.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  });
});
