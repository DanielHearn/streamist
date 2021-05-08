<template>
    <div class="popular-streams" v-if="$store.state.popularStreams.length">
        <list :layout="'grid'" class="popular-streams-list">
            <div
                v-for="(stream, index) in $store.state.popularStreams"
                :key="index"
                v-on:click="addPopularStream(stream)"
                class="popular-streams-item-container"
            >
                <img
                class="popular-streams-item-image"
                :src="stream.thumbnail || 'img/placeholderStreamThumbnail.png'"
                :alt="stream.user_name + '\'s stream thumbnail'"
                />
                <list-item class="popular-streams-item">
                <template slot="header">
                    <div class="column">
                    <p>{{ stream.user_name }}</p>
                    </div>
                    <div class="column">
                    <icon-button
                        :iconName="$options.icons.play"
                        :buttonClasses="'button--accent'"
                    />
                    </div>
                </template>
                <template slot="content" v-if="stream.game_name && stream.viewer_count">
                    <div class="column stream-details">
                    <span class="stream-name">
                        <i class="material-icons">{{ $options.icons.game }}</i>
                        {{stream.game_name}}
                    </span>
                    <span class="viewer" v-if="!$store.state.smallInterface">
                        <i class="material-icons">{{ $options.icons.group }}</i>
                        {{stream.formatted_viewer_count}}k
                    </span>
                    </div>
                </template>
                </list-item>
            </div>
            </list>
        </div>
        <div v-else>
            <list :layout="'grid'" class="popular-streams popular-streams--placeholder">
            <div v-for="i in 12" :key="i" class="popular-streams-item-container">
                <img class="popular-streams-item-image" :src="'img/placeholderStreamThumbnail.png'" />
                <list-item class="popular-streams-item">
                <template slot="header">
                    <div class="column">
                    <p>.</p>
                    </div>
                    <div class="column"></div>
                </template>
                <template slot="content">
                    <div class="column stream-details">
                    <span class="stream-name"></span>
                    <span>.</span>
                    </div>
                </template>
                </list-item>
            </div>
        </list>
    </div>
</template>

<script src="./popularStreams.js"></script>

<style lang="scss">
@import "./popularStreams.scss";
</style>