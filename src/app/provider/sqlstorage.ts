import { SQLite } from 'ionic-native';

export class Storage {
  db: SQLite;

  constructor() {
    this.db = new SQLite();
    this.db.openDatabase({
      name: 'happy.db',
      location: 'default'
    }).then(() => {
      this.db.executeSql('create table if not exists symptoms(label VARCHAR(200))',{}).then(() => {

      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  add(symptom) {
    this.db.openDatabase({
      name: 'happy.db',
      location: 'default'
    }).then(() => {
      this.db.executeSql('insert into symptoms(label) values (?)',[symptom.label]).then(() => {

      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  getAll() {
    this.db.openDatabase({
      name: 'happy.db',
      location: 'default'
    }).then(() => {
      this.db.executeSql('select * from symptoms',{}).then((data) => {
          console.log(data);
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }
}
