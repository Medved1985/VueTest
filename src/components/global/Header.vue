<template>
    <div class="header">
        <section class="hero is-primary">
            <div class="hero-head">
                 <nav class="container nav">
                    <div class="nav-left">
                        <a class="nav-item is-brand" href="#">
                            <img src="../../assets/logo.png" alt="Bulma logo">
                            <span>-weather</span>
                        </a>
                    </div>

                    <div class="nav nav1">
                        <div class="select">
                            <select>
                                <option>°C</option>
                                <option>°F</option>
                            </select>
                        </div>
                    </div>

                    <div class="nav nav2">
                        <div class="select">
                            <select>
                                <option>RU</option>
                                <option>ENG</option>
                            </select>
                        </div>
                    </div>                 

                    <span class="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </nav>
            </div>
            <div class="hero-body">
                <div class="container ">
                    <h1 class="title is-1">
                        Vue-Weather
                    </h1>
                    <h2 class="subtitle is-3">
                        Погода в Вашем городе
                    </h2>
                    <p class="control has-addons is-flex">
                        <input class="input is-medium" type="text" placeholder="Введите город" v-model="city" @keyup.13="getWeatherForCity">
                        <a class="button is-info is-medium" @click="getWeatherForCity">
                            Поиск
                        </a>
                        <a class="button is-warning is-medium" @click="locateMe">
                            <i class="icon is-medium fa fa-location-arrow" aria-hidden="true"></i>
                            мое местоположение
                        </a>
                    </p>
                </div>
                <div class="container ">
                    <p class="control has-addons is-flex">
                        <input class="input is-medium" type="text" placeholder="Введите город" v-model="city" @keyup.13="getWeatherForCity">
                        <a class="button is-info is-medium" @click="getWeatherForCity">
                            Добавить город
                        </a>                        
                    </p>
                </div>
            </div>
          <!--   <div class="hero-foot">
              <h2 class="title has-text-centered is-4">
                  Weather alerts
              </h2>
          </div> -->
        </section>
    </div>
</template>
<script>
export default {
    name: 'headerNav',
    data () {
        return {
            city : 'Moscow'
        }
    },
    created () {
        this.getWeatherForCity(this.city);
        this.bus.$emit('search-location', this.city);
    },
    methods : {
        getWeatherForCity(){
            this.bus.$emit('search-location', this.city);
            this.axios.get(this.urlWeatherFor(this.city))
                .then((response) => {
                    this.bus.$emit('weather-found', response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
            this.axios.get(this.urlForeCastFor(this.city))
                .then((response) => {
                    this.bus.$emit('forecast-found', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        locateMe(){
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
           let error = function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            };

            navigator.geolocation.getCurrentPosition((pos) =>
            {
                 let { latitude , longitude } = pos.coords;

                this.axios.get(this.urlWeatherForByGeoLocation(latitude, longitude))
                .then((response) => {
                    this.city = response.data.name;
                    this.bus.$emit('search-location', this.city);
                    this.bus.$emit('weather-found', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            , error, options);
        }
    }
}
</script>
<style scoped>
    .control {
        margin-top: 10px;
        align-content: center;
        justify-content: center;
    }
    .nav1 {
      margin-top: 15px;
      padding-right: 10px;
    }
    .nav2 {
      margin-top: 15px;      
    }
</style>