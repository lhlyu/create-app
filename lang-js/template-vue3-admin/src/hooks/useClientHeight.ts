import { onMounted, onUnmounted, ref } from 'vue'

const useClientHeight = () => {
    const clientHeight = ref('0')

    const setHeight = () => {
        clientHeight.value = document.documentElement.clientHeight + 'px'
    }

    onMounted(() => {
        setHeight()
        window.addEventListener('resize', setHeight)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', setHeight)
    })

    return {
        clientHeight
    }
}

export default useClientHeight
