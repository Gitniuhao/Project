//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const SET_LEVEL_CATEGORIES = "category@set_Level_Categories"
export const SET_PAGE = "category@set_page"
export const PAGE_REQUEST_START = "category@page_request_start"
export const PAGE_REQUEST_DONE = "category@page_request_done"
