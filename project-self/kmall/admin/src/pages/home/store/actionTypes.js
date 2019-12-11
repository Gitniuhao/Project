//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const CHANG_ITEM = 'change_item'
export const ADD_ITEM = "add_item"
export const DEL_ITEM = "del_item"
export const DATA_LOAD = "data-load"