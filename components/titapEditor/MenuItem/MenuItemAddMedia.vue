<template>
    <div class="relative">
        <transition name="fade">
            <div v-if="isAddMediaSelectorOpened" class="py-1 z-10 absolute top-8 w-10 bg-white rounded-sm shadow-lg border border-gray-300 justify-center content-center flex gap-1 flex-wrap">
                <menu-item icon="link" title="Ajouter un lien" :action="() => addMedia('link')"/>
                <menu-item-image
                    @uploadStarted="$emit('uploadStarted')"
                    @uploadEnded="$emit('uploadImageEnded', $event)" />
                <menu-item-video
                    @uploadProgress="$emit('uploadProgress', $event)"
                    @uploadStarted="$emit('uploadStarted')"
                    @uploadEnded="$emit('uploadVideoEnded', $event)"
                />
                <menu-item icon="youtube-line" title="Ajouter une vidéo youtube" :action="() => addMedia('youtube')"/>
            </div>
        </transition>
        <div class="flex justify-center">
            <menu-item
                :has-arrow="true"
                :icon="icon"
                :title="title"
                :action="() => toggleAddMediaSelector()"
                :is-active="() => isAddMediaSelectorOpened"
            />
        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import MenuItem from '../MenuItem.vue'
import MenuItemImage from './MenuItemImage.vue'
import MenuItemVideo from './MenuItemVideo.vue'

export default Vue.extend({
    components: { MenuItem, MenuItemImage, MenuItemVideo },
    props: {
        icon: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            isAddMediaSelectorOpened: false,
        }
    },
    mounted() {
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close)
    },
    methods: {
        toggleAddMediaSelector() {
            this.isAddMediaSelectorOpened = !this.isAddMediaSelectorOpened
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.isAddMediaSelectorOpened = false
            }
        },
        /**
         * @param typeOfMedia: This parameter allows you to define the type of media to add, from dropdown itemAddMedia in TipTapEditor
         */
        addMedia(typeOfMedia) {
            this.$emit('media', typeOfMedia)
            this.isAddMediaSelectorOpened = false
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
