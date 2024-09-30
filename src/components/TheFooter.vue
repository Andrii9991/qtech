<template>
  <div>
    <section id="footer">
      <div class="main-footer">
        <div class="logoinfo" data-aos="fade-up">
          <div class="contact-details">
            <h1>Contacts</h1>
            <ul class="details-list">
              <li class="contacts-item">
                <div class="fa fa-location"></div>
                <i
                  class="pi pi-map-marker"
                  style="color: white; font-size: 1rem"
                ></i>
                <a
                  class="contacts-link"
                  href="https://www.google.com/maps/place/%D0%A2%D0%B5%D1%80%D0%BD%D0%BE%D0%BF%D1%96%D0%BB%D1%8C,+%D0%A2%D0%B5%D1%80%D0%BD%D0%BE%D0%BF%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+46003/@49.5483253,25.5152686,12z/data=!3m1!4b1!4m6!3m5!1s0x473036ad4b82ce75:0xc484a447edb154e8!8m2!3d49.5510444!4d25.5952185!16zL20vMDJrNnYz?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
                  ><strong>Ukraine, Ternopil</strong>
                </a>
              </li>
              <li class="contacts-item">
                <div class="fa fa-phone"></div>
                <i
                  class="pi pi-phone"
                  style="color: white; font-size: 1rem"
                ></i>
                <a class="contacts-link" href="tel:+380 96 95 39 930"
                  >+380 96 95 39 930</a
                >
              </li>
              <li>
                <div class="fa fa-envelope"></div>
                <i
                  class="pi pi-envelope"
                  style="color: white; font-size: 1rem"
                ></i>
                <a
                  class="contacts-link"
                  href="mailto:andriymyshchyshyn6@gmail.com"
                  >andriymyshchyshyn6@gmail.com</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="com" data-aos="fade-up">
          <ul>
            <li>
              <router-link
                class="navigation__link logo-link"
                active-class="active-link"
                :to="{ name: 'HomePage' }"
              >
                Home Page
              </router-link>
            </li>
            <li>
              <router-link
                class="navigation__link logo-link"
                active-class="active-link"
                :to="{ name: 'CatalogPage' }"
              >
                Catalog Page
              </router-link>
            </li>

            <li>
              <router-link
                class="navigation__link logo-link"
                active-class="active-link"
                :to="{ name: 'LoginPage' }"
              >
                Login Page
              </router-link>
            </li>
          </ul>
        </div>
        <div class="info" data-aos="fade-up">
          <h1>Social Media</h1>
          <div class="sociallogos">
            <div class="logobox">
              <a
                href="https://www.instagram.com/andrii_koo?igsh=MXFyMXhtZ2dtbjBzdg%3D%3D&utm_source=qr"
              >
                <i
                  class="pi pi-instagram"
                  style="font-size: 2rem; color: white"
                ></i
              ></a>
              <a href="https://t.me/Andrii_991">
                <i
                  class="pi pi-telegram"
                  style="font-size: 2rem; color: white"
                ></i>
              </a>

              <a href="https://github.com/Andrii9991">
                <i
                  class="pi pi-github"
                  style="color: white; font-size: 2rem"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import "primeicons/primeicons.css";

@Component
export default class TheFooter extends Vue {}
</script>

<style lang="scss" scoped>
.main-footer {
  padding: 30px 0;
  display: flex;
  justify-content: space-evenly;
  background-color: $grey;
}

.main-footer ul {
  list-style: none;
}

.main-footer h1 {
  font-size: 22px;
  line-height: 117%;
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
}

.main-footer h2 {
  color: #ffffff;
  font-weight: 500;
}

.main-footer ul li a {
  color: #ffffffcc;
  text-decoration: none;
}

footer {
  background-color: #19302e;
  border-top: 1px solid #6eb981;
  font-size: 17px;
  padding: 15px 5px;
  color: #ffffff;
  text-align: center;
}

footer a {
  text-decoration: none;
  color: #ffffff;
}

.logoinfo p {
  font-size: 17px;
  margin-top: 5px;
  padding-left: 22px;
}

.contact-details {
  margin-top: 20px;
}

.contact-details li {
  list-style: none;
  margin: 10px 0;
}

.contact-details li a {
  text-decoration: none;
  color: #f1f1f1;
}

.contact-details .fa {
  color: #f1f1f1;
  margin-right: 10px;
}

.sociallogos {
  padding: 20px 0;
}

.sociallogos .logobox {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  text-decoration: none;
  color: white;
  font-size: 22px;
}

.com ul li {
  padding: 5px 0;
}

.contacts-link {
  margin-left: 8px;
}

@media only screen and (max-width: 749px) {
  .main-footer {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .info {
    padding: 20px 0;
  }
}

@media (max-width: 480px) {
  .main-footer {
    grid-template-columns: 1fr;
  }
  .sociallogos {
    padding: 20px 0;
  }
  .com {
    padding: 20px 0;
  }
}
</style>
