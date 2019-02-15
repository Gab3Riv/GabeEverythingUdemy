/*

QUIZ GAME PROGRAMMED BY GABRIEL RIVERA

1. Building a function constructor called Question to describe a question. A question should include the following:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number)
(Hint" write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such 
as you displayed it on task 4.

6. Check if the answer is correct and print to the console whether the answer is correct or not (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and 
doesn't interfere with the other programmers code
(Hint: we learned a special technique to do exactly that).

--- Expert Level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this 
    and call it right after displaying the result)

9. Be careful after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead 
of the answer. In this case,
DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score 
(HINT: I'm going to use the power of closure for this,
but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.

*/

(function () {
    var Question = function(question, answers, correctAnswer){
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.printScore = function(){
            console.log('Your Score Is ' + score);
        }
        this.printQuestion = function(){
            console.log(this.question);
        };
        this.printAnswers = function(){
            for(var i=0; i < this.answers.length; i+=1){
                console.log(i + '. ' + this.answers[i]);
            }
        }
        this.checkAnswer = function(answer){
            if(parseInt(answer) === this.correctAnswer){
                console.log("You are correct!");
                score += 1;
                this.printScore();
                getRandomQuestion();
            }else if(answer === 'exit'){
                console.log("Thanks for playing!");
                return;
            }else{
                console.log("You are wrong! Sorry.");
                this.printScore();
                getRandomQuestion();
            }
        }
    }
    var score = 0;
    var questionArray = [];

    var questionOne = new Question('Is a dog an animal?', ['yes','no'], 0);
    var questionTwo = new Question('Do dogs and cats get along?', ['yes', 'no'], 1);
    var questionThree = new Question('Does Gabes Brother make music?', ['yes', 'no', 'maybe'], 0);
    var questionFour = new Question('Does Gabe prefer salty or sweet food?', ['salty', 'sweet'], 0);
    var questionFive = new Question('Is Adriel Rivera, Gabes Brother?', ['IDK', 'maybe', 'partly', 'yes', 'no'], 3);

    questionArray.push(questionOne);
    questionArray.push(questionTwo);
    questionArray.push(questionThree);
    questionArray.push(questionFour);
    questionArray.push(questionFive);

    function getRandomQuestion(){
        var randomNum = Math.floor(Math.random() * (questionArray.length));
        questionArray[randomNum].printQuestion();
        questionArray[randomNum].printAnswers();

        var answer = prompt('What is your answer?', 'Please choose a number.');
        questionArray[randomNum].checkAnswer(answer);
    }
    getRandomQuestion();
})();


