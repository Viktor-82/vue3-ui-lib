import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('рендерит с текстом из слота', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Нажми меня' }
    })
    expect(wrapper.text()).toBe('Нажми меня')
  })

  it('применяет класс btn-primary для variant="primary"', () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' }
    })
    expect(wrapper.classes()).toContain('btn-primary')
  })

  it('применяет класс btn-large для size="large"', () => {
    const wrapper = mount(Button, {
      props: { size: 'large' }
    })
    expect(wrapper.classes()).toContain('btn-large')
  })

  it('эмитит click при клике', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('не эмитит click если disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
