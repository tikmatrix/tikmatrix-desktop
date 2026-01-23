<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg mb-4">
        {{ $t('timeSlots') }} - {{ template?.name }}
      </h3>

      <div class="overflow-x-auto">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t('startTime') }}</th>
              <th>{{ $t('scriptName') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(slot, index) in timeSlots" :key="slot.id || index">
              <td>{{ index + 1 }}</td>
              <td>
                <span class="badge badge-primary">{{ slot.start_time }}</span>
              </td>
              <td>
                <span class="badge badge-info">{{ $t(slot.script_name) }}</span>
              </td>
            </tr>
            <tr v-if="timeSlots.length === 0">
              <td colspan="3" class="text-center text-base-content/50 py-8">
                {{ $t('noTimeSlots') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">{{ $t('close') }}</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script>
export default {
  name: 'TimeSlotsDialog',
  data() {
    return {
      template: null,
      timeSlots: []
    }
  },
  methods: {
    async show(template) {
      this.template = template;
      this.timeSlots = [];

      try {
        const res = await this.$service.get_schedule_template({ id: template.id });
        if (res.data && res.data.time_slots) {
          this.timeSlots = res.data.time_slots;
        }
      } catch (error) {
        console.error('Failed to load time slots:', error);
      }

      this.$refs.dialog.showModal();
    }
  }
}
</script>
