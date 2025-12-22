<template>
  <div class="flex-1 w-full h-full px-0">
    <div
      class="flex-1 w-full h-full overflow-hidden rounded-2xl bg-base-100 border border-base-200/60 shadow-md backdrop-blur-md">
      <div class="h-full overflow-y-auto no-scrollbar px-4 pb-20 pt-4 space-y-4">


        <Pagination ref="device_panel" :items="mydevices" :pageSize="200" @refresh="refreshPage" :showTopControls="true"
          :showBottomControls="false">
          <template #buttons>
            <div class="flex flex-wrap items-center justify-between gap-3 w-full px-1">
              <div class="flex flex-wrap items-center gap-2">
                <button class="btn btn-md md:btn-md btn-primary" @click="$refs.scan_dialog.show()">
                  <font-awesome-icon icon="fa-solid fa-network-wired" class="h-3 w-3" />{{ $t('scanTCPDevice') }}
                </button>
                <button class="btn btn-md md:btn-md btn-primary" @click="$emiter('showDialog', { name: 'accounts' })">
                  <font-awesome-icon icon="user" class="h-3 w-3" />{{ $t('accounts') }}
                </button>
                <button class="btn btn-md md:btn-md btn-primary"
                  @click="$emiter('showDialog', { name: 'materials', group: item })">
                  <font-awesome-icon icon="fa-solid fa-film" class="h-3 w-3" />{{ $t('materials') }}
                </button>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <!-- Screen Cast Settings Button -->
                <button class="btn btn-md md:btn-md btn-circle btn-ghost tooltip tooltip-bottom"
                  :data-tip="$t('screenCastSettings')" :aria-label="$t('screenCastSettings')"
                  @click="$refs.screen_cast_settings.show()">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 10V7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H12M6 18C6 16.8954 5.10457 16 4 16M8 18C8 15.7909 6.20914 14 4 14M4 12C7.31371 12 10 14.6863 10 18"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <div
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-base-200/80 border border-base-300/60 shadow-md"
                  role="group" :aria-label="$t('displayMode')">
                  <div
                    class="join rounded-lg overflow-hidden border border-base-300 bg-base-100 shadow-inner text-md font-medium">
                    <button type="button"
                      class="join-item btn btn-md md:btn-md gap-1 px-3 py-1.5 border-0 bg-transparent hover:bg-primary/10"
                      :class="{ 'btn-active bg-primary text-primary-content shadow': !listMode }"
                      :aria-pressed="!listMode" @click="setDisplayMode('grid')">
                      <font-awesome-icon icon="fa-solid fa-th" class="h-3 w-3" />
                      <span class="hidden sm:inline">{{ $t('gridMode') }}</span>
                    </button>
                    <button type="button"
                      class="join-item btn btn-md md:btn-md gap-1 px-3 py-1.5 border-0 bg-transparent hover:bg-primary/10"
                      :class="{ 'btn-active bg-primary text-primary-content shadow': listMode }"
                      :aria-pressed="listMode" @click="setDisplayMode('list')">
                      <font-awesome-icon icon="fa-solid fa-list" class="h-3 w-3" />
                      <span class="hidden sm:inline">{{ $t('listMode') }}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </template>

          <template #default="slotProps">
            <div class="flex flex-wrap gap-4 p-4">
              <div class="flex flex-wrap gap-3 flex-1" v-if="listMode">
                <div class="overflow-x-auto w-full rounded-lg border border-base-300/40 bg-base-100 shadow-sm">
                  <table class="table table-sm table-fixed w-full">
                    <thead class="bg-base-200/60 text-sm text-base-content/70">
                      <tr>
                        <th class="w-12 py-2 px-2 font-medium">{{ $t('no') }}</th>
                        <th class="w-40 py-2 px-2 font-medium">{{ $t('serial') }}</th>
                        <th class="w-16 py-2 px-2 font-medium">{{ $t('mode') }}</th>
                        <th class="w-32 py-2 px-2 font-medium">{{ $t('realSerial') }}</th>
                        <th class="w-20 py-2 px-2 font-medium">{{ $t('connectType') }}</th>
                        <th class="w-20 py-2 px-2 font-medium">{{ $t('group') }}</th>
                        <th class="w-20 py-2 px-2 font-medium">{{ $t('status') }}</th>
                        <th class="w-28 py-2 px-2 font-medium">{{ $t('sort') }}</th>
                        <th class="w-48 py-2 px-2 font-medium">{{ $t('proxyRotationUrl') }}</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm text-base-content/80">
                      <tr v-for="(device, index) in slotProps.items" :key="device.real_serial || device.serial || index"
                        class="hover:bg-base-200/40 border-b border-base-200/50">
                        <td class="py-2 px-2 text-base-content/60">
                          <span class="font-bold text-lg">{{ device.key }}</span>
                        </td>
                        <td class="py-2 px-2">
                          <div class="flex items-center gap-1">
                            <a class="link link-primary text-sm font-medium truncate max-w-[100px]"
                              @click="$emiter('openDevice', device)" v-if="device.key" :title="device.serial">{{
                                device.serial }}</a>
                            <button class="btn btn-ghost btn-sm p-0 h-5 min-h-0 w-5" @click="copySerial(device.serial)"
                              :title="$t('copy')">
                              <font-awesome-icon icon="fas fa-copy"
                                class="h-3 w-3 text-base-content/50 hover:text-primary" />
                            </button>
                          </div>
                        </td>
                        <td class="py-2 px-2 text-base-content/60 text-sm">{{ device.mode }}</td>
                        <td class="py-2 px-2 text-base-content/60 text-sm truncate" :title="device.real_serial">{{
                          device.real_serial }}</td>
                        <td class="py-2 px-2">
                          <div class="badge badge-outline badge-sm border-base-300 text-base-content/70"
                            v-if="device.connect_type == '0'">USB</div>
                          <div class="badge badge-primary badge-sm" v-else>TCP</div>
                        </td>
                        <td class="py-2 px-2 text-base-content/60 text-sm truncate" :title="device.group_name">{{
                          device.group_name || '--' }}</td>
                        <td class="py-2 px-2">
                          <div class="badge badge-success badge-sm" v-if="device.task_status == '1'">
                            {{ $t('running') }}
                          </div>
                          <div class="badge badge-ghost badge-sm" v-else>
                            {{ $t('ready') }}
                          </div>
                        </td>
                        <td class="py-2 px-2">
                          <div class="flex items-center gap-1">
                            <span class="text-base-content/60 text-sm">{{ device.sort }}</span>
                            <button class="btn btn-ghost btn-sm p-0 h-5 min-h-0 w-5" @click="showSetSortDialog(device)"
                              :title="$t('setSort')">
                              <font-awesome-icon icon="fas fa-edit"
                                class="h-3 w-3 text-base-content/50 hover:text-primary" />
                            </button>
                          </div>
                        </td>
                        <td class="py-2 px-2">
                          <!-- Compact proxy rotation column: truncated URL + single-line time/status + icon actions -->
                          <div class="flex items-center gap-2">
                            <div class="flex-1 min-w-0">
                              <span v-if="device.proxyRotation?.rotation_url" class="text-sm truncate"
                                :title="device.proxyRotation.rotation_url">{{ device.proxyRotation.rotation_url
                                }}</span>
                              <span v-else class="text-sm text-base-content/40">{{ $t('proxyRotationNotConfigured')
                              }}</span>

                              <div class="text-xs text-base-content/60 truncate mt-1"
                                :title="formatRotationTime(device.proxyRotation?.last_rotated_at) + ' · ' + rotationStatusLabel(device.proxyRotation?.last_status)">
                                {{ formatRotationTime(device.proxyRotation?.last_rotated_at) }} ·
                                <span :class="rotationStatusClass(device.proxyRotation?.last_status)">{{
                                  rotationStatusLabel(device.proxyRotation?.last_status) }}</span>
                              </div>
                            </div>

                            <div class="flex flex-col items-end gap-1">
                              <button class="btn btn-ghost btn-sm p-0 h-7 w-7"
                                :class="{ 'loading': isTestingRotation(device) }"
                                :disabled="!device.proxyRotation?.rotation_url || isTestingRotation(device)"
                                @click="testProxyRotation(device)" :title="$t('testProxyRotation')"
                                aria-label="test-rotation">
                                <font-awesome-icon icon="fa-solid fa-sync-alt" class="h-4 w-4" />
                              </button>
                              <button class="btn btn-ghost btn-sm p-0 h-7 w-7" @click="openProxyRotationDialog(device)"
                                :title="$t('configure')">
                                <font-awesome-icon icon="fas fa-cog" class="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <DeviceGrid v-else :devices="slotProps.items" :gridCardHeight="gridCardHeight"
                :resolutionSmall="resolutionSmall" :resolutionBig="resolutionBig" :bigScreenMode="bigScreenMode"
                :hibernateCastingEnabled="hibernateCastingEnabled" />
            </div>
          </template>
        </Pagination>


        <div v-if="devices.length == 0"
          class="w-full min-h-[40vh] bg-base-100 flex flex-col items-center justify-center rounded-xl border border-dashed border-base-300 p-8">
          <div class="relative flex justify-center items-center">
            <div class="absolute animate-spin rounded-full h-48 w-48 border-t-4 border-b-4 border-purple-500"></div>
            <svg class="fill-current text-info h-32 w-32" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 471.117 471.117" xml:space="preserve">
              <g>
                <path
                  d="M447.564,129.817h-68.192c-8.213,0-14.871,6.675-14.871,14.872v129.155 c0,8.213,6.658,14.873,14.871,14.873h68.192c8.197,0,14.856-6.66,14.856-14.873V144.689 C462.42,136.492,455.761,129.817,447.564,129.817z M446.81,144.689v115.13h-66.776l-0.662-114.377L446.81,144.689z M406.025,273.461c0-4.076,3.321-7.429,7.428-7.429c4.122,0,7.443,3.353,7.443,7.429c0,4.107-3.321,7.444-7.443,7.444 C409.346,280.905,406.025,277.568,406.025,273.461z" />
                <path
                  d="M116.123,216.788v38.371h-12.365c-8.627,0-15.61,6.999-15.61,15.626 c0,8.629,6.983,15.609,15.61,15.609h101.765c8.629,0,15.626-6.98,15.626-15.609c0-8.627-6.997-15.626-15.626-15.626h-12.364 v-38.371H271.5c16.04,0,29.083-13.041,29.083-29.083V29.082C300.583,13.042,287.54,0,271.5,0H37.781 C21.739,0,8.697,13.042,8.697,29.082v158.623c0,16.042,13.042,29.083,29.084,29.083H116.123z M39.933,31.236h229.415v154.316 H39.933V31.236z" />
                <path
                  d="M345.138,298.622h-170.42c-16.118,0-29.237,13.118-29.237,29.235v114.024 c0,16.117,13.119,29.235,29.237,29.235h170.42c16.117,0,29.235-13.118,29.235-29.235V327.857 C374.374,311.74,361.255,298.622,345.138,298.622z M165.583,395.805c-6.044,0-10.935-4.876-10.935-10.936 c0-6.059,4.891-10.95,10.935-10.95c6.028,0,10.95,4.892,10.95,10.95C176.533,390.929,171.611,395.805,165.583,395.805z M350.951,441.882c0,3.198-2.614,5.813-5.813,5.813H184.577V322.045h160.562c3.198,0,5.813,2.614,5.813,5.813V441.882z" />
                <path
                  d="M49.36,399.558v-133.34v-25.452H25.937v170.511c0,6.46,5.244,11.704,11.705,11.704h78.48v-23.423 h-5.383H49.36z" />
                <path
                  d="M418.989,343.237v56.32h-20.485h-4.26v23.423h36.465c6.459,0,11.703-5.244,11.703-11.704V311.033 h-23.423V343.237z" />
              </g>
            </svg>
          </div>
          <span class="mt-8 text-lg font-semibold text-base-content animate-bounce">{{ $t('detecting_devices') }}</span>
          <a v-if="whitelabelConfig.showOfficialWebsite && whitelabelConfig.officialWebsite" class="link link-primary text-md flex items-center gap-1 min-w-max"
            :href="whitelabelConfig.officialWebsite + '/docs/troubleshooting/unable-detect-phone'" target="_blank">
            <font-awesome-icon icon="fas fa-question-circle" class="h-5 w-5" />
            {{ $t('unableDetectPhoneTip') }}
          </a>
        </div>
      </div>
    </div>
  </div>
  <vue-draggable-resizable v-if="device && device.serial" :w="`auto`" :h="`auto`" :resizable="false" :parent="false"
    :z="20" drag-handle=".drag"
    class="bg-base-100 fixed top-32 right-32 border border-base-300 justify-center items-center flex flex-col ring-1 ring-info ring-opacity-50 shadow-2xl rounded-md">
    <Device :device="device" :no="device.key" :bigSize="true" :key="device.real_serial + '_big'"
      :gridCardHeight="gridCardHeight" :resolutionSmall="resolutionSmall" :resolutionBig="resolutionBig"
      :bigScreenMode="bigScreenMode" :hibernateCastingEnabled="hibernateCastingEnabled" />
  </vue-draggable-resizable>
  <dialog ref="scan_dialog" class="modal">
    <div class="modal-box bg-base-300 max-w-2xl">
      <!-- Tabs -->
      <div class="tabs tabs-md tabs-border border border-base-300 bg-base-500 rounded-md shadow-lg p-2 mb-4">
        <input type="radio" name="scan_tabs" class="tab" :aria-label="$t('scanIpRange')" :checked="scanTab === 'range'"
          @change="scanTab = 'range'" />
        <div class="tab-content mt-2">
          <h3 class="font-bold text-lg">{{ $t('scanIpTitle') }}</h3>
          <div class="flex flex-row items-center">
            <input class="input input-bordered input-md w-20 ring" type="number" v-model="ip_1" />
            <span class="font-bold p-1">.</span>
            <input class="input input-bordered input-md w-20 ring" type="number" v-model="ip_2" />
            <span class="font-bold p-1">.</span>
            <input class="input input-bordered input-md w-20 ring" type="number" v-model="ip_3" />
            <span class="font-bold p-1">.</span>
            <input class="input input-bordered input-md w-20 ring ring-info" type="number" v-model="ip_4" />
            <span class="font-bold p-2 mr-1 ml-1 text-lg">-</span>
            <input class="input input-bordered input-md w-20 ring ring-success" type="number" v-model="ip_5" />
          </div>
          <h5 class="font-bold">{{ $t('scanPortTip') }}</h5>
          <input class="input input-bordered input-md w-24 ring" type="number" v-model="port" />
          <div class="flex flex-wrap items-center gap-2 mt-4">
            <MyButton @click="scan" label="startScan" :showLoading="scaning" icon="fa fa-search" />
            <span class="label-text">{{ scanResult }}</span>
          </div>
          <div class="mt-3 space-y-2" v-if="scanDetails.length">
            <h5 class="font-bold text-sm">{{ $t('scanDetailsTitle') }}</h5>
            <div
              class="max-h-48 overflow-y-auto rounded-xl border border-base-200 bg-base-100/70 divide-y divide-base-200 text-sm">
              <div v-for="(detail, index) in scanDetails" :key="`${detail.ip}-${index}`" class="px-3 py-2 space-y-1">
                <div class="flex items-center justify-between gap-3">
                  <span class="font-mono text-base-content/80">{{ detail.ip }}</span>
                  <span :class="scanDetailStatusClass(detail)">{{ scanDetailStatusLabel(detail) }}</span>
                </div>
                <span class="text-sm text-base-content/60 break-all" :title="detail.message">{{ detail.message }}</span>
              </div>
            </div>
          </div>
          <div class="mt-3 text-sm text-base-content/70" v-else-if="scanSummary">
            {{ $t('scanNoDevices') }}
          </div>
        </div>

        <input type="radio" name="scan_tabs" class="tab" :aria-label="$t('cloudPhoneList')"
          :checked="scanTab === 'cloudPhone'" @change="scanTab = 'cloudPhone'" />
        <div class="tab-content mt-2">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-lg">{{ $t('cloudPhoneList') }}</h3>
            <MyButton @click="showAddCloudPhoneForm" label="add" icon="fa fa-plus" size="sm" />
          </div>

          <!-- Add/Edit Form -->
          <div v-if="showCloudPhoneForm" class="mb-4 p-3 bg-base-200 rounded-lg space-y-2">
            <div class="form-control">
              <label class="label py-1">
                <span class="label-text">{{ $t('cloudPhoneName') }}</span>
              </label>
              <input type="text" class="input input-bordered input-sm" v-model="cloudPhoneForm.name"
                :placeholder="$t('cloudPhoneNamePlaceholder')" />
            </div>
            <div class="flex gap-2">
              <div class="form-control flex-1">
                <label class="label py-1">
                  <span class="label-text">{{ $t('ipAddress') }}</span>
                </label>
                <input type="text" class="input input-bordered input-sm" v-model="cloudPhoneForm.ip"
                  placeholder="192.168.1.100" />
              </div>
              <div class="form-control w-24">
                <label class="label py-1">
                  <span class="label-text">{{ $t('port') }}</span>
                </label>
                <input type="number" class="input input-bordered input-sm" v-model="cloudPhoneForm.port"
                  placeholder="5555" />
              </div>
            </div>
            <div class="form-control">
              <label class="label py-1">
                <span class="label-text">{{ $t('authCode') }} <span class="text-xs text-base-content/60">({{
                  $t('authCodeOptional') }})</span></span>
              </label>
              <input type="text" class="input input-bordered input-sm" v-model="cloudPhoneForm.auth_code"
                :placeholder="$t('authCodePlaceholder')" />
            </div>
            <div class="flex gap-2 mt-2">
              <MyButton @click="saveCloudPhone" label="save" icon="fa fa-save" size="sm" />
              <MyButton @click="cancelCloudPhoneForm" label="cancel" icon="fa fa-times" size="sm" type="ghost" />
            </div>
          </div>

          <!-- Cloud Phone List -->
          <div v-if="cloudPhoneList.length > 0" class="space-y-2">
            <div class="flex items-center gap-2 mb-2">
              <input type="checkbox" class="checkbox checkbox-sm" v-model="selectAllCloudPhones"
                @change="toggleSelectAllCloudPhones" />
              <span class="text-sm">{{ $t('selectAll') }}</span>
              <MyButton v-if="selectedCloudPhones.length > 0" @click="connectSelectedCloudPhones"
                :label="$t('connectSelected', { count: selectedCloudPhones.length })"
                :showLoading="connectingCloudPhones" icon="fa fa-plug" size="sm" class="ml-auto" />
            </div>
            <div
              class="max-h-64 overflow-y-auto rounded-xl border border-base-200 bg-base-100/70 divide-y divide-base-200">
              <div v-for="(phone, index) in cloudPhoneList" :key="phone.id || index"
                class="px-3 py-2 flex items-center gap-3 hover:bg-base-200/50">
                <input type="checkbox" class="checkbox checkbox-sm" v-model="selectedCloudPhones" :value="phone.id" />
                <div class="flex-1 min-w-0">
                  <div class="font-medium truncate">{{ phone.name || phone.ip }}</div>
                  <div class="text-xs text-base-content/60">
                    {{ phone.ip }}:{{ phone.port }}
                    <span v-if="phone.auth_code" class="ml-2 badge badge-xs badge-info">{{ $t('hasAuthCode') }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <span v-if="phone.lastStatus" :class="cloudPhoneStatusClass(phone.lastStatus)" class="text-xs">
                    {{ cloudPhoneStatusLabel(phone.lastStatus) }}
                  </span>
                  <button class="btn btn-ghost btn-xs" @click="connectSingleCloudPhone(phone)"
                    :disabled="connectingCloudPhones">
                    <i class="fa fa-plug"></i>
                  </button>
                  <button class="btn btn-ghost btn-xs" @click="editCloudPhone(phone)">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button class="btn btn-ghost btn-xs text-error" @click="deleteCloudPhone(phone)">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-base-content/60">
            <i class="fa fa-cloud text-4xl mb-2"></i>
            <p>{{ $t('noCloudPhones') }}</p>
            <p class="text-xs mt-1">{{ $t('cloudPhoneHint') }}</p>
          </div>

          <!-- Connect Result -->
          <div v-if="cloudPhoneConnectResult" class="mt-3 space-y-2">
            <h5 class="font-bold text-sm">{{ $t('connectResult') }}</h5>
            <div
              class="max-h-48 overflow-y-auto rounded-xl border border-base-200 bg-base-100/70 divide-y divide-base-200 text-sm">
              <div v-for="(result, index) in cloudPhoneConnectResult.details" :key="`result-${index}`"
                class="px-3 py-2 space-y-1">
                <div class="flex items-center justify-between gap-3">
                  <span class="font-mono text-base-content/80">{{ result.ip }}:{{ result.port }}</span>
                  <span :class="result.success ? 'text-success font-semibold' : 'text-error font-semibold'">
                    {{ result.success ? $t('scanStatusConnected') : $t('scanStatusFailed') }}
                  </span>
                </div>
                <span class="text-sm text-base-content/60 break-all">{{ result.message }}</span>
                <span v-if="result.auth_result" class="text-sm text-info break-all block">
                  {{ $t('authResult') }}: {{ result.auth_result }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <dialog ref="set_sort_dialog" class="modal">
    <div class="modal-box bg-base-300">
      <h3 class="font-bold text-lg">{{ $t('setSort') }}</h3>
      <div class="flex flex-row items-center">
        <input class="input input-bordered input-md" type="number" v-model="currentDevice.sort" v-if="currentDevice" />
        <MyButton @click="setSort" label="confirm" />
      </div>
      <p class="mt-2 text-sm text-base-content/60">{{ $t('setSortHint') }}</p>

    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

  <DeviceProxyRotation ref="proxy_rotation_component" @save="handleProxyRotationSave" @clear="handleProxyRotationClear"
    @error="handleProxyRotationError" />

  <!-- Debug Dialog -->
  <DeviceDebugDialog v-if="debugDevice" v-model="showDebugDialog" :device="debugDevice"
    @close="handleCloseDebugDialog" />

  <!-- Screen Cast Settings Dialog -->
  <ScreenCastSettings ref="screen_cast_settings" :gridCardHeight="gridCardHeight" />
</template>
<style>
@import "vue-draggable-resizable/style.css";
</style>
<script>
import MyButton from '../Button.vue'
import Device from './Device.vue'
import Pagination from '../Pagination.vue'
import DeviceGrid from './DeviceGrid.vue'
import DeviceDebugDialog from '../dialogs/DeviceDebugDialog.vue'
import DeviceProxyRotation from './DeviceProxyRotation.vue'
import ScreenCastSettings from '../dialogs/ScreenCastSettings.vue'
import { writeText } from '@tauri-apps/api/clipboard';
import { readTextFile, writeTextFile, exists, createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { getWhiteLabelConfig, cloneDefaultWhiteLabelConfig } from '../../config/whitelabel.js';
import { getItem, setItem } from '@/utils/storage.js';




export default {
  name: 'devices',
  props: {
    devices: {
      type: Array,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
  },
  components: {
    MyButton,
    Device,
    Pagination,
    DeviceGrid,
    DeviceDebugDialog,
    DeviceProxyRotation,
    ScreenCastSettings
  },
  data() {
    return {
      // Centralized bigScreen mode (standard | docked)
      bigScreenMode: 'standard',
      // Centralized hibernate casting flag
      hibernateCastingEnabled: false,
      device: null,
      whitelabelConfig: cloneDefaultWhiteLabelConfig(),
      listMode: false,
      mydevices: [],
      ip_1: 192,
      ip_2: 168,
      ip_3: 1,
      ip_4: 2,
      ip_5: 254,
      port: 5555,
      proxy_host: 'localhost',
      proxy_port: 8080,
      scaning: false,
      scanResult: '',
      scanSummary: null,
      scanDetails: [],
      groups: [],
      currentDevice: null,
      // grid card height is computed dynamically on mount when no stored value
      gridCardHeight: 0,
      // whether gridCardHeight was loaded from storage (user set)
      gridCardHeightFromStorage: false,
      // Centralized resolution values read once and passed to Device components
      resolutionSmall: 360,
      resolutionBig: 1080,
      // event listeners cleanup
      listeners: [],
      // resize debounce
      resizeTimeout: null,
      // Debug Dialog
      showDebugDialog: false,
      debugDevice: null,
      proxyRotationMap: {},
      proxyRotationForm: {
        device_serial: '',
        device_label: '',
        rotation_url: '',
        method: 'GET',
        headers_json: '',
        body_json: '',
        timeout_ms: 10000,
      },
      testingRotations: {},
      requestHeadersSample: '{ "Authorization": "Bearer token" }',
      // Cloud Phone
      scanTab: 'range',
      cloudPhoneList: [],
      selectedCloudPhones: [],
      selectAllCloudPhones: false,
      showCloudPhoneForm: false,
      editingCloudPhoneId: null,
      cloudPhoneForm: {
        name: '',
        ip: '',
        port: 5555,
        auth_code: '',
      },
      connectingCloudPhones: false,
      cloudPhoneConnectResult: null,
    }
  },
  watch: {

    groups: {
      handler() {
        this.syncDisplayedDevices()
      },
      deep: true
    },
    async listMode(val) {
      await setItem('listMode', val ? 'true' : 'false')
    },
    devices: {
      handler() {
        this.syncDisplayedDevices()
      },
      deep: true
    }
  },
  async created() {
    const [
      config,
      storedListMode,
      ip1,
      ip2,
      ip3,
      ip4,
      ip5,
      scanPort,
      storedProxyHost,
      storedProxyPort,
      gridCardHeight,
      storedScreenResolutionSmall,
      storedScreenResolutionBig
      ,
      storedBigScreen,
      storedHibernateCasting
    ] = await Promise.all([
      getWhiteLabelConfig(),
      getItem('listMode'),
      getItem('ip_1'),
      getItem('ip_2'),
      getItem('ip_3'),
      getItem('ip_4'),
      getItem('ip_5'),
      getItem('scan_port'),
      getItem('proxy_host'),
      getItem('proxy_port'),
      getItem('gridCardHeight'),
      getItem('screenResolutionSmall'),
      getItem('screenResolutionBig')
      ,
      getItem('bigScreen'),
      getItem('hibernateCasting')
    ]);

    const parseNumber = (value, fallback) => {
      if (value === null || value === undefined) {
        return fallback;
      }
      const parsed = Number(String(value).replace(/"/g, ''));
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    if (config) {
      this.whitelabelConfig = config;
    }

    if (storedListMode !== null) {
      this.listMode = storedListMode === 'true' || storedListMode === true;
    }

    this.ip_1 = parseNumber(ip1, 192);
    this.ip_2 = parseNumber(ip2, 168);
    this.ip_3 = parseNumber(ip3, 1);
    this.ip_4 = parseNumber(ip4, 2);
    this.ip_5 = parseNumber(ip5, 254);
    this.port = parseNumber(scanPort, 5555);

    if (storedProxyHost) {
      this.proxy_host = String(storedProxyHost).replace(/"/g, '') || 'localhost';
    }
    if (storedProxyPort !== null) {
      this.proxy_port = parseNumber(storedProxyPort, 8080);
    }
    // If user has stored a gridCardHeight use it, otherwise leave 0 and compute on mounted
    const parsedGridCardHeight = parseNumber(gridCardHeight, null);
    if (parsedGridCardHeight !== null) {
      this.gridCardHeight = parsedGridCardHeight;
      this.gridCardHeightFromStorage = true;
    }

    // Load centralized small/big screen resolution values (fallback to legacy key for small)
    try {
      this.resolutionSmall = parseNumber(storedScreenResolutionSmall, 360);
    } catch (err) {
      this.resolutionSmall = 360;
    }
    try {
      this.resolutionBig = parseNumber(storedScreenResolutionBig, 1080);
    } catch (err) {
      this.resolutionBig = 1080;
    }

    // Load centralized bigScreen and hibernateCasting values
    try {
      this.bigScreenMode = (storedBigScreen && String(storedBigScreen).replace(/"/g, '')) || 'standard'
    } catch (err) {
      this.bigScreenMode = 'standard'
    }
    try {
      this.hibernateCastingEnabled = (String(storedHibernateCasting) === 'true' || storedHibernateCasting === true)
    } catch (err) {
      this.hibernateCastingEnabled = false
    }

    // Listen to resolution change events emitted by ScreenCastSettings and update centralized values
    try {
      this.listeners.push(await this.$listen('screenResolutionSmall', async (e) => {
        try {
          const newRes = e?.payload?.resolution;
          if (!newRes) return;
          this.resolutionSmall = Number(newRes) || this.resolutionSmall;
        } catch (err) {
          console.warn('failed handling screenResolutionSmall event', err);
        }
      }));
      this.listeners.push(await this.$listen('screenResolutionBig', async (e) => {
        try {
          const newRes = e?.payload?.resolution;
          if (!newRes) return;
          this.resolutionBig = Number(newRes) || this.resolutionBig;
        } catch (err) {
          console.warn('failed handling screenResolutionBig event', err);
        }
      }));
      // Listen to bigScreen mode change emitted by ScreenCastSettings
      this.listeners.push(await this.$listen('bigScreen', async (e) => {
        try {
          const newMode = e?.payload?.mode;
          if (!newMode) return;
          this.bigScreenMode = String(newMode) || this.bigScreenMode;
        } catch (err) {
          console.warn('failed handling bigScreen event', err);
        }
      }));
    } catch (err) {
      console.warn('Failed to register resolution listeners', err);
    }

    // Load cloud phone list
    await this.loadCloudPhoneList();

  },
  methods: {
    // Compute a reasonable default card height based on viewport height.
    // Use 1/4 of viewport height as default, clamped to a sensible range so cards don't become absurdly large.
    computeGridCardHeight() {
      try {
        const h = (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 900
        // Default to 1/4 of viewport height
        const calc = Math.round(h / 4)
        // Clamp between 140 and 600 to avoid too-small or too-huge cards on extreme displays
        return Math.max(140, Math.min(600, calc))
      } catch (e) {
        return 150
      }
    },

    onWindowResize() {
      // debounce updates to avoid thrash
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(async () => {
        if (!this.gridCardHeightFromStorage) {
          const next = this.computeGridCardHeight()
          if (Math.abs(next - this.gridCardHeight) > 2) {
            this.gridCardHeight = next
            // Persist the computed default so it's stable across reloads.
            // NOTE: We intentionally do NOT flip `gridCardHeightFromStorage` here.
            // - The value saved here is considered a computed default (derived from viewport),
            //   not an explicit user preference.
            // - Keeping `gridCardHeightFromStorage` as false allows future automatic
            //   recomputation and persistence on subsequent resizes.
            // If you prefer to treat the first persisted value as a user-set value
            // (preventing further automatic persistence), set
            // `this.gridCardHeightFromStorage = true` after a successful setItem().
            try {
              await setItem('gridCardHeight', this.gridCardHeight)
            } catch (err) {
              // ignore persistence errors
              console.warn('Failed saving gridCardHeight on resize:', err)
            }
            this.$emiter('screenScaled', { size: this.gridCardHeight })
          }
        }
      }, 120)
    },
    setDisplayMode(mode) {
      this.listMode = mode === 'list';
    },
    async copySerial(serial) {
      if (!serial) return;
      await this.copyText(serial);
    },
    async copyText(text) {
      await writeText(text)
      await this.$emiter('NOTIFY', {
        type: 'success',
        message: this.$t('copied'),
        timeout: 2000
      });
    },
    breakAt() {
      const obj = {};
      for (let i = 1; i <= 4; i++) {
        obj[200 * (i + 1) + 15 * i] = i;
      }
      return obj;
    },
    showSetSortDialog(device) {
      if (device) {
        this.currentDevice = device
        this.$refs.set_sort_dialog.show()
      }
    },
    async setSort() {
      if (!this.currentDevice) return
      this.currentDevice.sort = parseInt(this.currentDevice.sort)
      await setItem(`sort_${this.currentDevice.real_serial}`, this.currentDevice.sort)
      this.mydevices.sort((a, b) => {
        return a.sort - b.sort || a.group_id - b.group_id || a.real_serial - b.real_serial
      });
      this.$emiter('reload_devices', {})
    },
    getDeviceSerial(device) {
      return device?.real_serial || device?.serial || ''
    },
    refreshPage() {
      this.mydevices = []
      this.$emiter('reload_devices', { force: true })
    },

    // proxy rotation form handling moved to DeviceProxyRotation child component
    async loadProxyRotations() {
      try {
        const fileExists = await exists('data/proxy-rotations.json', { dir: BaseDirectory.AppData })
        if (!fileExists) {
          this.proxyRotationMap = {}
          return
        }
        const content = await readTextFile('data/proxy-rotations.json', { dir: BaseDirectory.AppData })
        const parsed = JSON.parse(content || '[]')
        if (Array.isArray(parsed)) {
          this.proxyRotationMap = parsed.reduce((acc, item) => {
            if (item && item.device_serial) {
              acc[item.device_serial] = item
            }
            return acc
          }, {})
        } else {
          this.proxyRotationMap = {}
        }
      } catch (error) {
        console.error('Failed to load proxy rotations:', error)
        this.proxyRotationMap = {}
      } finally {
        this.syncDisplayedDevices()
      }
    },
    decorateDevice(device, groupNameMap) {
      if (!device) {
        return device
      }
      const serial = this.getDeviceSerial(device)
      const rotation = this.proxyRotationMap[serial] || null
      const resolvedGroupName = groupNameMap?.get(device.group_id)
        ?? device.group_name
        ?? (this.groups || []).find(group => group.id === device.group_id)?.name

      if (resolvedGroupName !== undefined && device.group_name !== resolvedGroupName) {
        device.group_name = resolvedGroupName
      }

      if (device.proxyRotation !== rotation) {
        device.proxyRotation = rotation
      }
      return device
    },
    syncDisplayedDevices() {
      if (!Array.isArray(this.devices)) {
        this.mydevices = []
        return
      }
      const groupNameMap = new Map(
        (this.groups || []).map(group => [group.id, group.name])
      )
      this.mydevices = this.devices.map(device => this.decorateDevice(device, groupNameMap))
    },
    openProxyRotationDialog(device) {
      const serial = this.getDeviceSerial(device)
      const config = this.proxyRotationMap[serial] || {
        device_serial: serial,
        rotation_url: '',
        method: 'GET',
        headers: {},
        body: {},
        timeout_ms: 10000,
      }
      if (this.$refs.proxy_rotation_component && this.$refs.proxy_rotation_component.show) {
        const payload = {
          device_serial: serial,
          device_label: device?.key || serial,
          rotation_url: config.rotation_url || '',
          method: config.method || 'GET',
          timeout_ms: config.timeout_ms || 10000,
          headers_json: config.headers ? JSON.stringify(config.headers, null, 2) : '',
          body_json: config.body ? JSON.stringify(config.body, null, 2) : ''
        }
        this.$refs.proxy_rotation_component.show(payload)
      }
    },
    async persistProxyRotations() {
      try {
        const dataDirExists = await exists('data', { dir: BaseDirectory.AppData })
        if (!dataDirExists) {
          await createDir('data', { dir: BaseDirectory.AppData, recursive: true })
        }
        const payload = Object.values(this.proxyRotationMap)
        await writeTextFile('data/proxy-rotations.json', JSON.stringify(payload, null, 2), {
          dir: BaseDirectory.AppData
        })
      } catch (error) {
        console.error('Failed to save proxy rotations:', error)
        throw error
      }
    },
    parseJsonInput(value, fallback = {}) {
      if (!value || value.trim() === '') {
        return fallback
      }
      try {
        return JSON.parse(value)
      } catch (error) {
        throw new Error(this.$t('invalidJsonFormat'))
      }
    },
    // Handlers for extracted DeviceProxyRotation child component
    async handleProxyRotationSave(form) {
      if (!form || !form.device_serial) return
      try {
        const headers = this.parseJsonInput(form.headers_json, {})
        const body = form.method === 'POST' ? this.parseJsonInput(form.body_json, {}) : undefined
        const config = {
          device_serial: form.device_serial,
          rotation_url: form.rotation_url,
          method: form.method,
          headers,
          body,
          timeout_ms: Number(form.timeout_ms) || 10000,
          last_status: this.proxyRotationMap[form.device_serial]?.last_status || null,
          last_message: this.proxyRotationMap[form.device_serial]?.last_message || '',
          last_rotated_at: this.proxyRotationMap[form.device_serial]?.last_rotated_at || null,
        }
        this.proxyRotationMap = {
          ...this.proxyRotationMap,
          [config.device_serial]: config,
        }
        await this.persistProxyRotations()
        this.syncDisplayedDevices()
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('proxyRotationSaved'),
          timeout: 3000,
        })
      } catch (error) {
        console.error('Failed to save proxy rotation:', error)
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: error.message || this.$t('proxyRotationSaveFailed'),
          timeout: 4000,
        })
      }
    },
    async handleProxyRotationClear(serial) {
      if (!serial) return
      try {
        const updatedMap = { ...this.proxyRotationMap }
        delete updatedMap[serial]
        this.proxyRotationMap = updatedMap
        await this.persistProxyRotations()
        this.syncDisplayedDevices()
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('proxyRotationCleared'),
          timeout: 3000,
        })
      } catch (error) {
        console.error('Failed to clear proxy rotation:', error)
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('proxyRotationSaveFailed'),
          timeout: 4000,
        })
      }
    },
    handleProxyRotationError(err) {
      console.error('Proxy rotation child error:', err)
      this.$emiter('NOTIFY', { type: 'error', message: err?.message || String(err), timeout: 4000 })
    },
    formatRotationTime(timestamp) {
      if (!timestamp) {
        return this.$t('proxyRotationNever')
      }
      const date = new Date(timestamp)
      if (Number.isNaN(date.getTime())) {
        return this.$t('proxyRotationNever')
      }
      return date.toLocaleString()
    },
    rotationStatusClass(status) {
      if (status === 'success') {
        return 'text-success'
      }
      if (status === 'failure') {
        return 'text-error'
      }
      return 'text-base-content/70'
    },
    rotationStatusLabel(status) {
      if (status === 'success') {
        return this.$t('success')
      }
      if (status === 'failure') {
        return this.$t('failure')
      }
      return this.$t('unknown')
    },
    isTestingRotation(device) {
      const serial = this.getDeviceSerial(device)
      return !!this.testingRotations[serial]
    },
    async testProxyRotation(device) {
      const serial = this.getDeviceSerial(device)
      const config = this.proxyRotationMap[serial]
      if (!config || !config.rotation_url) {
        await this.$emiter('NOTIFY', {
          type: 'warning',
          message: this.$t('proxyRotationNotConfigured'),
          timeout: 3000,
        })
        return
      }
      this.testingRotations = { ...this.testingRotations, [serial]: true }
      try {
        const payload = {
          device_serial: config.device_serial,
          rotation_url: config.rotation_url,
          method: config.method,
          headers: config.headers || {},
          body: config.body,
          timeout_ms: config.timeout_ms,
        }
        const response = await this.$service.test_proxy_rotation(payload)
        const result = response?.data ?? response ?? {}
        const responseCode = typeof response?.code === 'number' ? response.code : 0
        const isSuccess = responseCode === 0
          ? (result?.success !== false)
          : (result?.success === true)
        const status = result?.status || (isSuccess ? 'success' : 'failure')
        const message =
          result?.message ||
          response?.error ||
          (isSuccess ? this.$t('proxyRotationTestSuccess') : this.$t('proxyRotationTestFailed'))
        const rotatedAt = result?.rotated_at || new Date().toISOString()
        this.proxyRotationMap = {
          ...this.proxyRotationMap,
          [serial]: {
            ...config,
            last_status: status,
            last_message: message,
            last_rotated_at: rotatedAt,
          }
        }
        await this.persistProxyRotations()
        this.syncDisplayedDevices()
        await this.$emiter('NOTIFY', {
          type: isSuccess ? 'success' : 'error',
          message,
          timeout: 3000,
        })
      } catch (error) {
        console.error('Proxy rotation test failed:', error)
        this.proxyRotationMap = {
          ...this.proxyRotationMap,
          [serial]: {
            ...config,
            last_status: 'failure',
            last_message: error.message || this.$t('proxyRotationTestFailed'),
            last_rotated_at: new Date().toISOString(),
          }
        }
        await this.persistProxyRotations()
        this.syncDisplayedDevices()
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: error.message || this.$t('proxyRotationTestFailed'),
          timeout: 4000,
        })
      } finally {
        const rest = { ...this.testingRotations }
        delete rest[serial]
        this.testingRotations = rest
      }
    },

    async scan() {
      this.scaning = true
      this.scanResult = ''
      this.scanSummary = null
      this.scanDetails = []
      try {
        await Promise.all([
          setItem('ip_1', this.ip_1),
          setItem('ip_2', this.ip_2),
          setItem('ip_3', this.ip_3),
          setItem('ip_4', this.ip_4),
          setItem('ip_5', this.ip_5),
          setItem('scan_port', this.port)
        ])
        const payload = {
          start_ip: `${this.ip_1}.${this.ip_2}.${this.ip_3}.${this.ip_4}`,
          end_ip: `${this.ip_1}.${this.ip_2}.${this.ip_3}.${this.ip_5}`,
          port: Number(this.port)
        }

        let summary
        try {
          const res = await this.$service.scan_tcp_details(payload)
          summary = res?.data || res || {}
        } catch (err) {
          console.warn('scan_tcp_details unavailable, fallback to legacy api', err)
          const legacyRes = await this.$service.scan_tcp(payload)
          const legacyCount = Number(legacyRes?.data ?? legacyRes ?? 0) || 0
          summary = {
            total: legacyCount,
            success: legacyCount,
            failed: 0,
            details: []
          }
        }
        const successCount = summary?.success ?? 0
        const failedCount = summary?.failed ?? 0
        const successText = this.$t('scanSuccessCount', { count: successCount })
        const failedText = this.$t('scanFailureCount', { count: failedCount })
        this.scanSummary = summary
        this.scanResult = `${successText} · ${failedText}`
        this.scanDetails = Array.isArray(summary.details) ? summary.details : []
      } catch (error) {
        console.error('TCP scan failed:', error)
        this.scanResult = this.$t('scanFailedGeneric')
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('scanFailedGeneric'),
          timeout: 3000
        })
      } finally {
        this.scaning = false
      }
    },
    scanDetailStatusClass(detail) {
      return detail?.success ? 'text-success font-semibold' : 'text-error font-semibold'
    },
    scanDetailStatusLabel(detail) {
      return detail?.success ? this.$t('scanStatusConnected') : this.$t('scanStatusFailed')
    },

    // Cloud Phone Management Methods
    async loadCloudPhoneList() {
      try {
        const fileExists = await exists('data/cloud-phones.json', { dir: BaseDirectory.AppData })
        if (!fileExists) {
          this.cloudPhoneList = []
          return
        }
        const content = await readTextFile('data/cloud-phones.json', { dir: BaseDirectory.AppData })
        this.cloudPhoneList = JSON.parse(content || '[]')
      } catch (error) {
        console.error('Failed to load cloud phone list:', error)
        this.cloudPhoneList = []
      }
    },
    async saveCloudPhoneList() {
      try {
        const dataDirExists = await exists('data', { dir: BaseDirectory.AppData })
        if (!dataDirExists) {
          await createDir('data', { dir: BaseDirectory.AppData, recursive: true })
        }
        await writeTextFile('data/cloud-phones.json', JSON.stringify(this.cloudPhoneList, null, 2), {
          dir: BaseDirectory.AppData
        })
      } catch (error) {
        console.error('Failed to save cloud phone list:', error)
        throw error
      }
    },
    showAddCloudPhoneForm() {
      this.editingCloudPhoneId = null
      this.cloudPhoneForm = {
        name: '',
        ip: '',
        port: 5555,
        auth_code: '',
      }
      this.showCloudPhoneForm = true
    },
    editCloudPhone(phone) {
      this.editingCloudPhoneId = phone.id
      this.cloudPhoneForm = {
        name: phone.name || '',
        ip: phone.ip || '',
        port: phone.port || 5555,
        auth_code: phone.auth_code || '',
      }
      this.showCloudPhoneForm = true
    },
    cancelCloudPhoneForm() {
      this.showCloudPhoneForm = false
      this.editingCloudPhoneId = null
      this.cloudPhoneForm = {
        name: '',
        ip: '',
        port: 5555,
        auth_code: '',
      }
    },
    async saveCloudPhone() {
      if (!this.cloudPhoneForm.ip) {
        await this.$emiter('NOTIFY', {
          type: 'warning',
          message: this.$t('cloudPhoneIpRequired'),
          timeout: 3000
        })
        return
      }
      try {
        if (this.editingCloudPhoneId) {
          // Update existing
          const index = this.cloudPhoneList.findIndex(p => p.id === this.editingCloudPhoneId)
          if (index !== -1) {
            this.cloudPhoneList[index] = {
              ...this.cloudPhoneList[index],
              name: this.cloudPhoneForm.name,
              ip: this.cloudPhoneForm.ip,
              port: Number(this.cloudPhoneForm.port) || 5555,
              auth_code: this.cloudPhoneForm.auth_code,
            }
          }
        } else {
          // Add new
          const newPhone = {
            id: Date.now().toString(),
            name: this.cloudPhoneForm.name,
            ip: this.cloudPhoneForm.ip,
            port: Number(this.cloudPhoneForm.port) || 5555,
            auth_code: this.cloudPhoneForm.auth_code,
            lastStatus: null,
          }
          this.cloudPhoneList.push(newPhone)
        }
        await this.saveCloudPhoneList()
        this.cancelCloudPhoneForm()
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('cloudPhoneSaved'),
          timeout: 2000
        })
      } catch (error) {
        console.error('Failed to save cloud phone:', error)
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('cloudPhoneSaveFailed'),
          timeout: 3000
        })
      }
    },
    async deleteCloudPhone(phone) {
      const index = this.cloudPhoneList.findIndex(p => p.id === phone.id)
      if (index !== -1) {
        this.cloudPhoneList.splice(index, 1)
        this.selectedCloudPhones = this.selectedCloudPhones.filter(id => id !== phone.id)
        await this.saveCloudPhoneList()
        await this.$emiter('NOTIFY', {
          type: 'success',
          message: this.$t('cloudPhoneDeleted'),
          timeout: 2000
        })
      }
    },
    toggleSelectAllCloudPhones() {
      if (this.selectAllCloudPhones) {
        this.selectedCloudPhones = this.cloudPhoneList.map(p => p.id)
      } else {
        this.selectedCloudPhones = []
      }
    },
    async connectSingleCloudPhone(phone) {
      this.connectingCloudPhones = true
      this.cloudPhoneConnectResult = null
      try {
        const payload = {
          ip: phone.ip,
          port: Number(phone.port) || 5555,
          auth_code: phone.auth_code || null,
        }
        const res = await this.$service.cloud_phone_connect(payload)
        const result = res?.data || res || {}
        // Update phone status
        const index = this.cloudPhoneList.findIndex(p => p.id === phone.id)
        if (index !== -1) {
          this.cloudPhoneList[index].lastStatus = result.success ? 'success' : 'failed'
          await this.saveCloudPhoneList()
        }
        this.cloudPhoneConnectResult = {
          total: 1,
          success: result.success ? 1 : 0,
          failed: result.success ? 0 : 1,
          details: [result]
        }
        await this.$emiter('NOTIFY', {
          type: result.success ? 'success' : 'error',
          message: result.success ? this.$t('cloudPhoneConnected') : this.$t('cloudPhoneConnectFailed'),
          timeout: 3000
        })
        if (result.success) {
          this.$emiter('reload_devices', { force: true })
        }
      } catch (error) {
        console.error('Cloud phone connect failed:', error)
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('cloudPhoneConnectFailed'),
          timeout: 3000
        })
      } finally {
        this.connectingCloudPhones = false
      }
    },
    async connectSelectedCloudPhones() {
      if (this.selectedCloudPhones.length === 0) return
      this.connectingCloudPhones = true
      this.cloudPhoneConnectResult = null
      try {
        const devices = this.cloudPhoneList
          .filter(p => this.selectedCloudPhones.includes(p.id))
          .map(p => ({
            ip: p.ip,
            port: Number(p.port) || 5555,
            auth_code: p.auth_code || null,
          }))
        const res = await this.$service.cloud_phone_batch_connect({ devices })
        const result = res?.data || res || {}
        // Update phone statuses
        if (result.details && Array.isArray(result.details)) {
          for (const detail of result.details) {
            const phone = this.cloudPhoneList.find(p => p.ip === detail.ip && p.port === detail.port)
            if (phone) {
              phone.lastStatus = detail.success ? 'success' : 'failed'
            }
          }
          await this.saveCloudPhoneList()
        }
        this.cloudPhoneConnectResult = result
        const successCount = result?.success ?? 0
        const failedCount = result?.failed ?? 0
        await this.$emiter('NOTIFY', {
          type: successCount > 0 ? 'success' : 'error',
          message: this.$t('cloudPhoneBatchResult', { success: successCount, failed: failedCount }),
          timeout: 4000
        })
        if (successCount > 0) {
          this.$emiter('reload_devices', { force: true })
        }
      } catch (error) {
        console.error('Cloud phone batch connect failed:', error)
        await this.$emiter('NOTIFY', {
          type: 'error',
          message: this.$t('cloudPhoneConnectFailed'),
          timeout: 3000
        })
      } finally {
        this.connectingCloudPhones = false
      }
    },
    cloudPhoneStatusClass(status) {
      if (status === 'success') return 'text-success'
      if (status === 'failed') return 'text-error'
      return 'text-base-content/60'
    },
    cloudPhoneStatusLabel(status) {
      if (status === 'success') return this.$t('scanStatusConnected')
      if (status === 'failed') return this.$t('scanStatusFailed')
      return ''
    },

    async update_settings() {
      await this.$service.update_settings(this.settings)
      //reload settings
      await this.$emiter('reload_settings', {})
    },
    async handleScale(action) {
      const factor = action === 'plus' ? 1.1 : action === 'minus' ? 0.9 : 1
      if (factor === 1) {
        return
      }
      const MIN = 100
      const nextWidth = Math.max(MIN, Math.round(this.gridCardHeight * factor))

      if (Math.abs(nextWidth - this.gridCardHeight) > 0.5) {
        this.gridCardHeight = nextWidth
        await setItem('gridCardHeight', this.gridCardHeight)
        await this.$emiter('screenScaled', { size: this.gridCardHeight })
      }
    },

    handleCloseDebugDialog() {
      this.showDebugDialog = false
      this.debugDevice = null
    },
  },
  computed: {
    canClearProxyRotation() {
      return !!this.proxyRotationForm.device_serial && !!this.proxyRotationMap[this.proxyRotationForm.device_serial]
    }
  },
  async mounted() {
    await this.loadProxyRotations()
    this.syncDisplayedDevices()
    await this.$listen('openDevice', async (e) => {
      const bigScreen = this.bigScreenMode || 'standard'
      if (bigScreen === 'standard') {
        let device = e.payload
        for (let i = 0; i < this.mydevices.length; i++) {
          if (this.mydevices[i].serial === device.serial) {
            this.device = this.mydevices[i]
            break
          }
        }
      }
    });
    await this.$listen('closeDevice', () => {
      this.device = null
    });


    // 监听打开 Debug Dialog 事件
    await this.$listen('openDebugDialog', async (e) => {
      const { serial, real_serial } = e.payload
      // 查找设备
      const device = this.mydevices.find(d => d.serial === serial || d.real_serial === real_serial)
      if (device) {
        this.debugDevice = device
        this.showDebugDialog = true
      }
    });

    // Listen for screen scale action from ScreenCastSettings dialog
    await this.$listen('screenScaleAction', async (e) => {
      if (e.payload && e.payload.action) {
        await this.handleScale(e.payload.action);
      }
    });

    // If user didn't provide a stored gridCardHeight, compute a default based on viewport
    if (!this.gridCardHeightFromStorage) {
      const defaultHeight = this.computeGridCardHeight()
      this.gridCardHeight = defaultHeight
      try {
        await setItem('gridCardHeight', defaultHeight)
      } catch (err) {
        console.warn('Failed to persist computed gridCardHeight:', err)
      }
      // notify other components about the computed size
      this.$emiter('screenScaled', { size: defaultHeight })
    }

    // react to window resize only when gridCardHeight not explicitly set by user
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onWindowResize)
    }

  },

  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onWindowResize)
    }
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout)
    // cleanup any $listen listeners we registered
    try {
      if (Array.isArray(this.listeners)) {
        this.listeners.forEach(l => {
          try {
            if (typeof l === 'function') l()
          } catch (e) {
            // ignore
          }
        })
        this.listeners = []
      }
    } catch (e) {
      // ignore
    }
  },
}
</script>

<style scoped>
@keyframes devicePopIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }

  60% {
    transform: scale(1.05) translateY(-5px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

:deep(.device-card-appear) {
  animation: devicePopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;
}

:deep(.device-card-appear::before) {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(var(--p) / 0.15),
      transparent);
  animation: shimmer 1.5s ease-in-out;
  pointer-events: none;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

:deep(.device-card-appear:nth-child(1)) {
  animation-delay: 0s;
}

:deep(.device-card-appear:nth-child(2)) {
  animation-delay: 0.05s;
}

:deep(.device-card-appear:nth-child(3)) {
  animation-delay: 0.1s;
}

:deep(.device-card-appear:nth-child(4)) {
  animation-delay: 0.15s;
}

:deep(.device-card-appear:nth-child(5)) {
  animation-delay: 0.2s;
}
</style>
