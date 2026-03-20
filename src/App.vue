<template>
  <div class="demo">
    <h1>UI Library Demo</h1>

    <h2>Button</h2>
    <div class="demo-group">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button disabled>Disabled</Button>
    </div>

    <h2>Input</h2>
    <div class="demo-group">
      <Input
        v-model="inputValue"
        label="Email"
        placeholder="Введите email"
        hint="example@mail.com"
      />
      <Input
        v-model="inputValue2"
        label="Пароль"
        type="password"
        error="Слишком короткий"
      />
    </div>

    <h2>Modal</h2>
    <div class="demo-group">
      <Button @click="showModal = true">Open Modal</Button>
      <Modal v-model="showModal" title="Пример модалки">
        <p>Это контент модального окна</p>
        <template #footer>
          <Button variant="secondary" @click="showModal = false">Отмена</Button>
          <Button variant="primary" @click="showModal = false">Сохранить</Button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Modal } from './index'

const inputValue = ref('')
const inputValue2 = ref('')
const showModal = ref(false)
</script>

<style>
.demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
}

.demo-group {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.demo-group > * {
  flex: 1;
  min-width: 200px;
}
</style>
