import axios from "axios"
import { getKeyValue } from "./storage.service.js"
import { ENUMS } from "../enum/enum.js"


export const getIcon = (icon) => {
    switch(icon.slice(0, -1)) {
        case "01":
            return "☀️" 
        case "02":
            return "🌤️" 
        case "03":
            return "⛅" 
        case "04":
            return "☁️" 
        case "09":
            return "🌧️" 
        case "10":
            return "🌦️" 
        case "11":
            return "⛈️" 
        case "13":
            return "❄️" 
        case "50":
            return "❄️" 
    }
}

export const getWether = async () => {
    
    const token = await  getKeyValue(ENUMS.token)
    const city = await getKeyValue(ENUMS.city)

    if(!token){
        throw new Error("Не задан токен, вы можете задать его через команду -t [API_KEY]")
    }
    if(!city){
        throw new Error("Не задан город, вы можете задать его через команду -s [CYTY]")
    }

    const {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            appid: token,
            lang: "ru",
            units: "metric"
        }
    })

    return data

}