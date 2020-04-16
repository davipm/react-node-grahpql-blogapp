import mongoose from 'mongoose';

class Database {
  async connectDatabase() {
    try {
      await mongoose.connect(`${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Database();
