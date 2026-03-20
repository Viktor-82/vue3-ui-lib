import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('рендерит с правильным значением', () => {
    const wrapper = mount(Input, {
      props: { modelValue: 'test value' }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('test value')
  })

  it('эмитит update:modelValue при вводе', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' }
    })
    const input = wrapper.find('input')
    await input.setValue('hello')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('показывает лейбл если передан', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', label: 'Email' }
    })
    expect(wrapper.text()).toContain('Email')
  })

  it('показывает ошибку если передана', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', error: 'Это поле обязательно' }
    })
    expect(wrapper.text()).toContain('Это поле обязательно')
  })

  it('дизейблится при disabled=true', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', disabled: true }
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })
})
