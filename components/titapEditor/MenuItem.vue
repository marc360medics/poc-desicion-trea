<template>
    <button
        type="button"
        class="menu-item"
        :class="{ 'is-active': isActive ? isActive(): null, 'has-arrow': hasArrow, 'is-font-size': icon === 'custom' }"
        :title="title"
        @click="action"
    >
        <svg v-if="!icon.includes('custom')" class="remix">
            <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
        </svg>
        <svg v-if="hasArrow && !icon.includes('custom')" class="remix">
            <use :xlink:href="`${remixiconUrl}#ri-arrow-drop-down-fill`" />
        </svg>

        <div v-if="icon.includes('custom')" style="width: 100%">
            <p >{{ size }}</p>
        </div>
    </button>
</template>

<script>
import Vue from 'vue'
// @ts-ignore no ts file definition
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

export default Vue.extend({
    props: {
        icon: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        action: {
            type: Function,
            required: true,
        },

        isActive: {
            type: Function,
            default: null,
        },
        hasArrow: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: 15,
        },
    },

    data() {
        return {
            remixiconUrl,
        }
    },
})
</script>

<style scoped lang="scss">
.menu-item {
    width: 1.5rem;
    height: 1.75rem;
    color: #404040;
    border: none;
    background-color: transparent;
    border-radius: 0.2rem;
    padding: 0.25rem;
    margin-right: 0.25rem;
    display: flex;
    align-items: center;

    svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }

    &:hover,
    &.is-active {
        color: #fafafa;
        background-color: #404040;
      }

    &.has-arrow {
        width: 2.5rem;
    }

    &.is-font-size {
        width: 100%;
        margin-right: 0;
    }
}
</style>
