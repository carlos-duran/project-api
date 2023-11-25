import { hash } from "bcryptjs";
import { ObjectId } from "mongodb";
import { db } from "../core/db";
import { UserEntity } from "../schemas/entities/user";
import { CreateUser, PatchUser } from "../schemas/validators/user";

const Users = db.collection<UserEntity>("users");

export const getUsers = async () => {
	const users = await Users.find().toArray();
	return users;
};

export const getUser = async (id: string) => {
	const user = await Users.findOne({ _id: new ObjectId(id) });
	return user;
};

export const getUserByEmail = async (email: string) => {
	const user = await Users.findOne({ email });
	return user;
};

export const createUser = async (data: CreateUser) => {
	const user = {
		...data,
		_id: new ObjectId(),
		password: await hash(data.password, 10),
	};

	const result = await Users.insertOne(user);
	return result;
};

export const updateUser = async (id: string, data: PatchUser) => {
	const clone = structuredClone(data);

	if (clone.password) {
		clone.password = await hash(clone.password, 10);
	}

	const result = await Users.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: clone },
	);
	return result;
};

export const deleteUser = async (id: string) => {
	const result = await Users.deleteOne({ _id: new ObjectId(id) });
	return result;
};
