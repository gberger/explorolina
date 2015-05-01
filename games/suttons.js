var questions = [
  {
    image: './res/charlie.jpg',
    alternatives: ['Jim Tatum', 'Bill Dooley', 'Charlie Justice', 'Don McCauley'],
    correct: 'Charlie Justice'
  },  {
    image: "./res/lawrence.jpg",
    alternatives: ['Amos Lawrence', 'Lawrence Taylor', 'George Barclay', 'William Fuller'],
    correct: 'Lawrence Taylor'
  },  {
    image: "./res/lennie.jpg",
    alternatives: ['Charles Scott', 'Tommy LaGarde', 'Larry Brown', 'Lennie Rosenbluth'],
    correct: 'Lennie Rosenbluth'
  },  {
    image: "./res/worthy.jpg",
    alternatives: ['Sam Perkins', 'James Worthy', 'Walter Davis', 'Buzz Peterson'],
    correct: 'James Worthy'
  },  {
    image: "./res/mia.jpg",
    alternatives: ['Mia Hamm', 'Shannon Higgins', 'Yael Averbuch', 'Kristine Lilly'],
    correct: 'Mia Hamm'
  }
]

var shuffle = function(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

var DELAY = 2 * 1000;

var $correct = $('.correct');
var $soFar = $('.so-far');
var $total = $('.total');
var $buttons = $('.choice button');
var $choice1 = $('#choice-1');
var $choice2 = $('#choice-2');
var $choice3 = $('#choice-3');
var $choice4 = $('#choice-4');
var $atheleteImg = $('#athlete-img');
var $imgLoader = $('#img-loader');
var $restartButton = $('.restart-button');
var $game = $('.game');
var $fin = $('.fin');
var $again = $('.again');


var start = function() {
  $fin.hide();
  $game.show();

  shuffle(questions);
  var currentQuestion = -1;
  var correct = 0;
  var total = questions.length;

  $total.text(total);

  var nextQuestion = function() {
    currentQuestion += 1;

    var question = questions[currentQuestion];
    shuffle(question.alternatives);

    if(questions[currentQuestion+1]){ 
      $imgLoader.attr('src', questions[currentQuestion+1].image)
    }

    $buttons.removeClass("guess-correct guess-wrong").attr('disabled', false);
    $choice1.text(question.alternatives[0]).data('athlete-name', question.alternatives[0]);
    $choice2.text(question.alternatives[1]).data('athlete-name', question.alternatives[1]);
    $choice3.text(question.alternatives[2]).data('athlete-name', question.alternatives[2]);
    $choice4.text(question.alternatives[3]).data('athlete-name', question.alternatives[3]);
    $atheleteImg.attr('src', question.image);
  }

  $buttons.on('click', function(e) {
    var $guessElement = $(e.target);
    var guess = $guessElement.data('athlete-name');
    var actual = questions[currentQuestion].correct;
    var question = questions[currentQuestion];
    var $actualElement = $('#choice-' + (question.alternatives.indexOf(actual)+1));

    $buttons.attr('disabled', true);

    if(guess == actual) {
      correct += 1;
      $guessElement.addClass("guess-correct");
    } else {
      $actualElement.addClass("guess-correct");
      $guessElement.addClass("guess-wrong");
    }

    $correct.text(correct);
    $soFar.text(currentQuestion+1);

    if(currentQuestion+1 < total) {
      setTimeout(nextQuestion, DELAY);
    } else {
      setTimeout(function(){end(correct)}, DELAY);
    }

  });

  nextQuestion();
}

var end = function(correct) {
  $game.hide();
  $fin.show();
  if(correct >= 3) {
    parent.postMessage('win', '*');
  } else {
    $again.show();
  }
}

var restart = function() {
  parent.postMessage('lose', '*');
  start();
}

$restartButton.on('click', restart);

start();

