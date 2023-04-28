function refresh_table () {

    const refresh = (data, error) => {
        const div = document.getElementById('users-list');
        if(data === null || data.length === 0) {
            if (error) {
                div.innerHTML = error;
            } else {
                div.innerHTML = 'No users found';
            }
        } else {
            const table = document.createElement('table');
            table.setAttribute('class', 'table table-striped');
            const header = table.createTHead();
            let row = header.insertRow(0);
            let id = row.insertCell(0);
            let firstName = row.insertCell(1);
            let lastName = row.insertCell(2);
            id.innerHTML = 'ID';
            firstName.innerHTML = 'First name';
            lastName.innerHTML = 'Last name';

            const { data: accounts } = data;
            for(let i = 0; i < accounts.length; i++) {
                row = table.insertRow(i + 1);
                id = row.insertCell(0);
                firstName = row.insertCell(1);
                lastName = row.insertCell(2);
                id.innerHTML = accounts[i][0];
                firstName.innerHTML = accounts[i][1];
                lastName.innerHTML = accounts[i][2];
            }
            div.innerHTML = '';
            div.appendChild(table);
        }
    }

    fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/accounts`)
        .catch(error => refresh(null, error))
        .then(response => {
            if(response.status != 200) {
                refresh(null, `Error ${response.status}: ${response.statusText}`);
            } else {
                return response.json()
            }
        })
        .then(data => refresh(data, null));
}

function submit_form (event) {
    event.preventDefault();
    const form = document.getElementById('myform');
    const data = {
        firstName: form.elements['firstName'].value,
        lastName: form.elements['lastName'].value
    };

    fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/accounts`, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(data) })
        .catch(error => console.log(error))
        .then(response => {
            console.log(response);
            if(response.status !== 200) {
                alert(`Error ${response.status}: ${response.statusText}`);
            } else {
                refresh_table();
            }
        });
}

const form = document.getElementById('myform');
form.addEventListener('submit', submit_form);

refresh_table();
setTimeout(refresh_table, 10000);