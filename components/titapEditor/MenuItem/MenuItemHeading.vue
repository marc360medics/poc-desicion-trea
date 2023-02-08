<template>
    <div class="relative">
        <transition name="fade">
            <div v-if="isHeadingSelectorOpened" class="py-1 z-10 absolute top-8 w-10 bg-white rounded-sm shadow-lg border border-gray-300 justify-center content-center flex gap-1 flex-wrap">
                <menu-item icon="h-1" title="Titre 1" :action="() => setHeading(2)"/>
                <menu-item icon="h-2" title="Titre 2" :action="() => setHeading(3)"/>
                <menu-item icon="text" title="Paragraphe" :action="() => setHeading(4)"/>
            </div>
        </transition>
        <div class="flex justify-center">
            <menu-item
                :has-arrow="true"
                :icon="computedIcon"
                title="Changer l'alignement"
                :action="() =>toggleHeadingSelector()"
                :is-active="() => isHeadingSelectorOpened"
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
            isHeadingSelectorOpened: false,
        }
    },
    computed: {
        computedIcon() {
            return this.icon ?? 'text'
        },
    },
    mounted() {
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close)
    },
    methods: {
        toggleHeadingSelector() {
            this.isHeadingSelectorOpened = !this.isHeadingSelectorOpened
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.isHeadingSelectorOpened = false
            }
        },
        setHeading(heading) {
            this.$emit('input', heading)
            this.isHeadingSelectorOpened = false
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
