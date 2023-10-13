import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Admin = sequelize.define("admin", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false},
  phone_number: { type: DataTypes.STRING, defaultValue: "" },
  birthdate: { type: DataTypes.STRING, defaultValue: "" },
  image_url: { type: DataTypes.STRING, defaultValue: "" },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// const Admin = sequelize.define("admin", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   fullname: { type: DataTypes.STRING },
//   email: { type: DataTypes.STRING, allowNull: false, unique: true },
//   password: { type: DataTypes.STRING, 
              // set(value) {

              //   this.setDataValue("password", bcrypt.hashSync(value, 10))
              // },
              // allowNull: false
            // },
  // phone_number: { type: DataTypes.STRING, defaultValue: "" },
  // birthdate: { type: DataTypes.STRING, defaultValue: "" },
  // image_url: { type: DataTypes.STRING, 
                // set(value) {
                //   this.setDataValue("image_url", `https://robohash.org/${this.fullname}`)
                // },    
              // },
  // is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
// });


// sequelize.sync().then(() => {
//   console.log("admin has been initiated");
//   Admin.bulkCreate({
//       fullname: "test1",
//       email: "test1@mail.com",
//       password: process.env.ADMIN_PASSWORD
//   }).then((res) => {
//     console.log(res);
//   }).catch((err) => {
//     console.log("failed to load admin", err);
//   })
// })

// get() {
//   return `https://robohash.org/${this.fullname}`
// },       
// set(value) {
//   throw new Error('do not set image url value')
// }    

// await Admin.create(
//   {
//     fullname: process.env.FULLNAME,
//     email: process.env.MAIL,
//     password: process.env.ADMIN_PASSWORD,
//     image_url: process.env.IMG
//   });

// await Admin.findOrCreate({
//   where: {
//     fullname: process.env.ADMIN_FULLNAME,
//     email: process.env.ADMIN_MAIL,
//     password: process.env.ADMIN_PASSWORD,
//     image_url: process.env.ADMIN_IMG
//   }
// });

// await Admin.findOrCreate({
//   where: {
//     fullname: process.env.FULLNAME,
//     email: process.env.MAIL,
//     password: process.env.ADMIN_PASSWORD,
//     image_url: process.env.IMG
//   },
//   defaults: {
//     fullname: process.env.FULLNAME,
//     email: process.env.MAIL,
//     password: process.env.ADMIN_PASSWORD,
//     image_url: process.env.IMG
//   }
// })



export default Admin;
