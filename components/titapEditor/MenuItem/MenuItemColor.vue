<template>
    <div class="relative">
        <transition name="fade">
            <div v-if="isColorMenuOpened" class="py-1 z-50 absolute top-8 w-40 bg-white rounded-sm shadow-lg border border-gray-300 justify-center content-start flex gap-1 flex-wrap">
                <div
                    v-for="(color, colorIndex) in colors"
                    :key="colorIndex" :style="{backgroundColor: color.color}"
                    class="w-6 h-6 rounded-md border cursor-pointer hover:border-blue-600"
                    @click="selectColor(color.color)">
                </div>
                <div
                    @click="selectColor('black')">
                    <i class="cursor-pointer text-2xl align-middle ri-eraser-fill hover:text-blue-600"></i>
                </div>
                <div>
                    <label>
                        <font-awesome-icon
                            class="cursor-pointer text-xl align-middle hover:text-blue-600"
                            icon="fa-light fa-palette"
                        >
                            <input type="color" class="invisible w-0" @change="selectColor($event.target.value)">
                        </font-awesome-icon>
                    </label>

                </div>
            </div>
        </transition>
        <div class="flex justify-center">
            <menu-item icon="font-color" :has-arrow="true" title="Couleur de police" :action="() => toggleColorSelector()" :is-active="() => isColorMenuOpened"/>
        </div>
    </div>
</template>

<script >
import Vue from 'vue'
import { mapState } from 'vuex'
import MenuItem from '../MenuItem.vue'

export default Vue.extend({
    components: { MenuItem },
    data() {
        return {
            isColorMenuOpened: false,
        }
    },
    computed: {
        ...mapState('toolsStore', ['currentTool']),
        colors() {
            return [...customColorPalette]
        },
    },
    mounted() {
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close)
    },
    methods: {
        toggleColorSelector() {
            this.isColorMenuOpened = !this.isColorMenuOpened
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.isColorMenuOpened = false
            }
        },
        selectColor(color) {
            this.$emit('input', color)
            this.isColorMenuOpened = false
        },
    },
})
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
