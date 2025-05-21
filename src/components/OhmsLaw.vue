<script setup lang="ts">
import { ref } from 'vue';
import { VALUES } from '@/assets/consts';

const form = ref({
  type: '',
  voltage: 0,
  resistance: 0,
  current: 0, 
  
});

const voltageLowercase = VALUES.VOLTAGE.toLocaleLowerCase(),
        resistanceLowercase = VALUES.RESISTANCE.toLocaleLowerCase(),
        currentLowercase = VALUES.CURRENT.toLocaleLowerCase();

const options = ref([
  { text:VALUES.VOLTAGE, value: voltageLowercase },
  { text: VALUES.RESISTANCE, value: resistanceLowercase },
  { text: VALUES.CURRENT, value: currentLowercase }
]);


const handleChange = (_evt: Event) => {
    const val = {...form.value},
        {type, voltage, resistance, current} = val; 
    if(type === voltageLowercase) {
        form.value.voltage = resistance * current;
    }
    if(type === currentLowercase) {
        form.value.current = voltage / resistance;
    }
    if (type === resistanceLowercase) {
        form.value.resistance = voltage / current;
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
                        <label v-if="form.type !== voltageLowercase" 
                              :for="voltageLowercase">
                              {{ VALUES.VOLTAGE }}
                       </label>
                       <input v-if="form.type !== voltageLowercase" type="number" v-model="form.voltage" :id="voltageLowercase" @change="handleChange"  />
                    </div>
                    <div class="form-element">
                        <label v-if="form.type !== resistanceLowercase"
                              :for="resistanceLowercase">
                              {{ VALUES.RESISTANCE }}
                       </label>
                       <input v-if="form.type !== resistanceLowercase" type="number" v-model="form.resistance" :id="resistanceLowercase" @change="handleChange"  />
                    </div>
                    <div class="form-element">
                        <label v-if="form.type !== currentLowercase" 
                              :for="currentLowercase">
                              {{ VALUES.CURRENT }}
                       </label>
                       <input v-if="form.type !== currentLowercase" type="number" v-model="form.current" :id="currentLowercase" @change="handleChange"  />
                    </div> 
                    <div class="form-element">
                        <p v-if="form.type" id="output">{{ form.type }}: 
                            <span v-if="form.type === voltageLowercase">
                                {{ form.voltage }}
                            </span>
                            <span v-if="form.type === resistanceLowercase">
                                {{ form.resistance }}
                            </span>
                            <span v-if="form.type === currentLowercase">
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
