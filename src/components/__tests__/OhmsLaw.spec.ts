import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import OhmsLaw from '../OhmsLaw.vue';
import { VALUES } from '@/assets/consts';


describe('OhmsLaw', () => {
  it('renders properly', () => {
    const wrapper = mount(OhmsLaw);
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toContain('Please select value')
  });
  it('selects voltage', async () => {
    const wrapper = mount(OhmsLaw),
          options = wrapper.find('select').findAll('option');
      options[1].element.selected = true
      wrapper.trigger('change')
      expect(wrapper.find('option:checked').element.textContent).toBe(VALUES.VOLTAGE);
    //   expect(wrapper.find('input'))

    // const voltageInput = wrapper.find({ ref: 'testButton' }); 
    const voltageInput = wrapper.find('#voltage'); 

    console.log(wrapper.html());

    // expect(voltageInput.exists()).toBe(true)
  });
//   it('selects resistance', async () => {
//     const wrapper = mount(OhmsLaw),
//           options = wrapper.find('select').findAll('option');
//       options[2].element.selected = true
//       expect(wrapper.find('option:checked').element.textContent).toBe(VALUES.RESISTANCE);
//   });
//   it('selects current', async () => {
//     const wrapper = mount(OhmsLaw),
//           options = wrapper.find('select').findAll('option');
//       options[3].element.selected = true
//       expect(wrapper.find('option:checked').element.textContent).toBe(VALUES.CURRENT);
//   });
});



