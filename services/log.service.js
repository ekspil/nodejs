import chalk from 'chalk'
import dedent from 'dedent-js'


const printError = (err)=>{
    console.log(chalk.bgRed("ERROR: ") + err)
}
const printSuccess = (msg)=>{
    console.log(chalk.bgCyan("SUCCESS: ") + msg)
}
const printHelp = ()=>{
    console.log(
        dedent(`${chalk.bgGreen("HELP: ")} 
        Без параметров - показать погоду
        -s [CITY] - установка города
        -t [API_KEY] - установка токена
        -h - вывод справки
        `)
    )
}

const printWeather = (data, icon)=>{
    console.log(
        dedent(`
            ${chalk.bgGreenBright("Текущая погода в городе "+ data.name +":")}
            ${icon}  ${data.weather[0].description}
            Температура: ${data.main.temp} (ощущается как ${data.main.feels_like})
            Влажность: ${data.main.humidity}
            Скорость ветра: ${data.wind.speed}
            `)
    )

}

export {printError, printSuccess, printHelp, printWeather}