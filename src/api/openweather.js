export default class OpenWeatherApi {
    constructor() {
        this.baseUrl = 'http://api.openweathermap.org/data/2.5/'        
        this.apiKey = '5cc25850a31d745765dae82b247ec2fe'
        this.api = 'weather'
        this.query = 'q='
        this.apiUrl = `${this.baseUrl}${this.api}?${this.query}&APPID=${this.apiKey}&units=metric`;
        this.ru = 'ru'
        this.en = 'en'
        this.id = ''
        this.apiLang = 'forecast'
        this.apiUrlLang = `${this.baseUrl}${this.api}?${this.id}&APPID=${this.apiKey}&lang=${this.ru}&units=metric`;        
    }
    
    rebuildApiUrl () {
        this.apiUrl = `${this.baseUrl}${this.api}?${this.query}&APPID=${this.apiKey}&units=metric`;
        this.apiUrlLang = `${this.baseUrl}${this.api}?${this.id}&APPID=${this.apiKey}&lang=${this.ru}&units=metric`;   
    }

    weatherFor (cityName){
        this.query= 'q=' + cityName;
        this.api = 'weather'
        this.rebuildApiUrl();
        return this.apiUrl;
    }

    foreCastFor (cityName){
        this.query= 'q=' + cityName;
        this.api = "forecast"
        this.rebuildApiUrl();
        return this.apiUrl;
    }

    weatherForByGeoLocation(lat, lon) {
        this.query = `lat=${lat}&lon=${lon}`;
        this.api = 'weather';
        this.rebuildApiUrl();
        return this.apiUrl;
    }
}