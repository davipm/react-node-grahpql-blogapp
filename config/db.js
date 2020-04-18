import mongoose from 'mongoose';

class Database {
  async connectDatabase() {
    try {
      await mongoose.connect(`${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Database connected success');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Database();
