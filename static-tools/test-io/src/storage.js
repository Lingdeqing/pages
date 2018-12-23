import defaultInterfaces from './interfaces';

const STORAGE_KEY = 'ifa_data';

export function getTestPageData(){
    const storage = localStorage.getItem(STORAGE_KEY);
    const defaultData = {
        testInterfaceName: Object.keys(defaultInterfaces)[0] || '',
        testResult: '',
        httpMethods: ['GET', 'POST'],
        baseUrls: [... new Set(Object.values(defaultInterfaces).map(i => i.baseUrl))],
        interfaces: defaultInterfaces,
    };
    const data = storage ? JSON.parse(storage) : defaultData;
    return data;
}

export function setTestPageData(data){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}
