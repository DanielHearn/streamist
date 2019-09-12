<template>
  <menu-item
    :title="'Streams Management'"
    :closeTitle="'Close Streams'"
    v-on:close-menu-item="$emit('close-menu')"
  >
    <template slot="actions">
      <div class="menu-item-row">
        <input-form
          placeholder="Twitch channel"
          v-on:submit="addStream"
          :buttonText="'Add'"
          :buttonIconName="smallInterface ? 'play' : ''"
        ></input-form>
      </div>
    </template>
    <template slot="content">
      <div class="menu-item-row">
        <p class="text" v-if="!streams.length">Add streams to start watching.</p>
        <list class="stream-list">
          <draggable
            v-if="streams.length"
            v-model="orderedStreams"
            @start="drag=true"
            @end="drag=false"
            :handle="'.handle'"
            :removeCloneOnHide="false"
          >
            <list-item
              v-for="stream in streams"
              :key="stream.id"
              :handleActive="true"
              :class="{'drag--active': drag}"
            >
              <template slot="header">
                <div class="column">
                  <p>{{ stream.streamName }}</p>
                </div>
                <div class="column">
                  <icon-button
                    v-if="favorited[stream.streamName]"
                    @click.native="unfavoriteStream(stream)"
                    :iconName="$options.icons.favorite"
                    :title="'Remove channel from favorites'"
                    :class="['button--unfavorite button--secondary']"
                  />
                  <icon-button
                    v-else
                    @click.native="favoriteStream(stream)"
                    :iconName="$options.icons.unfavorite"
                    :title="'Add channel to favorites'"
                    :class="['button--favorite button--secondary']"
                  />
                  <icon-button
                    @click.native="removeStream(stream)"
                    :iconName="$options.icons.remove"
                    title="Remove Stream"
                    :class="['button--remove']"
                  />
                </div>
              </template>
            </list-item>
          </draggable>
        </list>
      </div>
    </template>
  </menu-item>
</template>

<script src="./streamMenu.js"></script>

<style lang="scss">
@import "./streamMenu.scss";
</style>