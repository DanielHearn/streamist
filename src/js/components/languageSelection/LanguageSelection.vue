<template>
    <div class="language-selection">
        <v-select
            :value="languages"
            :options="unusedLanguages"
            :multiple="true"
            autocomplete="on"
            placeholder="All Languages"
            v-on:input="changeLanguages"
            :components="{Deselect}"
        />
    </div>
</template>

<script src="./languageSelection.js"></script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "./languageSelection.scss";
</style>