var questions = new Array();
questions[0] = new Image();
questions[0].src = './res/charlie.jpg';
questions[1] = new Image();
questions[1].src = "./res/lawrence.jpg";
questions[2] = new Image();
questions[2].src = "./res/lennie.jpg";
questions[3] = new Image();
questions[3].src = "./res/worthy.jpg";
questions[4] = new Image();
questions[4].src = "./res/mia.jpg";



var choices = new Array();
choices[0] = ['Jim Tatum', 'Bill Dooley', 'Charlie Justice', 'Don McCauley'],
choices[1] = ['Amos Lawrence', 'Lawrence Taylor', 'George Barclay', 'William Fuller'],
choices[2] = ['Charles Scott', 'Tommy LaGarde', 'Larry Brown', 'Lennie Rosenbluth'],
choices[3] = ['Sam Perkins', 'James Worthy', 'Walter Davis', 'Buzz Peterson'],
choices[4] = ['Mia Hamm', 'Shannon Higgins', 'Yael Averbuch', 'Kristine Lilly'];


var answers = new Array();
answers[0] = ['Charlie Justice'],
answers[1] = ['Lawrence Taylor'],
answers[2] = ['Lennie Rosenbluth'],
answers[3] = ['James Worthy'],
answers[4] = ['Mia Hamm'];



var score = 0;
i= 0;

var listQuestion = function(){  
    if(i<questions.length){
        document.getElementById("pic").src = questions[i].src;
        var choicesOutput=[];//new Array()
        for (var k=0; k<choices[i].length; k++){
            choicesOutput.push(
                '<p><input type = "radio" value="'+choices[i][k]+'" name ='
                +' "questionchoice">'+choices[i][k]+'</p>');
        }
        document.getElementById("myDiv2").innerHTML =choicesOutput.join("");
        document.getElementById("myDiv3").innerHTML = 
            '<p><button onClick = "getRadioValue()">Check</button></p> <br>';
    }
};
var getRadioValue = function(){
    var value = '';
    for (var h = 0; 
        h < document.getElementsByName('questionchoice').length; h++){
        if (document.getElementsByName('questionchoice')[h]
            .checked==true){
            value = document.getElementsByName('questionchoice')[h].value;
            // console.log(value);
            score++;
            console.log("Score "+score);
        }
    }
    if (value== answers[i]){
        document.getElementById("myDiv4").innerHTML =
            "That is correct. </br><button input type = "
            +"'submit' onClick = 'loadContent()'> Next Question</button>";
        document.getElementById("score").innerHTML = "Score: "+score;
        if(score >= 4){
            parent.postMessage("win","*");
        }
    }
    else {
        document.getElementById("myDiv4").innerHTML ="That is incorrect. "
           +"</br><button input type = 'submit' onClick = 'loadContent()'> N"
           +"ext Question</button>"; 
    }
    i++;
};
var whatIsScore = function(){
    return score; 
};
function loadContent(){
    document.getElementById("myDiv4").innerHTML="";
    listQuestion();
}
window.onload = listQuestion;