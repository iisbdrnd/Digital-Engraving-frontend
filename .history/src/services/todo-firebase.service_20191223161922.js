import firebase from '../data/base';

export const creatTodoList = (value) => {
    firebase.firestore().collection('todo').add({
        task: value,
        completed: false,
    })
}

export const deleteList = (taskId) => {
    return firebase.firestore().collection('todo').doc(taskId).delete();
}

export const updateTask = (value) => {
    firebase.firestore().collection('todo').doc(value.id).set({
        task: value.task,
        completed: value.completed
    })
}

export const markAllTask = (action) => {
    const db = firebase.firestore();
    db.collection('todo')
        .get()
        .then(snapshot => {
            snapshot
                .docs
                .forEach(doc => {
                    db.collection('todo').doc(doc.id).set({ task: doc.data().task, completed: action });
                });
        });
}
