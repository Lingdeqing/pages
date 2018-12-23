import defaultInterfaces from './interfaces';

const STORAGE_KEY = 'ifa_data';

export function getParamValues(interfaces){
    const values = {};
    Object.keys(interfaces).forEach(key => {
        const params = interfaces[key].params;
        Object.keys(params).forEach(name => {
            const value = params[name];
            if(value){
                if(!values[name]) values[name] = [];
                if(!values[name].includes(value)){
                    values[name].push(value);
                }
            }
        })
    })
    return values;
}
export function getTestPageData(){
    const storage = localStorage.getItem(STORAGE_KEY);
    const defaultData = {
        testInterfaceName: Object.keys(defaultInterfaces)[0] || '',
        testResult: '',
        httpMethods: ['GET', 'POST'],
        baseUrls: [... new Set(Object.values(defaultInterfaces).map(i => i.baseUrl))],
        paramValues: getParamValues(defaultInterfaces),
        interfaces: defaultInterfaces,
    };
    const data = storage ? JSON.parse(storage) : defaultData;
    return data;
}

export function setTestPageData(data){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}
