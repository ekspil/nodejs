#!/usr/bin/env node

import { ENUMS } from "./enum/enum.js";
import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { getKeyValue, saveKeyValue } from "./services/storage.service.js";
import { getIcon, getWether } from "./services/wether.service.js";

const saveData = async (name, data) => {
	try {
		await saveKeyValue(name, data);
		printSuccess(name + " saved");
	} catch (error) {
		printError(error.message);
	}
};
const fetchWether = async (name, data) => {
	try {
		const data = await getWether();
		printWeather(data, getIcon(data.weather[0].icon))
	} catch (error) {
		printError(error);
	}
};

const main = async () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
		return;
	}
	if (args.s) {
		await saveData(ENUMS.city, args.s);
	}
	if (args.t) {
		await saveData(ENUMS.token, args.t);
	}

	await fetchWether()


};

main();
