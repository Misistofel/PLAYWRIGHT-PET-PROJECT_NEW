import { APIRequestContext, expect } from "@playwright/test";


export default class UserService {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async deleteUser(sid: string) {
        const response = await this.request.delete('/api/users', {
            headers: {
                'cookie': sid
            }
        })

        expect(response.status()).toBe(200);
        return response;

    }

    async createUser(name: string, lastName: string, email: string, password: string, rePassword: string) {
        const response = await this.request.post('/api/auth/signup', {
            data: {
                name,
                lastName,
                email,
                password,
                repeatPassword: rePassword   
            }
        });

        //console.log(await response.json());
        
        expect(response.status()).toBe(201);
        return response;

    }



}