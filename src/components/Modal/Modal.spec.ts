import { describe, it, expect } from 'vitest'
import { mount, config } from '@vue/test-utils'
import Modal from './Modal.vue'

// plug for Teleport
config.global.stubs = {
  Teleport: true
}

describe('Modal', () => {
  it('не рендерится когда modelValue = false', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: false }
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('рендерится когда modelValue = true', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true }
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
  })

  it('показывает заголовок если передан', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, title: 'Модальное окно' }
    })
    expect(wrapper.text()).toContain('Модальное окно')
  })

  it('эмитит update:modelValue при клике на крестик', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true }
    })
    await wrapper.find('.modal-close').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('не закрывается при клике на overlay если closeOnOverlay = false', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true, closeOnOverlay: false }
    })
    await wrapper.find('.modal-overlay').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('рендерит слоты', () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true },
      slots: {
        default: '<p>Контент модалки</p>',
        footer: '<button>Закрыть</button>'
      }
    })
    expect(wrapper.text()).toContain('Контент модалки')
    expect(wrapper.text()).toContain('Закрыть')
  })
})
