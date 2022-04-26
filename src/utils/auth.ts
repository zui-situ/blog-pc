import Cookies from 'js-cookie'

const TokenKey = 'pcblog-token'

// type paramsMapType = {
//   token: string;
// };

// 获取token
export function getToken() {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return Cookies.get(TokenKey)
}

// 设置token以及过期时间（cookies、sessionStorage各一份）
// 后端需要将用户信息和token以及过期时间都返回给前端，过期时间主要用于刷新token
export function setToken(data: any) {
  const { token } = data
  // 提取关键信息进行存储
  // const paramsMap: paramsMapType = {
  //   token
  // };
  // const dataString = JSON.stringify(paramsMap);
  Cookies.set(TokenKey, token)
}

// 删除token
export function removeToken() {
  Cookies.remove(TokenKey)
}
