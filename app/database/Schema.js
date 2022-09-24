/* eslint-disable prettier/prettier */
import Realm from 'realm';

export const NOTE_SCHEMA = 'Note';

export const NoteSchema = {
  name: NOTE_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    body: 'string',
    date: 'string',
    favorite: 'bool',
    highlight: 'bool',
  },
};

const databaseOptions = {
  path: 'notes.realm',
  schema: [NoteSchema],
  schemaVersion: 0,
};

export const createNote = newNote =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(NOTE_SCHEMA, newNote);
          resolve(newNote);
        });
      })
      .catch(error => reject(error));
  });

export const updateNote = note =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingNote = realm.objectForPrimaryKey(NOTE_SCHEMA, note.id);
          updatingNote.title = note.title;
          updatingNote.body = note.body;
          updatingNote.date = note.date;
          updatingNote.favorite = note.favorite;
          updatingNote.highlight = note.highlight;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteNote = noteId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingNote = realm.objectForPrimaryKey(NOTE_SCHEMA, noteId);
          realm.delete(deletingNote);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteAllNotes = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allNotes = realm.objects(NOTE_SCHEMA);
          realm.delete(allNotes);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const getAllNotes = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allNotes = realm.objects(NOTE_SCHEMA);
          resolve(allNotes);
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOptions);
