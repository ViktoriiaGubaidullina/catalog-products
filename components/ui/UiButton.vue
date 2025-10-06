<script setup lang="ts">
interface ButtonProps {
    size?: 'medium' | 'small',
    color?: 'primary' | 'secondary',
    active?: boolean;
    border?: boolean;
    equal?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
    size: 'medium',
    color: 'primary',
})

const $style = useCssModule();
const classList = computed(() => [
    {
        [$style[`_${props.size}`]]: props.size,
        [$style[`_${props.color}`]]: props.color,
        [$style._active]: props.active,
        [$style._border]: props.border,
        [$style._equal]: props.equal,
        [$style._disabled]: props.disabled,
        [$style._loading]: props.loading,
    },
]);
</script>

<template>
    <button
        :class="[$style.UiButton, classList]"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<style module lang="scss">
.UiButton {
    border: 1px solid;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    transition: all $default-transition;
    line-height: 1;

    /* Sizes */
    &._medium {
        height: calc(5.2rem - 1px);
        padding: 1.6rem 2.8rem;
        border-radius: 1.4rem;
        font-size: 2rem;

        &._equal {
            width: calc(5.2rem - 1px);
        }
    }

    &._small {
        height: calc(4.4rem - 1px);
        padding: 1.4rem 2.6rem;
        border-radius: 1.2rem;
        font-size: 1.6rem;

        &._equal {
            width: calc(4.4rem - 1px);
        }
    }
    /* End Sizes */

    /* Colors */
    &._primary {
        background-color: $dark;
        border-color: $dark;
        color: $white;
    }

    &._secondary {
        background-color: $dark-200;
        border-color: $dark-200;
        color: $dark;

        &:hover {
            background-color: $dark-400;
            border-color: $dark-400;
        }

        &:active,
        &._active {
            background-color: $dark;
            border-color: $dark;
            color: $white;
        }

        &._border {
            background-color: white;
            color: $dark-700;

            &:hover {
                background-color: $dark-400;
                border-color: $dark-400;
            }

            &:active,
            &._active {
                color: $white;
                background-color: $dark;
                border-color: $dark;
            }
        }
    }
    /* End Colors */

    &._disabled {
        opacity: 0.6;
        pointer-events: none;
        cursor: not-allowed;
    }

    &._loading {
        pointer-events: none;
        cursor: wait;
    }

    &._equal {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
