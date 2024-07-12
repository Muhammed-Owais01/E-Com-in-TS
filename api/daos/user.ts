import User from "../models/user";

class UserDAO {
    async getByName(username: string): Promise<User | null> {
        const user: User | null = await User.findOne({ where: { username: username } });
        return user;
    }

    async create(username: string, password: string): Promise<User | null> {
        const user: User | null = await User.create({
            username: username,
            password: password
        });
        return user;
    }

    async update(id: number | undefined, username: string | undefined, password: string | undefined): Promise<number> {
        const [affectedCount]: [number] = await User.update({
            username,
            password
        }, { where: { id: id } });
        return affectedCount;
    }

    async delete(id: number): Promise<number> {
        const count: number = await User.destroy({ where: { id: id }});
        return count;
    }
}

const UserDAOObj = new UserDAO;

export default UserDAOObj;