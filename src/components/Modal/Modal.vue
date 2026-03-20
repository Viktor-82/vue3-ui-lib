<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="handleOverlayClick">
      <div :class="['modal-container', `modal-${size}`]">
        <div class="modal-header">
          <h3 v-if="title" class="modal-title">{{ title }}</h3>
          <button v-if="closable" class="modal-close" @click="handleClose">
            <span class="close-icon">×</span>
          </button>
        </div>

        <div class="modal-content">
          <slot />
        </div>

        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  size?: ModalSize
  closable?: boolean
  closeOnOverlay?: boolean
}>(), {
  size: 'medium',
  closable: true,
  closeOnOverlay: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

function handleClose() {
  if (props.closable) {
    emit('update:modelValue', false)
    emit('close')
  }
}

function handleOverlayClick() {
  if (props.closeOnOverlay && props.closable) {
    handleClose()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background 0.2s;
}

.modal-close:hover {
  background: #f3f4f6;
}

.close-icon {
  font-size: 24px;
  line-height: 1;
  color: #6b7280;
}

.modal-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Sizes */
.modal-small {
  max-width: 400px;
}

.modal-medium {
  max-width: 600px;
}

.modal-large {
  max-width: 800px;
}

.modal-fullscreen {
  max-width: 95vw;
  max-height: 95vh;
}

@media (max-width: 640px) {
  .modal-small,
  .modal-medium,
  .modal-large {
    max-width: 90vw;
  }
}
</style>
