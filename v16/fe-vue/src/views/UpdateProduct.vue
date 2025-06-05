<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">Update Product</h2>
    <form @submit.prevent="updateProduct">
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Name</label>
        <input v-model="form.name" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Description</label>
        <textarea v-model="form.des" class="w-full p-2 border rounded" required></textarea>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Category</label>
        <input v-model="form.cat" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-semibold">Price</label>
        <input v-model.number="form.price" type="number" class="w-full p-2 border rounded" required />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Update Product
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const form = ref({
  name: '',
  des: '',
  cat: '',
  price: 0
})

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3002/products/${route.params.id}`)
    const { name, des, cat, price } = data
    form.value = { name, des, cat, price }
  } catch (err) {
    console.error('Error fetching product:', err)
  }
}

const updateProduct = async () => {
  try {
    await axios.put(`http://localhost:3002/products/${route.params.id}`, form.value)
    alert('Product updated successfully!')
    router.push('/allproducts')
  } catch (err) {
    console.error('Error updating product:', err)
    alert('Failed to update product.')
  }
}

onMounted(fetchProduct)
</script>

<style scoped>
input, textarea {
  font-size: 16px;
}
</style>
