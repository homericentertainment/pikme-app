 import { httpService } from "./http.service"
 
 export const service = {
    lala
}

async function lala(){
    console.log('kkk')
    const la = await httpService.get('https://yesno.wtf/api')
    console.log(la)
    return 7
}