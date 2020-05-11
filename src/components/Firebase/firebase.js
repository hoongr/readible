import app from 'firebase/app';
import 'firebase/database';
 
const config = {
  apiKey: "AIzaSyBa7lzz-5jg0mITf7_tqVq1BX6kt8PbNnc",
  authDomain: "readible-5d94f.firebaseapp.com",
  databaseURL: "https://readible-5d94f.firebaseio.com",
  projectId: "readible-5d94f",
  storageBucket: "readible-5d94f.appspot.com",
  messagingSenderId: "249434583531",
  appId: "1:249434583531:web:fdd239ffbe2658ee9169ae"
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.database();
    this.articles = this.db.ref('articles');
  }

  // *** User API ***
 
  addArticle = () => this.articles.push();
  getArticles = () => this.articles.orderByKey();
}
 
export default Firebase;