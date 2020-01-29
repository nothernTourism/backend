import * as bcrypt from 'bcrypt';

export interface Auth{
    id?:number,
    userName:string,
    password:string,
    // salt:string,

    // async validatePassword(password:string):Promise<boolean>{
    //     const hash = await bcrypt.hash(password,this.salt);
    //     return hash === this.password;
    // }
}