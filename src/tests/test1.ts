import { mount } from '@vue/test-utils'
import search from '../views/index/index.vue'

test('index.vue', async () => {
  const wrapper = mount(search)
  expect(wrapper.html()).toContain('Unit Test Page')
  expect(wrapper.html()).toContain('count is: 0')
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('count is: 1')
})
