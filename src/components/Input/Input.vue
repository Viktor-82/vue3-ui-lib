<template>
  <div :class="['input-wrapper', `input-${size}`, { 'input-error': error }]">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>

    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      class="input-field"
      @input="handleInput"
      @blur="handleBlur"
    />

    <p v-if="error" class="input-error-message">{{ error }}</p>
    <p v-else-if="hint" class="input-hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export type InputSize = 'small' | 'medium' | 'large'
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel'

const props = withDefaults(defineProps<{
  modelValue: string | number
  label?: string
  type?: InputType
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  id?: string
}>(), {
  type: 'text',
  size: 'medium',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur'): void
  (e: 'focus'): void
}>()

const id = ref(props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value: string | number = target.value

  if (props.type === 'number') {
    value = value === '' ? '' : Number(value)
  }

  emit('update:modelValue', value)
}

function handleBlur() {
  emit('blur')
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.input-required {
  color: #ef4444;
  margin-left: 2px;
}

.input-field {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  outline: none;
  font-family: inherit;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.input-field:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  color: #9ca3af;
}

.input-error .input-field {
  border-color: #ef4444;
}

.input-error .input-field:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.input-error-message {
  font-size: 12px;
  color: #ef4444;
}

.input-hint {
  font-size: 12px;
  color: #6b7280;
}

/* Sizes */
.input-small .input-field {
  padding: 4px 8px;
  font-size: 12px;
}

.input-medium .input-field {
  padding: 8px 12px;
  font-size: 14px;
}

.input-large .input-field {
  padding: 12px 16px;
  font-size: 16px;
}
</style>
