const branchesUl = document.querySelector('#branches-list');
const form = document.querySelector('#form');
// display branches

function displayBranches(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    // append spans and closing div to li

     li.appendChild(name);
     li.appendChild(city)
    li.appendChild(cross);

    // append li to ul

    branchesUl.appendChild(li);


    // delete branch

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');

        db.collection('branches').doc(id).delete();
    })
}


// get data

// db.collection('branches').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         displayBranches(doc);
//     })
// });

// where and orderBy *.where('city', '==', 'Kigali').orderBy('name')*

// save data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('branches').add({
        name: form.name.value,
        city: form.city.value,
    });

    form.name.value = '';
    form.city.value = '';
})


// onSnapshot

db.collection('branches').onSnapshot(snapshot => {
    const changes = snapshot.docChanges();

    changes.forEach(change => {
        if(change.type == 'added') {
            displayBranches(change.doc);
        }else if(change.type == 'removed') {
            let liToBeRemoved = branchesUl.querySelector('[data-id=' +change.doc.id + ']');
            branchesUl.removeChild(liToBeRemoved);
        }
    })
})