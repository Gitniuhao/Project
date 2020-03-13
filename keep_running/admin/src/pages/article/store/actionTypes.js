//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const SET_PAGE = 'article@set_page'
export const PAGE_REQUEST_START = "article@page_request_start"
export const PAGE_REQUEST_DONE = "article@page_request_done"
export const SET_NAME = 'article@set_name'

export const SET_MAIN_IMAGE = "article@set_main_image"
export const SET_CONTENT = "article@set_content"

export const SET_MAIN_IMAGE_ERR ="product@set_main_image_err"

export const SET_ARTICLE_DETAIL = 'article@set_article_detail'
