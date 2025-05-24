import { User, UserCreateRequest } from "../types/types";


//CRUD Operations for User entity

import client from "../db/db";


//Get all users
export const getUsersServices = async():Promise<User[] | null> => {
    const query = `SELECT * FROM public."userTable"  ORDER BY "userId" DESC`;
    const result = await client.query(query);
    return result.rows;    
}

//Get user by ID
export const getUserByIdServices = async(userId: number):Promise<User | null> => {
    const query = `SELECT * FROM public."userTable" WHERE "userId" = $1`;
    const result = await client.query(query, [userId]);    
    return result.rows[0] || null;      
}

// Create a new user
export const createUserServices = async(user: UserCreateRequest):Promise<User | null> => {
    const query = `INSERT INTO public."userTable" ("fullName", "email", "password") 
                   VALUES ($1, $2, $3) RETURNING *`;
    const values = [user.fullName, user.email, user.password];
    const result = await client.query(query, values);
    return result.rows[0] || null;      
}

// Update an existing user
export const updateUserServices = async(userId: number, user: Partial<UserCreateRequest>):Promise<User | null> => {
    const query = `UPDATE public."userTable" 
                   SET "fullName" = $1, "email" = $2, "password" = $3 
                   WHERE "userId" = $4
                     RETURNING *`;
    const values = [user.fullName, user.email, user.password, userId];
    const result = await client.query(query, values);
    return result.rows[0] || null;
}

//Update an existing user using only the fields that are provided
// export const updateUserPartialServices = async(userId: number, user: Partial<UserCreateRequest>):Promise<User | null> => {
//     const fields = [];
//     const values = [];
//     let index = 1;

//     if (user.fullName) {
//         fields.push(`"fullName" = $${index++}`);
//         values.push(user.fullName);
//     }
//     if (user.email) {
//         fields.push(`"email" = $${index++}`);
//         values.push(user.email);
//     }
//     if (user.password) {
//         fields.push(`"password" = $${index++}`);
//         values.push(user.password);
//     }

//     if (fields.length === 0) {
//         return null; // No fields to update
//     }

//     values.push(userId); // Add userId as the last value
//     const query = `UPDATE public."userTable" SET ${fields.join(', ')} WHERE "userId" = $${index} RETURNING *`;
    
//     const result = await client.query(query, values);
//     return result.rows[0] || null;
// }


// Delete a user

export const deleteUserServices = async(userId: number):Promise<boolean> => {
    const query = `DELETE FROM public."userTable" WHERE "userId" = $1`;
    const result = await client.query(query, [userId]);
    return (result.rowCount ?? 0) > 0; // Returns true if a row was deleted
}