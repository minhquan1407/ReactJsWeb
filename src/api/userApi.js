import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = '/auth/local/register'; // /products là lấy đc tất cả
        return axiosClient.post(url, data); //object cần thì thêm kh thôi 
        //post gửi thông tin tới sever thông qua các biểu mẫu http( đăng kí chả hạn..)
    },  
    login(data) {
        const url = '/auth/local'; // /products là lấy đc tất cả
        return axiosClient.post(url, data); //object cần thì thêm kh thôi 
        //post gửi thông tin tới sever thông qua các biểu mẫu http( đăng kí chả hạn..)
    },  
};

export default userApi;