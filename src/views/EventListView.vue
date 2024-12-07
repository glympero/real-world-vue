<script setup>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'
import { ref, onMounted, computed, watchEffect } from 'vue'

const props = defineProps(['page'])
const limit = 2

const events = ref(null)
const totalEvents = ref(0)

const page = computed(() => props.page)

const hasNext = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / limit)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(limit, page.value)
      .then((res) => {
        events.value = res.data
        totalEvents.value = res.headers['x-total-count']
      })
      .catch((err) => {
        console.log(err)
      })
  })
})
</script>

<template>
  <h1>Events for good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink
        id="page-prev"
        rel="previous"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        v-if="page != 1"
        >&#60; Previous</RouterLink
      >
      <RouterLink
        id="page-next"
        rel="next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        v-if="hasNext"
        >Next &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
