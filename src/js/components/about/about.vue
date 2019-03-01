<template>
  <menu-item
    :title="'About'"
    :closeTitle="'Close About'"
    v-on:close-menu-item="$emit('close-menu')"
    >
      <div class="menu-item-row">
        <p class="text">Developed by <a class="text-link" href="http://danielhearn.co.uk" target="_blank">Daniel Hearn</a>, source available on <a class="text-link" href="https://github.com/DanielHearn/manytwitch" target="_blank">GitHub</a> (contributions welcome!).</p>
        <p class="text">For feature suggestions and bug reports, email them to <a class="text-link" href="mailto:manytwitch@danielhearn.co.uk" target="_blank">manytwitch@danielhearn.co.uk</a>.</p>
      </div>
  </menu-item>
</template>

<script src="./about.js"></script>