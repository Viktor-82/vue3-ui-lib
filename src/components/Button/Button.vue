<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-disabled': disabled }
    ]"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

const props = defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}
.btn-primary:hover:not(.btn-disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}
.btn-secondary:hover:not(.btn-disabled) {
  background: #4b5563;
}

.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-danger:hover:not(.btn-disabled) {
  background: #dc2626;
}

.btn-small {
  padding: 6px 12px;
  font-size: 12px;
}
.btn-medium {
  padding: 8px 16px;
  font-size: 14px;
}
.btn-large {
  padding: 12px 24px;
  font-size: 16px;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
