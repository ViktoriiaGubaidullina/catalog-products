<script lang="ts" setup>
import type {SelectOption} from "~/types/ui";

interface SelectProps {
    modelValue: string | null;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    name: string;
}

const props = defineProps<SelectProps>();

const $style = useCssModule();
const classList = computed(() => [
    {
        [$style._empty]: props.modelValue === null,
    },
]);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
    (e: 'change', value: string | null, ev: Event): void;
}>();

const placeholderValue = '__placeholder__'

function onChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    const raw = target.value;

    if (raw === placeholderValue) {
        emit('update:modelValue', null);
        emit('change', null, e);
        return;
    }

    const matched = props.options.find(o => String(o.value) === raw);
    const newValue = matched ? matched.value : raw;

    emit('update:modelValue', newValue);
    emit('change', newValue, e);
}
</script>

<template>
    <label :class="$style.UiSelect">
        <select
            :disabled="disabled"
            :name="name"
            :value="modelValue !== null ? String(modelValue) : placeholderValue"
            :class="[$style.control, classList]"
            @change="onChange"
        >
            <option
                v-if="placeholder"
                :selected="modelValue === null"
                :value="placeholderValue"
                disabled
                hidden
            >
                {{ placeholder }}
            </option>

            <option
                v-for="opt in options"
                :key="String(opt.value)"
                :value="String(opt.value)"
            >
                {{ opt.label }}
            </option>
        </select>

        <span aria-hidden="true" :class="$style.icon">▾</span>
    </label>
</template>

<style lang="scss" module>
.UiSelect {
    position: relative;
    display: inline-block;
}

.control {
    appearance: none;
    padding: 8px 32px 8px 12px;
    font-size: 14px;
    border: 1px solid $dark-600;
    border-radius: 6px;
    background-color: $white;
    color: $dark;

    &._empty {
        color: $dark-500;
    }

    &:focus {
        border-color: $accent;
        box-shadow: 0 0 0 3px rgba($accent, 0.15);
    }

    &:disabled {
        background-color: $white;
        color: $dark-500;
    }
}

.icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: $dark-600;
}
</style>
