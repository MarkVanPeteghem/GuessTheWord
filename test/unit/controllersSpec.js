'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('GuessTheWord.controllers'));


  it('should ....', inject(function($controller) {
    //spec body
    var myCtrl1 = $controller('MyCtrl1', { $scope: {} });
    expect($scope.a).toBe(2);
  }));

  it('should initialize the variables correctly', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });

    expect(scope.solution).toBe("");
    expect(scope.playing).toBe(false);
    expect(scope.guesses.length).toBe(0);
    expect(scope.lettersGuessed.length).toBe(0);
    expect(scope.scores.length).toBe(0);
    expect(scope.message).toEqual("");
  }));

  it('should sort the words by length correctly', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });

    for (var lang=0; lang<scope.words.length; ++lang) {
        for (var len=0; len<scope.words[lang].length; ++len) {
            for (var w=0; w<scope.words[lang][len].length; ++w) {
                var word = scope.words[lang][len][w];
                expect(word.length).toBe(len);
                for (var i=0; i<word.length; ++i) {
                    expect(word[i]>='A')
                    expect(word[i]<='Z')
                }
            }                
        }
    }
  }));

  it('afterStartInEnglish', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });
    
    scope.language = 'English';
    scope.nrLetters = 4;
    
    scope.start();

    expect(scope.solution.length).toBe(4);
    expect(scope.playing).toBe(true);
    expect(scope.guesses).toEqual([{letter:'.'}, {letter:'.'}, {letter:'.'}, {letter:'.'}]);
    expect(scope.lettersGuessed.length).toBe(0);
    expect(scope.scores.length).toBe(0);
    expect(scope.message).toEqual("");
  }));

  it('afterStartInNederlands', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });
    
    scope.language = 'Nederlands';
    scope.nrLetters = 5;
    
    scope.start();

    expect(scope.solution.length).toBe(5);
    expect(scope.playing).toBe(true);
    expect(scope.guesses).toEqual([{letter:'.'}, {letter:'.'}, {letter:'.'}, {letter:'.'}, {letter:'.'}]);
    expect(scope.lettersGuessed.length).toBe(0);
    expect(scope.scores.length).toBe(0);
    expect(scope.message).toEqual("");
  }));

  it('should show the letter in guesses after a good letter is guessed', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });
    
    scope.languages = 'English';
    scope.nrLetters = 4;
    
    scope.start();
    scope.solution = "FIVE";
    
    scope.guessedLetter = 'E';
    scope.guess();

    expect(scope.solution.length).toBe(4);
    expect(scope.playing).toBe(true);
    expect(scope.guesses).toEqual([{letter:'.'}, {letter:'.'}, {letter:'.'}, {letter:'E'}]);
    expect(scope.lettersGuessed).toEqual(['E']);
    expect(scope.scores.length).toBe(0);
    expect(scope.message).toEqual("");
  }));

  it('should show no changes in the guesses after a bad letter is guessed', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });
    
    scope.languages = 'English';
    scope.nrLetters = 4;
    
    scope.start();
    scope.solution = "FIVE";
    
    scope.guessedLetter = 'A';
    scope.guess();

    expect(scope.solution.length).toBe(4);
    expect(scope.playing).toBe(true);
    expect(scope.guesses).toEqual([{letter:'.'}, {letter:'.'}, {letter:'.'}, {letter:'.'}]);
    expect(scope.lettersGuessed).toEqual(['A']);
    expect(scope.scores.length).toBe(0);
    expect(scope.message).toEqual("");
  }));

  it('after one good letter is guessed twice it should show an error message and not add the letter again to the guessed letters', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });
    
    scope.languages = 'English';
    scope.nrLetters = 4;
    
    scope.start();
    scope.solution = "FIVE";
    
    scope.guessedLetter = 'E';
    scope.guess();
    scope.guessedLetter = 'E';
    scope.guess();

    expect(scope.solution.length).toBe(4);
    expect(scope.playing).toBe(true);
    expect(scope.guesses).toEqual([{letter:'.'}, {letter:'.'}, {letter:'.'}, {letter:'E'}]);
    expect(scope.lettersGuessed).toEqual(['E']);
    expect(scope.scores.length).toBe(0);
    expect(scope.message).toEqual("This letter was already tried");
  }));

  it('should show an error message after a nonletter is entered', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });
    
    scope.languages = 'English';
    scope.nrLetters = 4;
    
    scope.start();
    scope.solution = "FIVE";
    
    scope.guessedLetter = '5';
    scope.guess();

    expect(scope.solution.length).toBe(4);
    expect(scope.playing).toBe(true);
    expect(scope.guesses).toEqual([{letter:'.'}, {letter:'.'}, {letter:'.'}, {letter:'.'}]);
    expect(scope.lettersGuessed).toEqual([]);
    expect(scope.scores.length).toBe(0);
    expect(scope.message).toEqual("Please enter a letter");
  }));

  it('should show a message with the nr of tries after the whole word is guessed', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });
    
    scope.languages = 'English';
    scope.nrLetters = 4;
    
    scope.start();
    scope.solution = "FIVE";
    
    scope.guessedLetter = 'F';
    scope.guess();
    scope.guessedLetter = 'I';
    scope.guess();
    scope.guessedLetter = 'V';
    scope.guess();
    scope.guessedLetter = 'E';
    scope.guess();

    expect(scope.solution.length).toBe(4);
    expect(scope.playing).toBe(false);
    expect(scope.guesses).toEqual([{letter:'F'}, {letter:'I'}, {letter:'V'}, {letter:'E'}]);
    expect(scope.lettersGuessed).toEqual(['F', 'I', 'V', 'E']);
    expect(scope.scores).toEqual([{"word":"FIVE", "nrTries": 4, "lang": 'English'}]);
    expect(scope.message).toEqual("You found it in 4 tries!");
  }));

  it('should show the solution after stopping', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('GameCtrl', { $scope: {} });
    
    scope.languages = 'English';
    scope.nrLetters = 4;
    
    scope.start();
    scope.solution = "FIVE";
    
    scope.stop();

    expect(scope.solution.length).toBe(4);
    expect(scope.playing).toBe(false);
    expect(scope.guesses).toEqual([{letter:'.'}, {letter:'.'}, {letter:'.'}, {letter:'.'}]);
    expect(scope.lettersGuessed).toEqual([]);
    expect(scope.scores.length).toBe(0);
    expect(scope.message).toEqual("The word was FIVE");
  }));
});
