//NOTE: This script is only used to manually hash passwords that were
// manually created for the database. This should only be run if you want
// ALL passwords to be hashed in your database manually.
// If any passwords are already hashed, then it will re-hash them, rendering them useless. 


const bcrypt = require('bcrypt');
const { User } = require('../../models'); // adjust the path to your models

async function hashPasswords() {
  // Fetch all users
  const users = await User.findAll();

  // For each user
  for (let user of users) {
    // Hash their password
    const hashedPassword = await bcrypt.hash(user.user_password, 10);

    // Update their record with the hashed password
    await User.update({ user_password: hashedPassword }, {
      where: {
        id: user.id
      }
    });
  }

  console.log('All passwords have been hashed');
}

hashPasswords();
