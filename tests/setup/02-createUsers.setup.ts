import {test as setup} from "@playwright/test";
import AuthService from "../../utils/api/services/AuthService";
import UsersService from "../../utils/api/services/UsersService"
import { testUser1 } from "../../test-data/validUsers";
import { testUser2 } from "../../test-data/validUsers";

let usersService: UsersService;
let authService: AuthService;

setup.describe('Create test users via API', () =>{

    setup.beforeEach(({request}) =>{
    usersService = new UsersService(request); 
    authService = new AuthService(request);
    })
    

    setup('Create test user testUser1', async () =>{
       const response = await usersService.createUser(testUser1.name, testUser1.last, testUser1.email, testUser1.password, testUser1.password); 
   })
    setup('Create test user testUser2', async () =>{
       const response = await usersService.createUser(testUser2.name, testUser2.last, testUser2.email, testUser2.password, testUser2.password); 
   })
})