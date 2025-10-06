<script lang="ts" setup>
defineOptions({inheritAttrs: false});

interface InputProps {
    modelValue: string;
    placeholder?: string;
    name: string;
    disabled?: boolean;
    readonly?: boolean;
    autocomplete?: string;
}

defineProps<InputProps>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'input' | 'change', value: string, ev: Event): void;
}>();

function onInput(e: Event): void {
    const target = e.target as HTMLInputElement;

    emit('update:modelValue', target.value);
    emit('input', target.value, e);
}

function onChange(e: Event): void {
    const target = e.target as HTMLInputElement;

    emit('update:modelValue', target.value);
    emit('change', target.value, e);
}
</script>

<template>
    <label
        :class="$style.UiInput"
        v-bind="$attrs"
    >
        <input
            :class="$style.control"
            :autocomplete="autocomplete"
            :disabled="disabled"
            :name="name"
            :placeholder="placeholder"
            :readonly="readonly"
            :value="modelValue"
            type="text"
            @change="onChange"
            @input="onInput"
        >
    </label>
</template>

<style lang="scss" module>
.UiInput {
    position: relative;
    display: inline-block;
}

.control {
    appearance: none;
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid $dark-600;
    border-radius: 6px;
    background-color: $white;
    color: $dark;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        border-color: $accent;
        box-shadow: 0 0 0 3px rgba($accent, 0.15);
    }

    &::placeholder {
        color: $dark-500;
    }

    &:disabled {
        background-color: $white;
        color: $dark-500;
        cursor: not-allowed;
    }
}
</style>
