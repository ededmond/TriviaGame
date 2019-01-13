$(document).ready(function() {

    var question1 = {
        question : "What is the address of the Black House?",
        answers : ["4 Privet Drive","7 Godric's Hollow", "13 Grimmauld Place"],
        answer : "12 Grimmauld Place"
    };
    var question2 = {
        question : "Where does Hermione get Crookshanks?",
        answers : ["She finds him wandering Diagon Alley","Eeylops Owl Emporium","He started following her around over the summer"],
        answer : "Magical Menagerie"
    };

    var questions = [question1,question2, {
            question : "Where in Diagon Alley does Harry first meet Draco Malfoy?",
            answers : ["Flourish and Blotts","The Leaky Cauldron","Outside the Broom Shop"],
            answer : "Madam Malkin's Robes for All Occasions"
        }, {
            question: "How does Harry sneak into Hogsmeade?",
            answers : ["Gunhilda of Horsemoor Corridor","Third Floor Corridor","Moaning Myrtle's Bathroom"],
            answer : "One-Eyed Witch Passage"
        }, {
            question : "Who teaches the flying lesson classes at Hogwarts?",
            answers : ["Madame Pince","Professor Severus Snape","Silvanus Kettleburn"],
            answer : "Madame Hooch"
        }, {
            question : "After Professor Trelawney is fired, who takes over teaching Divination?",
            answers : ["Horris Slughorn","Madame Pomfrey","Professor Binns"],
            answer: "Firenze"
        }, {
            question: "How many brothers does Ron Weasley have?",
            answers : ["4","6","7"],
            answer: "5"
        }, {
            question : "What profession do Hermione Granger's parents share?",
            answers : ["Pediatricians","Accountants","Cryptozoologists"],
            answer : "Dentists"
        }, {
            question : "From what platform does the Hogwarts Express leave?",
            answers: ["13", "7", "7 1/3"],
            answer : "9 3/4"
        }, {
            question : "What is the only class at Hogwarts taught by a ghost?",
            answers: ["Herbology","History of Wizarding","Arithmancy"],
            answer : "History of Magic"
        }
    ];
    var index;
    var letters = ["A) ", "B) ", "C) ", "D) "];
    var ans; 
    var time;
    var timeIncrement;
    var wins =0;
    var losses =0;
    var button = $("#restart");
    button.on("click",restart);
    
    function restart() {
        wins =0;
        losses =0;
        $("#Question").addClass("normal-font");
        questions.sort(function() { //put questions in a random order
            return 0.5 - Math.random();
        });
        index = -1;
        button.hide();
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
        var letterI =0;
        if (index >= questions.length) {
            $("#Timer").text("");
            $("#Qnum").text("Final Score : " + ((wins/(wins + losses))*100) + "%");
            $("#Answers").text("");
            button.text("Restart");
            $("#restart").show();
            $("#Question").text("");
            $("#Score").text("");
            $("#Score-p").text("");
        } else {
            $("#Timer").text("Time Remaining: " + time);
            var answers = questions[index].answers;
            answers.sort(function() { //put questions in a random order
                return 0.5 - Math.random();
            });
            $("#Question").html("<h1>" + questions[index].question +"</h1>");
            $("#Qnum").text("Question #" + (index+1) + ":");
            $("#Answers").text("");
            var addAns = Math.floor(Math.random()*3);
            for (var i =0; i <answers.length; i++) {
                var newA = $("<h2>" + letters[letterI] + answers[i] + "</h2>");
                newA.addClass("answer");
                $("#Answers").append(newA);
                console.log(addAns + " = " + i +" letter: " + letterI);
                if (i === addAns) {    //add correct answer
                    console.log("Make ")
                    letterI++;
                    ans = letters[letterI] + questions[index].answer;
                    newA = $("<h2>" + ans + "</h2>");
                    newA.addClass("answer");
                    $("#Answers").append(newA);
                }
                letterI++;
            }
            timeIncrement = setInterval(timeQuestion,1000);
            
        }
        
    }
    $(document).on("click",".answer",function() {
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
    // document.on("click",".restart",function() {
    //     restart();
    // });

});
