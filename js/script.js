/* Створіть програму для зберігання контактів 
*— ім'я,
*прізвище,
*телефон та 
*електронна адреса. 
*Зберігайте контакти в localStorage 
та дозволяйте користувачу додавати, 
видаляти та 
редагувати контакти. */

const inpName = document.querySelector("#inp-name");
const inpSur= document.querySelector("#inp-surName");
const inpPhone = document.querySelector("#inp-number");
const inpEmail = document.querySelector("#inp-mail");
const saveBtn = document.querySelector("#save-btn");
const contactsList = document.querySelector("#contactsList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let idCounter = 1;

function createContact(contact) {
    const item = document.createElement("li");
    const inpListName = document.createElement("input");
    const inpListSurname = document.createElement("input");
    const inpListPhone = document.createElement("input");
    const inpListEmail = document.createElement("input");

    inpListName.value = contact.name;
    inpListSurname.value = contact.surname;
    inpListPhone.value = contact.phone; 
    inpListEmail.value = contact.email;

    inpListName.setAttribute("readonly", '');
    inpListSurname.setAttribute("readonly", '');
    inpListPhone.setAttribute("readonly", '');
    inpListEmail.setAttribute("readonly", ' ');

    inpListName.classList.add("listInp");
    inpListSurname.classList.add("listInp");
    inpListPhone.classList.add("listInp");
    inpListEmail.classList.add("listInp");

    item.setAttribute("id", idCounter);

    item.appendChild(inpListName);
    item.appendChild(inpListSurname);
    item.appendChild(inpListPhone);
    item.appendChild(inpListEmail);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "Delete";
    item.appendChild(deleteBtn);
    const EditBtn = document.createElement("button");
    EditBtn.classList.add("editBtn");
    EditBtn.textContent = "Edit";
    item.appendChild(EditBtn);

    idCounter++;

    return item;
}

function renderContacts(contacts) {
    contactsList.textContent = "";
    contacts.forEach((contact) => {
        contactsList.append(createContact(contact));
    })
}

function addContact(e) {

    const userName = inpName.value;
    const userSurName = inpSur.value;
    const userPhone = inpPhone.value;
    const userEmail = inpEmail.value;

    if (!userName || !userSurName || !userPhone || !userEmail) {
        return;
    }

    const newContact = {
        name: userName,
        surname: userSurName,
        phone: userPhone,
        email: userEmail
    };

    contacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    contactsList.append(createContact(userName));
    inpName.value = '';
    inpSur.value = '';
    inpPhone.value = '';
    inpEmail.value = '';
}

function deleteContact(e) {
    console.log(4);
    if (e.target.tagName === 'BUTTON') {
        const contactText = e.target.parentElement.firstChild.value;
        console.log(contactText);
        contacts = contacts.filter((contact) => {
            const contactTextFromArray = contact.name;
            return contactTextFromArray  !== contactText;
        })
        localStorage.setItem("contacts", JSON.stringify(contacts));
        e.target.parentElement.remove();
    }
}

function editContact(e) {
    e.target.parentElement.children[0].removeAttribute("readonly");
    e.target.parentElement.children[1].removeAttribute("readonly");
    e.target.parentElement.children[2].removeAttribute("readonly");
    e.target.parentElement.children[3].removeAttribute("readonly");

    const li = e.target.parentElement;
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("saveBtn");
    li.appendChild(saveBtn);
}

function saveEditedContact(e) {
    const li = e.target.parentElement;

    const contactName = li.children[0];
    const contactSurName = li.children[1];
    const contactPhone = li.children[2];
    const contactEmail = li.children[3];

    contactName.setAttribute("readonly", '');
    contactSurName.setAttribute("readonly", '');
    contactPhone.setAttribute("readonly", '');
    contactEmail.setAttribute("readonly", '');

    e.target.remove();

    const contactNameValue = contactName.value.trim();
    const contactSurNameValue = contactSurName.value.trim();
    const contactPhoneValue = contactPhone.value.trim();
    const contactEmailValue = contactEmail.value.trim();

    if (!contactNameValue || !contactSurNameValue || !contactPhoneValue || !contactEmailValue) {
        return;
    }

    const index = [...contactsList.children].indexOf(li);

    if (index !== -1) {
        contacts[index] = {
            name: contactNameValue,
            surname: contactSurNameValue,
            phone: contactPhoneValue,
            email: contactEmailValue
        };

        localStorage.setItem("contacts", JSON.stringify(contacts));
    }
}



renderContacts(contacts);

saveBtn.addEventListener("click", () => {
    addContact()
});
contactsList.addEventListener("click", (e) => {
    if (e.target.classList.value == "deleteBtn") {
        deleteContact(e);
    } else if(e.target.classList.value == "editBtn") {
        editContact(e);
    } else if (e.target.classList.value == "saveBtn") {
        saveEditedContact(e);
    }
});