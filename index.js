#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let programmingLanguage;

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


await welcome();
await askProgrammingLanguage();