//action的type即使组件内和reducer内不相同页不会报错，抽取出来重新赋值可以避免这种错误并且促会错会报错容易修改
export const LOGIN_REQUEST_START = 'adminLogin@login_reuqest_start'
export const LOGIN_REQUEST_DONE = 'adminLogin@login_reuqest_done'