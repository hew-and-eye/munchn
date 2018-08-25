<template>
  <div>
    <div v-if="events && events.length">
      <md-card
        v-for="(event, index) in events"
        :key="event.title + index"
        @click.native="(showDialog = true) && (focusedIndex = index)">
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="4:3">
            <img src="../assets/Baby_Bernardo.jpg" alt="Skyscraper">
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <span class="md-title">{{ event.title }}</span>
              <span class="md-subhead">{{ event.description }}</span>
            </md-card-header>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </div>
    <h1 v-else>
      There are no events. You have a really antisocial friend group.
    </h1>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title v-if="focusedEvent">{{ focusedEvent.title }}</md-dialog-title>
      <md-dialog-content v-if="focusedEvent">
        <p>
          {{ startDate }}
          @
          {{ focusedEvent.startTime }}
          &mdash;
          <a
            :href="`https://www.google.com/maps/search/${focusedEvent.location}`"
            target="_blank">
            {{ focusedEvent.location }}
          </a>
        </p>
        <a :href="`http://${focusedEvent.link}`">
          {{ focusedEvent.link }}
        </a>
        <p>{{ focusedEvent.description }}</p>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'EventCards',
  props: {
    events: Array
  },
  data () {
    return {
      focusedIndex: null,
      showDialog: false
    }
  },
  computed: {
    focusedEvent () {
      return this.focusedIndex + 1 ? this.events[this.focusedIndex] : null
    },
    startDate () {
      return this.focusedEvent ? moment(this.focusedEvent.startDate).format('MMMM Do') : null
    }
  }
}
</script>

<style lang="scss" scoped>
  .bubbled-box {
    width: 100px;
    height: 40px;
    border-radius: 4px;
  }
  .bubbled-box::before {
    content: "";
    color: white;
    background: white;
    height: 100%;
    width: 16px;
    display: inline-block;
    border-bottom-right-radius: 8px;
  }
  .focused-event-card {
    background: none;
    min-width: 50vw !important;
  }
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-dialog {
    background-image: url("../assets/Baby_Bernardo.jpg");
    background-size: cover;
    min-height: 80vh;
    min-width: 60vw;
    display: flex;
    align-items: flex-end;
  }
  .md-dialog-content, .md-dialog-title {
    margin: 0;
    // padding-bottom: 0.8em;
    background: rgba(0, 0, 0, 0.8);
    color: white;
  }
</style>
