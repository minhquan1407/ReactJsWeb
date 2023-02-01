
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys';



 export const register = createAsyncThunk(
    'user/register',
    async (payload) => {// nếu mún dispath 1 cái action khác thì dùng thunkAPI kh thôi
    //payload ở đây là cái tham số khi mà gọi thằng register
    // khi gọi action register nó sẽ truyền vào cái tham số, thì tham số này là payload
      
    //call API to register 
        const data = await userApi.register(payload);// payload đây chính là thông tin mà user nhập vào cái form

    //save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt); //StorageKeys là tên object còn TOKEN là hằng số
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    //return user data
 

    return data.user;//data.user chính là cái object
    }
  );
  export const login = createAsyncThunk(
    'user/login',
    async (payload) => {// nếu mún dispath 1 cái action khác thì dùng thunkAPI kh thôi
    //payload ở đây là cái tham số khi mà gọi thằng register
    // khi gọi action register nó sẽ truyền vào cái tham số, thì tham số này là payload
      
    //call API to register 
        const data = await userApi.login(payload);// payload đây chính là thông tin mà user nhập vào cái form

    //save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt); //StorageKeys là tên object còn TOKEN là hằng số
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    //return user data
 

    return data.user;//data.user chính là cái object
    }
  );

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        setting: {},
    },
    reducers: {
        logout(state) {
            localStorage.removeItem(StorageKeys.USER);
            localStorage.removeItem(StorageKeys.TOKEN);

            state.current = {};
        }
    },
    // extraReducers có nghĩa là khi action, thunk Register ở trên mà nó thành công, thì mình cần phải
    // cập nhập cái dữ liệu vào cái Redux State của mình, thì lúc này mình sử dụng extraReducers
     extraReducers: {
        //   'user/register/fulfilled': () => {},// thằng này y thằng ở dưới, nó cũng chỉ là cái chuỗi thôi
        [register.fulfilled]: (state, action) => {
             state.current = action.payload;// action.payload chính là cái thằng mà bạn return ở trên
         },
         [login.fulfilled]: (state, action) => {
            state.current = action.payload;// action.payload chính là cái thằng mà bạn return ở trên
        },
     },// ở dạng extraReducers cho những dạng action type do bạn tự định nghĩa lấy thì nó mới biết là action type gì
    // còn dạng reducer kh cần định nghĩa bạn chỉ cần gọi hàm thì nó sẽ tự charac ra action type tương ứng
});

const { actions, reducer } = userSlice;
export const {logout} = actions;
export default reducer; // default export