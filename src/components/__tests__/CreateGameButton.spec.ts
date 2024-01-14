import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CreateGameButton from '../CreateGameButton.vue'

describe('Create Game Button', () => {
  it('renders properly', () => {
    const wrapper = mount(CreateGameButton)
    expect(wrapper.find('.button-link .material-icons').exists()).toBe(true)

    // Check if the icon has the correct content
    expect(wrapper.find('.button-link .material-icons').text()).toContain('add_circle_outline')})
})
