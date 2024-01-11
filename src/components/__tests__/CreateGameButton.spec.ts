import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CreateGameButton from '../CreateGameButton.vue'

describe('Create Game Button', () => {
  it('renders properly', () => {
    const wrapper = mount(CreateGameButton)
    expect(wrapper.text()).contain('Create Game')
  })
})
