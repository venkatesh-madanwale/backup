<template>
  <div class="p-6">
    <transition name = "fade-slide" appear mode="out-in" >
    <h1 v-if="showText" class="text-4xl font-bold mb-4">
        Welcome {{ authStore.user?.name }} to Admin Dashboard
      </h1>
    </transition>
    <!-- <div class="bg-white shadow-md rounded p-4 max-w-md">
      <p>
        <strong>Name: {{ authStore.user?.name }}</strong>
      </p>
      <p>
        <strong>Email: {{ authStore.user?.email }}</strong>
      </p>
      <p>
        <strong>Role: {{ authStore.user?.role }}</strong>
      </p>
    </div> -->
  </div>


  <div class="grid grid-cols-2 gap-6 p-6 ">
    <div class="w-full h-[300px]">
      <BarChart />
    </div>
    <div class="w-full h-[300px]">
      <LineChart />
    </div>
    <div class="w-full h-[300px]">
      <DoughnutChart />
    </div>
    <div class="w-full h-[300px]">
      <PieChart />
    </div>
    <!-- <div class="w-full h-[300px] col-span-2">
      <RadarChart />
    </div> -->
  </div>



</template>

<!-- <script lang="ts" setup>
import { useAuthStore } from "../stores/auth"
import { storeToRefs } from "pinia"

const authStore = useAuthStore()
</script> -->
<script lang="ts" setup>
import { useAuthStore } from "../stores/auth"
import { useRouter } from "vue-router"
import { onMounted, ref } from "vue"
import BarChart from "../components/charts/BarChart.vue"
import LineChart from "../components/charts/LineChart.vue"
import DoughnutChart from "../components/charts/DoughnutChart.vue"
import PieChart from "../components/charts/PieChart.vue"
import RadarChart from "../components/charts/RadarChart.vue"

const authStore = useAuthStore()
const router = useRouter()

const showText = ref(false)

onMounted(() => {
  setTimeout(()=>{
    showText.value= true
  },400)
  const user = authStore.user

  // If no user or not admin, redirect
  if (!user || user.role !== 'admin') {
    alert('Access denied. Admins only.')
    router.push('/')
  }
})
</script>