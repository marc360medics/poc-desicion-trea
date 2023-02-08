<template>
    <div class="relative">
        <div class="flex justify-center">
            <input ref="fileInputRef" type="file" accept="image/*,.pdf" style="display:none" @change="handleFiles($event)">
            <menu-item icon="image-add-line" title="Ajouter une image" :action="() => imageUploadClicked()"/>
        </div>
    </div>
</template>

<script >
import Vue from 'vue'
import MenuItem from '../MenuItem.vue'

export default Vue.extend({
    components: { MenuItem },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        imageUploadClicked() {
            // Simulate a click on the hidden input file
            const fileInputRef = (this.$refs.fileInputRef)
            fileInputRef.click()
        },
        handleFiles() {
            const fileInputRef = (this.$refs.fileInputRef)

            if (fileInputRef.files.length === 0) {
                return
            }

            const imageFormData = new FormData()
            imageFormData.append('upload', fileInputRef.files[0])

            this.$emit('uploadStarted')
            this.$emit('uploadEnded', uploadResponse.data.url)
        },

    },
})
</script>

<style scoped lang="scss">

</style>
