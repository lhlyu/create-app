<template>
    <div>
        <h1>log</h1>
        <div class="input">
            <input type="text" maxlength="16" />
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
h1 {
    font-size: 30px;
}
.input {
    position: relative;
    overflow: hidden;
    margin: 20px 0;
    border: 1px solid #e5e7eb;
    border-radius: 30px;

    input {
        outline: none;
        border: 0;
        width: 100%;
        height: 38px;
        padding: 5px 18px;
        box-sizing: border-box;

        letter-spacing: 2px;
    }
}
</style>
