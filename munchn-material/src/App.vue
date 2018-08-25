<template>
  <div id="app">
    <div class="add-popover-wrapper" :style="addEventButtonStyle">
      <el-popover
        placement="top"
        v-model="showAddPopover"
        trigger="click">
        <div class="add-button" @click="showPlaceDialog=true">Create a place</div>
        <div class="add-button" @click="showEventDialog=true">Add an event</div>
        <md-button class="md-icon-button md-raised md-accent md-teal" slot="reference">
          <md-icon>add</md-icon>
        </md-button>
      </el-popover>
    </div>
    <md-dialog :md-active.sync="showEventDialog">
      <md-dialog-title>Create an event</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout add-event-form">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Event title</label>
              <md-input v-model="newEvent.title" ref="eventTitleRef"></md-input>
            </md-field>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-datepicker v-model="newEvent.startDate"/>
              </div>
              <template v-if="newEvent.hasEndDate">
                <div class="md-layout-item md-small-size-100">
                  <md-datepicker v-model="newEvent.endDate"/>
                </div>
              </template>
              <div class="md-layout-item md-small-size-100">
                <md-checkbox style="padding-top: 10px;" v-model="newEvent.hasEndDate">End date</md-checkbox>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Start time</label>
                  <md-input v-model="newEvent.startTime" type="time"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100" v-if="newEvent.hasEndTime">
                <md-field>
                  <label>End time</label>
                  <md-input v-model="newEvent.endTime" type="time"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-checkbox style="padding-top: 10px;" v-model="newEvent.hasEndTime">End time</md-checkbox>
              </div>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
                <md-field>
                  <label>Location</label>
                  <md-input v-model="newEvent.location"></md-input>
                </md-field>
              </div>
            <md-field>
              <label>Description</label>
              <md-textarea maxlength="320" style="overflow: hidden;" v-model="newEvent.description" md-autogrow></md-textarea>
            </md-field>
            <md-field>
              <label>Link to event</label>
              <md-input v-model="newEvent.link"></md-input>
            </md-field>
            <div class="md-layout">
              <md-field class="md-layout-item md-size-20">
                <label>Price</label>
                <md-input v-model="newEvent.price"></md-input>
              </md-field>
              <span class="md-layout-item md-size-20 price-label">
                €
              </span>
            </div>
          </div>
          <div class="md-layout-item md-size-33 md-small-size-100"></div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showEventDialog = false">Cancel</md-button>
        <md-button class="md-primary md-raised md-accent md-teal" @click="createEvent">Create event</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-app>
      <md-app-drawer md-permanent="full" :md-active.sync="menuVisible" md-persistent="mini">
        <md-list>
          <md-list-item>
            <img v-if="menuVisible" src="./assets/temp_logo.png" class="site-logo" />
            <md-list class="dense-list">
              <div @click="toggleMenu">
                <md-icon v-if="menuVisible" style="margin-right: -8px;">chevron_left</md-icon>
                <img src="./assets/temp_logo.png" class="burger-menu" />
              </div>
              <md-list-item v-if="menuVisible">
                <a href="#" style="text-align: right; width: 100%; color: rgb(0, 150, 136);">Events</a>
              </md-list-item>
              <md-list-item v-if="menuVisible">
                <a href="#" style="text-align: right; width: 100%; color: rgb(0, 150, 136);">Places</a>
              </md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item v-if="!menuVisible">
            <md-icon>calendar_today</md-icon>
            <span class="md-list-item-text">Events</span>
          </md-list-item>

          <md-list-item v-if="!menuVisible">
            <md-icon>place</md-icon>
            <span class="md-list-item-text">Places</span>
          </md-list-item>

          <md-list-item v-if="menuVisible">
            <md-calendar></md-calendar>
          </md-list-item>

          <md-list-item v-if="menuVisible">
            <span class="md-list-item-text">About</span>
          </md-list-item>

          <md-list-item v-if="menuVisible">
            <span class="md-list-item-text">Settings</span>
          </md-list-item>

          <md-list-item v-if="menuVisible">
            <span class="md-list-item-text">Feedback</span>
          </md-list-item>

          <md-list-item v-if="menuVisible">
            <span class="md-list-item-text">GIF</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view :events="events"></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import moment from 'moment'
import EventCards from './components/EventCards'
import MdCalendar from './components/MdCalendar'
export default {
  components: { EventCards, MdCalendar },
  name: 'Events',
  data: () => ({
    menuVisible: false,
    showAddPopover: false,
    showEventDialog: false,
    showPlaceDialog: true,
    newEvent: {
      title: null,
      startDate: new Date(),
      hasEndDate: false,
      endDate: moment().add(1, 'days'),
      startTime: moment().format('hh:mm'),
      hasEndTime: false,
      endTime: moment().add(1, 'hours').format('hh:mm')
    },
    events: []
  }),
  watch: {
    showEventDialog: {
      handler (val) {
        if (!val) {
          return
        }
        this.showAddPopover = false
        setTimeout(() => {
          this.$refs.eventTitleRef.$el.focus()
        }, 500)
      }
    }
  },
  computed: {
    addEventButtonStyle () {
      const maxDrawerWidth = Math.min(window.innerWidth - 125, 260) - 1 + 'px'
      return !this.menuVisible ? { left: '69px' } : { left: maxDrawerWidth }
    }
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    createEvent () {
      this.showEventDialog = false
      this.events.push(this.newEvent)
      this.newEvent = {
        title: null,
        startDate: new Date(),
        hasEndDate: false,
        endDate: moment().add(1, 'days'),
        startTime: moment().format('hh:mm'),
        hasEndTime: false,
        endTime: moment().add(1, 'hours').format('hh:mm')
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
.md-teal {
  background-color: rgb(0, 150, 136) !important;
  color: white !important;
}
.add-event-form {
  min-width: 60vw;
}
.md-drawer.md-persistent-mini {
  transform: none;
}
.add-popover-wrapper {
  position: fixed;
  bottom: 5em;
  left: 0;
  width: 46px;
  padding: 0;
  margin: 0;
  margin-left: -24px;
  z-index: 4;
  transition: left 0.35s;
}
.add-button {
  color: rgb(0, 150, 136);
  padding: 0.3em;
  cursor: pointer;
}
:hover.add-button{
  text-decoration: underline;
}
body {
  height: 100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
<style lang="scss" scoped>
  .price-label {
    display: flex;
    align-items: flex-end;
    padding-bottom: 2em;
  }
  .page-container {
    height: 100%;
  }
  .md-app {
    min-height: 350px;
    height: 100%;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 260px;
    max-width: calc(100vw - 125px);
  }
  .menu-toggle {
    margin-left: -3.5px;
  }
  .site-logo {
    position: relative;
    z-index: 100;
    width: 50%;
  }
  .burger-menu {
    width: 46px;
    margin-top: 8px;
    margin-left: 11px;
  }
  .dense-list {
    margin-left: -23px;
  }
</style>
