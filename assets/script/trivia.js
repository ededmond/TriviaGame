$(document).ready(function() {

    var question1 = {
        question : "What is the address of the Black House?",
        answers : ["4 Privet Drive","12 Grimmauld Place","7 Godric's Hollow", "13 Grimmauld Place"],
        answer : "12 Grimmauld Place"
    };
    var question2 = {
        question : "Where does Hermione get Crookshanks?",
        answers : ["She finds him wandering Diagon Alley","Magical Menagerie","Eeylops Owl Emporium","He started following her around over the summer"],
        answer : "Magical Menagerie"
    };

    var questions = [question1,question2];
    var index;
    var letters = ["A) ", "B) ", "C) ", "D) "];
    var ans; 
    var time;
    var timeIncrement;
    var wins =0;
    var losses =0;
    var button = $("<button>");
    button.text("Start");
    button.on("click",function() {
        restart();
    });
    $("#Question").append(button);
    function restart() {
        questions.sort(function() { //put questions in a random order
            return 0.5 - Math.random();
        });
        index = -1;
        nextQuestion();
        
    }
    function timeQuestion() {
        if (time < 1) {
            clearInterval(timeIncrement);
            $("#Timer").text("Time's Up!");
            wrong();
        } else {
            time--;
            $("#Timer").text("Time Remaining: " + time);
        }
    }
    function nextQuestion() {
        time = 25;
        index++;
        if (index >= questions.length) {
            $("#Timer").text("");
            $("#Qnum").text("");
            $("#Question").text("Final Score : " + ((wins/(wins + losses))*100) + "%");
            $("#Answers").text("");
            button.text("Restart");
            $("#Answers").append(button);
        } else {
            $("#Timer").text("Time Remaining: " + time);
            var answers = questions[index].answers;
            answers.sort(function() { //put questions in a random order
                return 0.5 - Math.random();
            });
            $("#Question").html("<h1>" + questions[index].question +"</h1>");
            $("#Qnum").text("Question #" + (index+1) + ":");
            $("#Answers").text("");
            for (var i =0; i <answers.length; i++) {
                var newA = $("<h2>" + letters[i] + answers[i] + "</h2>");
                newA.addClass("answer");
                $("#Answers").append(newA);
                if (answers[i] == questions[index].answer) {
                    ans = letters[i] + answers[i];
                }
            }
            timeIncrement = setInterval(timeQuestion,1000);
            
        }
        
    }
    $(document).on("click",".answer",function() {
        console.log("got HERE");
        var text = $(this).text();
        console.log(text);
        console.log(ans);
        if (text === ans) {
            correct();
        } else {
            wrong();
        }
    });
    function correct() {
        $("#Question").text("Correct!");
        $("#Answers").html("<h2>"+ ans+"</h2>");
        wins++;
        clearInterval(timeIncrement);
        $("#Score").text(wins + " / "+ (wins+ losses));
        var per = (wins / (wins + losses))*100;
        $("#Score-p").text(per + "%");
        setTimeout(nextQuestion,5000);
    }
    function wrong() {
        $("#Question").text("Wrong!");
        $("#Answers").html("<h2>"+ ans+"</h2>");
        losses++;
        clearInterval(timeIncrement);
        $("#Score").text(wins + "/" + (wins + losses));
        var per = (wins / (wins + losses))*100;
        $("#Score-p").text(per + "%");
        setTimeout(nextQuestion,5000);
    }

});
