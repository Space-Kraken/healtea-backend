import models from "./../../models/index.js";

export const resolvers = {
  Mutation: {
    editData: async (_, { user, name, age, gender, address, tel }) => {
      const data = await models.UserData.findOne({ _id: user });
      if (data) {
        await models.UserData.findByIdAndUpdate(
          { _id: user },
          {
            name: name ? name : data.name,
            age: age ? age : data.age,
            gender: gender ? gender : data.gender,
            address: {
              state: address.state ? address.state : data.address.state,
              city: address.city ? address.city : data.address.city,
              street: address.street ? address.street : data.address.street,
              postalCode: address.postalCode
                ? address.postalCode
                : data.address.postalCode,
            },
            tel: tel ? tel : data.tel,
          }
        );
        return "Data updated successfully";
      }
      return "Cant found user data";
    },
  },
};
