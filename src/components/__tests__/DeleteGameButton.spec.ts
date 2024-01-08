import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DeleteGameButton from "../DeleteGameButton.vue";


describe('Delete Game Button', () => {
    it('renders properly', () => {
        const wrapper = mount(DeleteGameButton)
        expect(wrapper.text()).contain('Delete Game')
    })
})