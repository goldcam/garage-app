import { describe, it, expect } from 'vitest';

import { mount, flushPromises } from '@vue/test-utils';
import OhmsLaw from '../OhmsLaw.vue';
import { VALUES } from '@/assets/consts';


describe('OhmsLaw', () => { 
  const voltageText = VALUES.VOLTAGE.toLocaleLowerCase(),
        resistanceText = VALUES.RESISTANCE.toLocaleLowerCase(),
        currentText = VALUES.CURRENT.toLocaleLowerCase();
  it('renders properly', () => {    
     const wrapper = mount(OhmsLaw);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).toContain('Please select value');
    wrapper.unmount();
  });

  it('renders output element', async () => {    
     const wrapper = mount(OhmsLaw);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).toContain('Please select value');

    const tetsForm = {
          type: 'voltage',
          voltage: 0,
          resistance: 0,
          current: 0, 
        };

  //  await wrapper.setData({form: {type:'voltage'}});

  (wrapper.vm as any).form = tetsForm;
  console.log({vm: wrapper.vm})
   
  
    // const select = wrapper.find('select');
    // await select.setValue(voltageText);


    const output = wrapper.find('#output');
    // expect(output.exists()).toBe(true);   
    // expect(output.text()).toBe('voltage: 0');
    
    
    // wrapper.setData({form: {type: ''}});
    // await select.setValue('');
    // await flushPromises();
    // output = wrapper.find('#output');
    expect(output.exists()).toBe(false);  


    wrapper.unmount();
  });

  it('caluclates voltage', async () => {
    const wrapper = mount(OhmsLaw),
          select = wrapper.find('select');
    await select.setValue(voltageText);
    const voltageInput = wrapper.find(`#${voltageText}`),
          currentInput = wrapper.find(`#${currentText}`), 
          resistanceInput = wrapper.find(`#${resistanceText}`),
          output = wrapper.find('#output');

    await resistanceInput.setValue(4);
    await resistanceInput.trigger('change');
    await currentInput.setValue(3);
    await currentInput.trigger('change');
    expect(wrapper.emitted('change')).toBeTruthy();


    await flushPromises();

    const inputs = wrapper.findAll('input');       

    expect(select.element.value).toBe(voltageText);
    expect(voltageInput.exists()).toBe(false);
    expect(currentInput.exists()).toBe(true);
    expect(resistanceInput.exists()).toBe(true);
    expect(inputs[0].element.value).toEqual('4'); 
    expect(inputs[1].element.value).toEqual('3');
    expect(output.exists()).toBe(true);
    expect(output.text()).toBe('voltage: 12');
    wrapper.unmount();
  });

  it('caluclates current', async () => {
    const wrapper = mount(OhmsLaw),
          select = wrapper.find('select');
    await select.setValue(currentText);
    const voltageInput = wrapper.find(`#${voltageText}`),
          currentInput = wrapper.find(`#${currentText}`), 
          resistanceInput = wrapper.find(`#${resistanceText}`),
          output = wrapper.find('#output');

    await resistanceInput.setValue(4);
    await resistanceInput.trigger('change');
    await voltageInput.setValue(12);
    await voltageInput.trigger('change');

    expect(wrapper.emitted('change')).toBeTruthy();

    await flushPromises(); 

    const inputs = wrapper.findAll('input');    

    expect(select.element.value).toBe(currentText);    
    expect(currentInput.exists()).toBe(false);
    expect(voltageInput.exists()).toBe(true);
    expect(resistanceInput.exists()).toBe(true);
    expect(inputs[0].element.value).toEqual('12'); 
    expect(inputs[1].element.value).toEqual('4');
    expect(output.exists()).toBe(true);
    expect(output.text()).toBe('current: 3');
    
    wrapper.unmount();
  });

   it('caluclates resistance', async () => {
    const wrapper = mount(OhmsLaw),
          select = wrapper.find('select');
    await select.setValue(resistanceText);
    const voltageInput = wrapper.find(`#${voltageText}`),
          currentInput = wrapper.find(`#${currentText}`), 
          resistanceInput = wrapper.find(`#${resistanceText}`),
          output = wrapper.find('#output');

    await currentInput.setValue(3);
    await currentInput.trigger('change');

    await voltageInput.setValue(12);
    await voltageInput.trigger('change');
    
    expect(wrapper.emitted('change')).toBeTruthy();
        
    await flushPromises();
    const inputs = wrapper.findAll('input');               

    expect(select.element.value).toBe(resistanceText);  
    expect(resistanceInput.exists()).toBe(false);  
    expect(currentInput.exists()).toBe(true);
    expect(voltageInput.exists()).toBe(true); 
    expect(inputs[0].element.value).toEqual('12'); 
    expect(inputs[1].element.value).toEqual('3'); 
    expect(output.exists()).toBe(true);
    expect(output.text()).toBe('resistance: 4');
    wrapper.unmount();  
  });
});



