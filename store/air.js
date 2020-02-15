export const state=()=>{
    return {
        history:[]
    }
}
export  const mutations={
    //把数据存放在history
    setHistory(state,data){
       state.history.push(data)
    }
}