#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let programmingLanguage;
var nbQuestion = 2;
var nbGoodAnswer = 0;
var nbWrongAnswer = 0;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
	const programmingLanguageTitle = chalkAnimation.glitch(
		'Guess the code result'
	);

	await sleep();
	programmingLanguageTitle.stop();

	console.log(`
		${chalk.bgBlue('HOW TO PLAY')}
		Guess the result of the shown code.
		Try to get a perfect score.
	`)
}

async function askProgrammingLanguage() {
  const answers = await inquirer.prompt({
    name: "programming_language",
    type: "list",
    message: "In which programming language?",
    choices: [
    	'JavaScript',
    	'Ruby',
    	],
  });
  programmingLanguage = answers.programming_language;
}


async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "\"Awesome\"+\", \"+\"Javascript\"\n",
    choices: [
      "Awesome Javascript",
      "\"Awesome\", \"Javascript\"",
      "Awesome, Javascript",
      "\"Awesome, Javascript\"",
    ],
  });
  return answers.question1 === "Awesome, Javascript";
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question2",
    type: "list",
    message: "12+\"34\"\n",
    choices: [
      "1234",
      "12\"34\"",
      "Error",
      "\"1234\"",
    ],
  });
  return answers.question2 === "1234";
}



async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({
       text: `Good answer`,
    });
  	nbGoodAnswer++;
  } else {
    spinner.error({
       text: `Wrong answer`,
    });

  	nbWrongAnswer++;
  }
}

function result() {
  // console.clear();
  var score = (nbGoodAnswer/nbQuestion)*100;
  if (score == 100) {
  	const msg = `Perfect !`;

		figlet(msg, (err, data) => {
			console.log(gradient.pastel.multiline(data));
		});
	} else if (score >= 80) {
  	console.log(chalk.bgGreen("Excellent!"));
	} else if (score >= 60) {
  	console.log(chalk.bgBlue("Good work!"));
	} else if (score >= 40) {
   	console.log(chalk.bgYellow("Almost got it!"));
	} else if (score >= 20) {
   	console.log(chalk.bgYellow("Better luck next time!"));
	} else { 
 		console.log(chalk.bgRed("Sorry!"));
	}
}

await welcome();
await askProgrammingLanguage();
await handleAnswer(await question1());
await handleAnswer(await question2());
await result();
