import {Message} from 'element-ui'
export default (data)=>{
    console.log(data);
    //onError 拦截错误的方法 回调函数有err的 err有个属性response（响应）凡是err都有response
    data.$axios.onError(err=>{
        // console.log(err.response);
        const {statusCode,message}=err.response.data
        if(statusCode===400){
            Message.error(message)
        }
        // 401是token错误或者是过期 403是接口没有token
        if(statusCode===401 ||statusCode===403){
           
            // 第一个参数是状态码
            //第二个参数是跳转路径
            // 第三个参数是把当前页面带参数传过去
            data.redirect(200,"/user/login",{
                returnUrl: data.route.fullPath
            })
        }
    })
}