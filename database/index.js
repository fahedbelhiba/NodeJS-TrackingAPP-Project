import { connect } from "mongoose";

const mongoUri = "mongodb://localhost:27017/project_npm";

class Database {
  static connect() {
    return connect(mongoUri);
  }
}

export default Database;