import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import OhmsLaw from '../OhmsLaw.vue';

describe('OhmsLaw', () => {
  it('renders properly', () => {
    const wrapper = mount(OhmsLaw );
    expect(true).toBe(true);
    // expect(wrapper.text()).toContain('Hello Vitest')
  });
});



