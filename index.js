#!/usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';
import os from 'os';

const { argv } = yargs(process.argv);

const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

async function usePokedex(name) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const response = await data.json();

    const nameOf = capitalizeFirstLetter(response.name);
    const type = capitalizeFirstLetter(response.types[0].type.name);
    const ability = capitalizeFirstLetter(response.abilities[0].ability.name);

    console.log(chalk.redBright(`Name:`), chalk.cyan(nameOf));
    console.log(chalk.redBright(`Type:`), chalk.cyan(type));
    console.log(chalk.redBright(`Ability:`), chalk.cyan(ability));

    const stats = response.stats.map((item) => {
      return `${capitalizeFirstLetter(item.stat.name)} - ${item.base_stat}`;
    });
    console.log(chalk.redBright(`Stats:`), chalk.cyan(`${stats.join(', ')}`));

    const moves = response.moves
      .map((item) => capitalizeFirstLetter(item.move.name))
      .slice(0, 5);
    console.log(chalk.redBright(`Moves:`), chalk.cyan(`${moves.join(', ')}`));

    console.log(
      chalk.blueBright(`\nCPU Usage:`, chalk.redBright(`${os.cpus().length}%`))
    );
    console.log(
      chalk.blueBright(
        `Free Memory:`,
        chalk.yellowBright(`${os.freemem()} bytes`)
      )
    );
    console.log(
      chalk.blueBright(
        `Total Memory:`,
        chalk.greenBright(`${os.totalmem()} bytes`)
      )
    );
  } catch (error) {
    console.error(
      chalk.redBright(
        `Uh-oh! Team Rocket must have interfered. Unable to retrieve data for Pokémon ${argv.pokemon}. Make sure the Pokémon hasn't used Teleport and try again!`
      )
    );
  }
}

usePokedex(argv.pokemon);
