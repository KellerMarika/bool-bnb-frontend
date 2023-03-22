


<template>
  <TheHeaderVue />


  <section class="cards-container ">


    <div class="row gap-1 px-5 ">

      <div class="card-container col rounded-3 text-dark px-2">
        <span class="pro">PRO</span>
        <img class="round img-fluid" style="max-width: 250px;" src="Marika.jpeg" alt="user" />
        <h3>Marika Keller</h3>
        <h6>Modena, Emilia Romagna</h6>
        <p> jr. full-stack web developer</p>
        <div class="buttons">
          <button class="primary">
            <a href="https://github.com/KellerMarika" class="card-text">GitHub</a>
          </button>
          <button class="primary ghost">
            <a href="https://www.linkedin.com/in/marika-keller/" class="card-text text-dark">likedin</a>
          </button>
        </div>
        <div class="skills">
          <h6 style="color: grey">Skills</h6>
          <ul class="text-light">
            <li> / </li>
            <li>full-stack Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Php</li>
            <li>My SQL</li>
          </ul>
        </div>
      </div>

      <div class="card-container col rounded-3 text-dark px-2">
        <span class="pro">PRO</span>
        <img class="round img-fluid" style="max-width: 250px;" src="Donnie.jpeg" alt="user" />
        <h3>Donato Ippolito</h3>
        <h6>Bari, Puglia</h6>
        <p> jr. full-stack web developer</p>
        <div class="buttons">
          <button class="primary">
            <a href="https://github.com/donnie00" class="card-text">GitHub</a>
          </button>
          <button class="primary ghost">
            <a href="https://www.linkedin.com/in/donato-ippolito-121534267/" class="card-text text-dark">likedin</a>
          </button>
        </div>
        <div class="skills">
          <h6 style="color: grey">Skills</h6>
          <ul class="text-light">
            <li> / </li>
            <li>full-stack Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Php</li>
            <li>My SQL</li>
          </ul>
        </div>
      </div>
      <div class="card-container col rounded-3 text-dark px-2">
        <span class="pro">PRO</span>
        <img class="round img-fluid" style="max-width: 250px;" src="Luca.jpeg" alt="user" />
        <h3>Luca Coniglio</h3>
        <h6>Caltanisetta, Sicilia</h6>
        <p> jr. full-stack web developer</p>
        <div class="buttons">
          <button class="primary">
            <a href="https://github.com/LucaConiglio" class="card-text">GitHub</a>
          </button>
          <button class="primary ghost">
            <a href="https://www.linkedin.com/in/luca-coniglio-230993233/" class="card-text text-dark">likedin</a>
          </button>
        </div>
        <div class="skills">
          <h6 style="color: grey">Skills</h6>
          <ul class="text-light">
            <li> / </li>
            <li>full-stack Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Php</li>
            <li>My SQL</li>
          </ul>
        </div>
      </div>
      <div class="card-container col rounded-3 text-dark px-2">
        <span class="pro">PRO</span>
        <img class="round img-fluid" style="max-width: 250px;" src="Fabri.jpeg" alt="user" />
        <h3>Fabrizio Campari</h3>
        <h6>Milano, Lombardia</h6>
        <p> jr. full-stack web developer</p>
        <div class="buttons">
          <button class="primary">
            <a href="https://github.com/FabrizioCmp" class="card-text">GitHub</a>
          </button>
          <button class="primary ghost">
            <a href="https://www.linkedin.com/in/fabrizio-campari-1a18ba267/" class="card-text text-dark">likedin</a>
          </button>
        </div>
        <div class="skills">
          <h6 style="color: grey">Skills</h6>
          <ul class="text-light">
            <li> / </li>
            <li>full-stack Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Php</li>
            <li>My SQL</li>
          </ul>
        </div>
      </div>
      <div class="card-container col rounded-3 text-dark px-2">
        <span class="pro">PRO</span>
        <img class="round img-fluid" style="max-width: 250px;" src="Mari.jpeg" alt="user" />
        <h3>Mehari Pieropan</h3>
        <h6>Padova, Veneto</h6>
        <p> jr. full-stack web developer</p>
        <div class="buttons">
          <button class="primary">
            <a href="https://github.com/maripiero23" class="card-text">GitHub</a>
          </button>
          <button class="primary ghost">
            <a href="https://www.linkedin.com/in/mehari-pieropan-b78813267/" class="card-text text-dark">likedin</a>
          </button>
        </div>
        <div class="skills">
          <h6 style="color: grey">Skills</h6>
          <ul class="text-light">
            <li> / </li>
            <li>full-stack Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>Php</li>
            <li>My SQL</li>
          </ul>
        </div>
      </div>

    
    </div>
  </section>
  <TheFooterVue />
</template>

<script>
import { titles } from '../store';
import { store } from '../store';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';

export default {
  name: "About",
  components: { TheHeader, TheFooter },
  data() {
    return {
      store,
    }
  },
  methods: {
  },
  mounted() {
    titles(this.$route.meta.title);
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
@use "../styles/generic.scss";
@use "../styles/partials/variables" as *;

@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
  box-sizing: border-box;
}

body {
  background-color: #28223F;
  font-family: Montserrat, sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-height: 100vh;
  margin: 0;
}

h3 {
  margin: 10px 0;
}

h6 {
  margin: 5px 0;
  text-transform: uppercase;
}

p {
  font-size: 14px;
  line-height: 21px;
}

.cards-container {
/*   background: rgb(255, 0, 110);
  background: linear-gradient(0deg, rgba(255, 0, 110, 1) 0%, rgba(247, 100, 95, 1) 43%, rgba(247, 100, 95, 1) 100%); */
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, #f8f9fa 22%, saturate($primary_color, 10%) 100%);

  padding-top: 20px;

}

.card-container {
  background-color: #231E39;
  border-radius: 5px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
  color: #B3B8CD;
  padding-top: 30px;
  position: relative;
  width: 350px;
  max-width: 100%;
  text-align: center;
  transform: scale(80%);
  


  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(255, 255, 255, 0.32);



}

.card-container .pro {
  color: #231E39;
  background-color: #7bdfea;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 7px;
  position: absolute;
  top: 30px;
  left: 30px;
}

.card-container .round {
  border: 1px solid #2a3b46;
  border-radius: 50%;
  padding: 7px;
}

button.primary {
  background-color: #72d3da;
  border: 1px solid #03BFCB;
  border-radius: 3px;
  color: #231E39;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  padding: 10px 25px;
}

button.primary.ghost {
  background-color: transparent;
  color: #29383a;
}

.skills {
  background-color: #1F1A36;
  text-align: left;
  padding: 15px;
  margin-top: 30px;
}

.skills ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.skills ul li {
  border: 1px solid #2D2747;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  margin: 0 7px 7px 0;
  padding: 7px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}</style>