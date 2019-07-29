<template>
  <menu-item
    :title="'About'"
    :closeTitle="'Close About'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <template slot="content">
      <div class="menu-item-row">
        <p class="text">
          Streamist is an open-source project developed by
          <a
            class="text-link"
            href="http://danielhearn.co.uk"
            target="_blank"
          >Daniel Hearn</a>, source available on
          <a
            class="text-link"
            href="https://github.com/DanielHearn/streamist"
            target="_blank"
          >GitHub</a> (contributions welcome!).
        </p>
        <p class="text">
          For feature suggestions and bug reports, email them to
          <a
            class="text-link"
            href="mailto:streamist@danielhearn.co.uk"
            target="_blank"
          >streamist@danielhearn.co.uk</a> or create an issue on
          <a
            class="text-link"
            href="https://github.com/DanielHearn/streamist/issues"
            target="_blank"
          >Github</a>.
        </p>
      </div>
    </template>
  </menu-item>
</template>

<script src="./aboutMenu.js"></script>