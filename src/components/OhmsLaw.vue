<script setup lang="ts">
import { ref } from 'vue';


const VALUES = {
    VOLTAGE: 'Voltage',
    RESISTANCE: 'Resistance',
    CURRENT: 'Current', 
} as const;


const form = ref({
  type: '',
  voltage: 0,
  resistance: 0,
  current: 0, 
  
});

const options = ref([
  { text:VALUES.VOLTAGE, value: 'voltage' },
  { text: VALUES.RESISTANCE, value: 'resistance' },
  { text: VALUES.CURRENT, value: 'current' }
]);


const handleChange = (_evt: Event) => {
    const val = {...form.value},
        {type, voltage, resistance, current} = val; 
    if(type === VALUES.VOLTAGE.toLocaleLowerCase()) {
        form.value.voltage = resistance * current;
    }
    if(type === VALUES.CURRENT.toLocaleLowerCase()) {
        form.value.current = voltage / resistance;
    }
    if (type === VALUES.RESISTANCE.toLocaleLowerCase()) {
        form.value.current = voltage / current;
    }    
}





</script>

<template>
    <section>
        <form >

            <select v-model="form.type">
                <option disabled value="">Please select value</option>
                <option v-for="option in options" :value="option.value">
                    {{ option.text }}
                </option>
            </select>

      
            <div v-if="form.type">
                    <div class="form-element">
                        <label v-if="form.type !== VALUES.VOLTAGE.toLocaleLowerCase()" 
                              for="voltage">
                              {{ VALUES.VOLTAGE }}
                       </label>
                       <input v-if="form.type !== VALUES.VOLTAGE.toLocaleLowerCase()" type="number" v-model="form.voltage" id="voltage" @change="handleChange"  />
                    </div>
                    <div class="form-element">
                        <label v-if="form.type !== VALUES.RESISTANCE.toLocaleLowerCase()"
                              for="resistance">
                              {{ VALUES.RESISTANCE }}
                       </label>
                       <input v-if="form.type !== VALUES.RESISTANCE.toLocaleLowerCase()" type="number" v-model="form.resistance" id="resistance" @change="handleChange"  />
                    </div>
                    <div class="form-element">
                        <label v-if="form.type !== VALUES.CURRENT.toLocaleLowerCase()" 
                              for="current">
                              {{ VALUES.CURRENT }}
                       </label>
                       <input v-if="form.type !== VALUES.CURRENT.toLocaleLowerCase()" type="number" v-model="form.current" id="current" @change="handleChange"  />
                    </div> 
                    <div class="form-element">
                        <p v-if="form.type">{{ form.type }}: 
                            <span v-if="form.type === VALUES.VOLTAGE.toLocaleLowerCase()">
                                {{ form.voltage }}
                            </span>
                            <span v-if="form.type === VALUES.RESISTANCE.toLocaleLowerCase()">
                                {{ form.resistance }}
                            </span>
                            <span v-if="form.type === VALUES.CURRENT.toLocaleLowerCase()">
                                {{ form.current }}
                            </span>
                        </p>                      
                    </div>
            </div>
        </form>
    </section>
</template>

<style scoped>
select, input, button  {
    padding: 10px 8px; 
    margin: 10px;
    min-width:165px ;
    background:  var(--vt-c-black);
    color: var(--vt-c-text-dark-2);
    outline: none;
    border: solid 1px var(--vt-c-text-dark-2);

}
.form-element > * {
    display: block;
}
.form-element label, .form-element p {
    margin: 0 10px;
}


@media (min-width: 1024px) {
}
</style>
