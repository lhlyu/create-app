import { AxiosRequestConfig } from 'axios'

export interface Result<T = any> {
    code: number
    msg: string
    data: T
}

declare module 'axios' {
    export interface AxiosInstance {
        request<T = any, R = Result<T>>(config: AxiosRequestConfig): Promise<R>
        get<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
        delete<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
        head<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
        options<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
        post<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
        put<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
        patch<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
    }
}
