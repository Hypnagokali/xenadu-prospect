<template>
  <div class="content-menu cell large-3">
      <h5>Meine Monitore</h5>
      <ul class="vertical menu">
          <router-link :to="{name: 'Goals'}">
            Ziele Monitor
          </router-link>
          <li><a href="#">Routinen</a></li>
          <li><a href="#">Mein Tag</a></li>
        </ul>
  </div>
</template>
