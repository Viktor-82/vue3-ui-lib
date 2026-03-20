import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('UI Library Demo')
    expect(wrapper.text()).toContain('Button')
    expect(wrapper.text()).toContain('Input')
    expect(wrapper.text()).toContain('Modal')
  })
})
