import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "wether-data.json");

export const saveKeyValue = async (key, value) => {
	const data = await getFile(filePath);

	data[key] = value;

	await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
    const data = await getFile(filePath)
    return data[key]
};

const getFile = async (filePath) => {
	try {
		const data =  await promises.readFile(filePath);
        const json = JSON.parse(data)
		return json
	} 
    catch(e) {
		return {};
	}
};
