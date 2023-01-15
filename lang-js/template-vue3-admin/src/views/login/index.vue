<template>
    <main>
        <section class="box">
            <div class="title">
                <h3>登录/注册</h3>
            </div>
            <div class="input">
                <input type="text" placeholder="账号" maxlength="16" v-model="account" />
                <button class="clear" @click="clearAccount" v-show="account.length">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="input">
                <input type="password" placeholder="密码" maxlength="16" v-model="password" />
                <button class="clear" @click="clearPassword" v-show="password.length">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="btn">
                <button @click="login">登录</button>
                <button @click="signup">注册</button>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onBeforeMount, ref, StyleValue } from 'vue'
import useClientHeight from '../../hooks/useClientHeight'

const router = useRouter()

const { clientHeight } = useClientHeight()

const account = ref('')
const password = ref('')

const login = () => {
    setTimeout(() => {
        router.replace('dashboard')
    }, 200)
}

const signup = () => {
    setTimeout(() => {
        router.replace('dashboard')
    }, 200)
}

const clearAccount = () => {
    account.value = ''
}

const clearPassword = () => {
    password.value = ''
}

const bg = ref<string>('none')

onBeforeMount(async () => {
    const src = '/bg.jpg'
    const img = await new Promise<string>((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
            resolve(`url('${src}')`)
        }
        img.onerror = () => {
            resolve('none')
        }
    })
    bg.value = img
})
</script>

<style lang="scss" scoped>
main {
    position: relative;
    width: 100vw;
    height: v-bind(clientHeight);
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: v-bind(bg);
    background-size: cover;
    background-position: center;
    z-index: 1;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px) saturate(1.8);
        z-index: 2;
    }
    .box {
        position: relative;
        max-width: 360px;
        width: 94%;
        padding: 30px;
        box-sizing: border-box;
        text-align: center;
        z-index: 3;

        backdrop-filter: blur(14px);
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 12px;
        border: 1px solid rgba(209, 213, 219, 0.4);
        transform: scale(0);
        opacity: 0;
        animation: popup 0.4s linear forwards;

        .title {
            font-size: 20px;
            letter-spacing: 2px;
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

            .clear {
                position: absolute;
                outline: none;
                border: none;
                right: 16px;
                top: 8px;
                opacity: 0.9;
                border-radius: 100%;
                width: 24px;
                height: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                transition: background-color 0.2s linear;
                cursor: pointer;
                &:hover {
                    background-color: buttonface;
                }
            }
        }

        .btn {
            display: flex;
            flex-direction: row;

            button {
                position: relative;
                flex: 1;
                outline: none;
                padding: 5px 18px;
                height: 38px;
                box-sizing: border-box;
                font-weight: bolder;
                letter-spacing: 2px;
                border: 0;
                border-radius: 30px;
                overflow: hidden;
                background: white;
                transition: background-color 0.2s linear;
                cursor: pointer;
                &:hover {
                    background-color: buttonface;
                }
                &:first-child {
                    margin-right: 8px;
                }
                &:last-child {
                    margin-left: 8px;
                }
                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    border-radius: 50%;
                    pointer-events: none;
                    background-color: #c3c3c361;
                    transform: translate(-50%, -50%) scale(50);
                    padding: 50%;
                    opacity: 0;
                    transition: transform 2.25s, opacity 1s;
                }
                &:active::after {
                    transition: 0s;
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(0);
                }
            }
        }
    }
}

@keyframes popup {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
