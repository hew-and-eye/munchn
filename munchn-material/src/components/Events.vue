<template>
  <div>
    <div class="month-filters">
      <md-button
        v-for="month in monthList"
        :class="{'md-teal': activeFilter(month)}"
        :key="month.monthNumber"
        @click="setFilter(month)">
        {{ month.monthName }}
      </md-button>
    </div>
    <event-cards :events="filteredEvents"></event-cards>
  </div>
</template>

<script>
import EventCards from './EventCards'
import MdCalendar from './MdCalendar'
import _ from 'lodash'
import moment from 'moment'
export default {
  components: { EventCards, MdCalendar },
  props: {
    events: { type: Array, default: () => [1, 2, 3] }
  },
  name: 'Events',
  data: () => ({
    menuVisible: false,
    filter: null
  }),
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    setFilter ({monthNumber}) {
      this.filter = this.filter !== monthNumber
        ? monthNumber : null
    }
  },
  computed: {
    monthList () {
      const months = []
      this.events.map(({ startDate }) => {
        const monthName = moment(startDate).format('MMMM')
        const monthNumber = moment(startDate).format('M')
        months.push({ monthName, monthNumber: parseInt(monthNumber) })
      })
      return _.orderBy(_.uniqBy(months, 'monthNumber'), 'monthNumber')
    },
    filteredEvents () {
      return this.filter
        ? this.events.filter(({startDate}) =>
          this.filter === parseInt(moment(startDate).format('M')))
        : this.events
    },
    activeFilter () {
      return ({monthNumber}) => this.filter === monthNumber
    }
  }
}
</script>

<style lang="scss" scoped>
// .month-filters {
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: 10;
//   background: white;
//   width: 100%;
// }
</style>
