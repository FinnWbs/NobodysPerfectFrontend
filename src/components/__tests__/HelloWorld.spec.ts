import {describe, it, expect} from 'vitest'

import {mount} from '@vue/test-utils'
import HelloWorld from '../GameList.vue'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createVuetify} from "vuetify";

const vuetify = createVuetify({
    components,
    directives,
})

describe('HelloWorld', () => {
    it('renders properly', () => {
        const wrapper = mount(HelloWorld,{

            plugins: [vuetify],
        })
        expect(wrapper.text()).contain('Create Game')
    })
})
