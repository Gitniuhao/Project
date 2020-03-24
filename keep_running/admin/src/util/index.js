export const saveName = (name)=>{
	window.localStorage.setItem('name',name)
}
export const getName = ()=>{
	return window.localStorage.getItem('name')
}
export const removeName = ()=>{
	return window.localStorage.removeItem('name')
}
