export const state=()=>{
    return {
        history:[]
    }
}
export  const mutations={
    //把数据存放在history
    setHistory(state,data){
        //把数据添加到前面
       state.history.unshift(data)
       //数据截取到5条
       state.history.length=5
    }
}