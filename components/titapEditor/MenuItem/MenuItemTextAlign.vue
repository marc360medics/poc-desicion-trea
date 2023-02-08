<template>
    <div class="relative">
        <transition name="fade">
            <div v-if="isTextAlignSelectorOpened" class="py-1 z-10 absolute top-8 w-10 bg-white rounded-sm shadow-lg border border-gray-300 justify-center content-center flex gap-1 flex-wrap">
                <menu-item icon="align-left" title="Aligner à droite" :action="() => setAlignment('left')"/>
                <menu-item icon="align-center" title="Aligner au centre" :action="() => setAlignment('center')"/>
                <menu-item icon="align-right" title="Aligner à gauche" :action="() => setAlignment('right')"/>
                <menu-item icon="align-justify" title="Justifier" :action="() => setAlignment('justify')"/>
            </div>
        </transition>
        <div class="flex justify-center">
            <menu-item
                :has-arrow="true"
                :icon="computedIcon"
                title="Changer l'alignement"
                :action="() => toggleTextAlignSelector()"
                :is-active="() => isTextAlignSelectorOpened"
            />
        </div>
    </div>
</template>

<script >
import Vue from 'vue'
import MenuItem from '../MenuItem.vue'

export default Vue.extend({
    components: { MenuItem },
    props: {
        icon: {
            type: String,
        },
    },
    data() {
        return {
            isTextAlignSelectorOpened: false,
        }
    },
    computed: {
        computedIcon() {
            return this.icon ?? 'align-left'
        },
    },
    mounted() {
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close)
    },
    methods: {
        toggleTextAlignSelector() {
            this.isTextAlignSelectorOpened = !this.isTextAlignSelectorOpened
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.isTextAlignSelectorOpened = false
            }
        },
        setAlignment(alignment) {
            this.$emit('input', alignment)
            this.isTextAlignSelectorOpened = false
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
