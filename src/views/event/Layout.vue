<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, computed, defineProps } from 'vue'
import EventService from '../../services/EventService'

const props = defineProps(['id'])

const id = computed(() => props.id)

const event = ref(null)
const isLoaded = ref(null)

onMounted(() => {
  EventService.getEventId(id.value)
    .then((res) => {
      event.value = res.data
      isLoaded.value = true
    })
    .catch(() => {
      isLoaded.value = true
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'event-details' }">Details</RouterLink>
        |
        <RouterLink :to="{ name: 'event-register' }">Register</RouterLink>
        |
        <RouterLink :to="{ name: 'event-edit' }">Edit</RouterLink>
      </nav>
    </div>
    <RouterView :event="event" />
  </div>
  <div v-if="!event && isLoaded"><h1>No event found</h1></div>
</template>
