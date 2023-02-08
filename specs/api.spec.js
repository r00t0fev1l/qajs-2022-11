import axios from "axios";
import {jest, expect} from "@jest/globals";


const BASE_URL = 'https://bookstore.demoqa.com';
const ACCOUNT_USER = '/Account/v1/User';
const GENERATE_TOKEN = '/Account/v1/GenerateToken';

const USER_NAME = "john_doe" + Math.floor(Math.random()* 10000)
const userCreds = {
    "userName": USER_NAME,
    "password": "Qwerty11!"
}
const userCredsError = {
    "userName": USER_NAME,
    "password": "Qwerty"
}

const USER_CREATE_ALREADY_EXISTS_CODE = "1204";
const USER_CREATE_PASSWORD_ERROR_CODE = "1300";

const createUser = async (data) => {
    const config = {
        method: 'post',
        proxy: false,
        url: BASE_URL + ACCOUNT_USER,
        data,
    }

    let response;
    try {
        const res = await axios(config);
        response = res.data;
        //console.log(response);
    } catch(error) {
        //console.log( error?.response?.data);
        response = error?.response?.data;
    }

    return response
};

const createToken = async (data) => {
    const config = {
        method: 'post',
        proxy: false,
        url: BASE_URL + GENERATE_TOKEN,
        data
    }

    let response;
    try {
        const res = await axios(config);
        response = res.data;
        //console.log(res);
    } catch(error) {
        //console.log(error);
        response = error?.response?.data;
    }

    return response
};


describe("/Account/v1/User", () => {
    test ('success',async () => {
        const data = await createUser(userCreds);

        expect(data?.userID?.length > 0).toBe(true);
    });

    test ('already exist',async () => {
        const data = await createUser(userCreds);

        expect(data.code).toBe(USER_CREATE_ALREADY_EXISTS_CODE);
    });

    test ('password error', async () => {
        const data = await createUser(userCredsError);

        expect(data.code).toBe(USER_CREATE_PASSWORD_ERROR_CODE);
    });
});

describe("/Account/v1/GenerateToken", () => {

    test ('success', async () => {
        const data = await createToken(userCreds);
    
        expect(data?.token?.length > 0).toBe(true);
    });

    test ('fail', async () => {
        const data = await createToken(userCredsError);
    
        expect(data.token).toBeNull()
    });
})



