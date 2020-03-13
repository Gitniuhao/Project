//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const SET_PAGE = 'admin@set_page'
export const SET_NAME = 'admin@set_name'
export const PAGE_REQUEST_START = "admin@page_request_start"
export const PAGE_REQUEST_DONE = "admin@page_request_done"
