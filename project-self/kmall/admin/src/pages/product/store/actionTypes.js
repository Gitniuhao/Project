//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const SET_LEVEL_CATEGORIES = "category@set_Level_Categories"
export const SET_PAGE = "category@set_page"
export const PAGE_REQUEST_START = "category@page_request_start"
export const PAGE_REQUEST_DONE = "category@page_request_done"

export const SET_MAIN_IMAGE = "product@set_main_image"
export const SET_IMAGES = "product@set_images"
export const SET_DETAIL = "product@set_detail"

export const SET_MAIN_IMAGE_ERR ="product@set_main_image_err"
export const SET_IMAGES_ERR ="product@set_images_err"

export const SET_PRODUCT_DETAIL ="product@set_product_detail"
