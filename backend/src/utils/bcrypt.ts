import * as bcrypt from 'bcrypt';

export const genSalt = async () => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return salt;
};

export const verifyPassword = (rawPassword: string, hash: string) => {
  return bcrypt.compareSync(rawPassword, hash);
};
