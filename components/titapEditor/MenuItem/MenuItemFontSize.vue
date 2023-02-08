<template>
    <div class="relative">
        <transition name="fade">
            <div v-if="isFontSizeSelectorOpened" class="py-1 z-10 absolute top-8 w-10 bg-white rounded-sm shadow-lg border border-gray-300 justify-center items-center flex flex-col">
                <menu-item icon="custom" :size="9" title="xxsmal" :action="() => setFontSize('9px')"/>
                <menu-item icon="custom" :size="11" title="xsmal" :action="() => setFontSize('11px')"/>
                <menu-item icon="custom" :size="13" title="small" :action="() => setFontSize('13px')"/>
                <menu-item icon="custom" :size="15" title="medium" :action="() => setFontSize('15px')"/>
                <menu-item icon="custom" :size="17" title="large" :action="() => setFontSize('17px')"/>
                <menu-item icon="custom" :size="19" title="xlarge" :action="() => setFontSize('19px')"/>
                <menu-item icon="custom" :size="21" title="xxlarge" :action="() => setFontSize('21px')"/>
            </div>
        </transition>
        <div class="text-size-box" @click="toggleFontSizeSelector">
            <input  v-model="fontSize" type="text" placeholder="15" name="city" @blur="setFontSize(`${fontSize}px`)">
            <svg>
                <use :xlink:href="`${remixiconUrl}#ri-arrow-drop-down-fill`" />
            </svg>
        </div>
    </div>
</template>

<script >
import Vue from 'vue'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import MenuItem from '../MenuItem.vue'

export default Vue.extend({
    components: { MenuItem },
    props: {
        icon: {
            type: String,
        },
        sizeDisplayValue: {
            type: String,
        },
    },
    data() {
        const fontSize = this.sizeDisplayValue
        return {
            fontSize,
            remixiconUrl,
            isFontSizeSelectorOpened: false,
        }
    },
    watch: {
        sizeDisplayValue(newValue) {
            this.fontSize = newValue
        },
    },
    mounted() {
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close)
    },
    methods: {
        toggleFontSizeSelector() {
            this.isFontSizeSelectorOpened = !this.isFontSizeSelectorOpened
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.isFontSizeSelectorOpened = false
            }
        },
        setFontSize(fontSize) {
            this.fontSize = fontSize.substring(0, fontSize.length - 2)
            if (parseInt(this.fontSize, 10) <= 9) {
                this.fontSize = '9'
            }
            if (parseInt(this.fontSize, 10) >= 34) {
                this.fontSize = '34'
            }
            this.$emit('input', `${this.fontSize}px`)
            this.isFontSizeSelectorOpened = false
        },
    },
})
</script>

<style scoped lang="scss">

input {
    width: 40px;
    background-color: #fafafa;
    text-align: left;
    margin-left: -3px;
    border-radius: 3px;
    font-size: 12px;
    padding: 5px 10px 5px 5px;
    appearance: none;
    cursor: pointer;
}
svg {
    height: 15px;
    width: 15px;
    top: 6px;
    left: 18px;
    position: absolute;
}
input:focus {
    outline: none;
}
input:hover::placeholder {
    color: rgb(169, 169, 169);
}
.text-size-box {
    position: relative;
    border-radius: 3px;
    cursor: pointer;
}
.text-size-box:hover {
    fill: white;
    color: white;
    background-color: #404040;
    input {
        background: #404040;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;

}

</style>
