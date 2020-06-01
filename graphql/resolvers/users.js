import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import { validateRegister, validateLoginInput } from "../../util/validators";
import User from "../../models/User";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

const usersResolvers = {
  Mutation: {
    /**
     *
     * @param _
     * @param username
     * @param password
     * @param confirmPassword
     * @param email
     * @returns {Promise<any>}
     */
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } }
    ) {
      const { valid, errors } = validateLoginInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // hash password
      password = await bcryptjs.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    /**
     *
     * @param _
     * @param username
     * @param password
     * @returns {Promise<{[p: string]: *}>}
     */
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcryptjs.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

export default usersResolvers;
