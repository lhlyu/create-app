import instance from './request'

interface Req {
    uid: string
    name: string
}

interface Resp {
    name: string
    age: number
}

export const ApiCreateSample = async (param: Req) => {
    return await instance.post<Resp>('/api/sample', param)
}
