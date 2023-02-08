<template>
    <div class="relative">
        <div class="flex justify-center">
            <input ref="fileInputRef" type="file" accept="video/*" style="display:none" @change="handleFiles($event)">
            <menu-item icon="video-add-line" title="Ajouter une vidéo" :action="() => videoUploadClicked()"/>
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
    methods: {
        videoUploadClicked() {
            // Simulate a click on the hidden input file
            const fileInputRef = (this.$refs.fileInputRef)
            fileInputRef.click()
        },
         handleFiles() {
            const fileInputRef = (this.$refs.fileInputRef)

            if (fileInputRef.files.length === 0) {
                return
            }

            const videoFormData = new FormData()
            videoFormData.append('file', fileInputRef.files[0])

            this.$emit('uploadStarted')


        },
        onUploadProgress(event) {
            const progress = Math.round((event.loaded * 100) / event.total)
            this.$emit('uploadProgress', progress)
        },

    },
})
</script>
