<template>
  <div>
    <select v-bind:value="value" @input="$emit('input', $event.target.value)">
      <option value="0">Diese Woche</option>
      <option value="1">Nächste Woche</option>
      <option value="2">Woche vom
        {{ nextAfterNext.mondayString }} -
        {{ nextAfterNext.sundayString }}</option>
      <option value="3">Woche vom
        {{ inThreeWeeks.mondayString }} -
        {{ inThreeWeeks.sundayString }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'XenaduWeekPicker',
  props: {
    value: {
      String,
    },
  },
  computed: {
    nextAfterNext() {
      const m = new Date();
      const s = new Date();
      m.setDate(m.getDate() - m.getDay() + 1 + 14);
      s.setDate(s.getDate() - s.getDay() + 1 + 6 + 14);
      return {
        mondayString: `${m.getDate()}.${m.getMonth() + 1}.`,
        sundayString: `${s.getDate()}.${s.getMonth() + 1}.`,
      };
    },
    inThreeWeeks() {
      const m = new Date();
      const s = new Date();
      m.setDate(m.getDate() - m.getDay() + 1 + 21);
      s.setDate(s.getDate() - s.getDay() + 1 + 6 + 21);
      return {
        mondayString: `${m.getDate()}.${m.getMonth() + 1}.`,
        sundayString: `${s.getDate()}.${s.getMonth() + 1}.`,
      };
    },
  },
};
</script>
