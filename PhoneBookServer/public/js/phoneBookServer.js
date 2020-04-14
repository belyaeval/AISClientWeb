function PhoneBookService() {
    function post(url, data) {
        return $.post({
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data)
        });
    }

    this.getContacts = function (term) {
        return $.get("/getContacts", {
            term: term
        });
    };

    this.addContact = function (contact) {
        return post("/addContact", {request: contact});
    };

    this.deleteContact = function (id) {
        return post("/deleteContact", {id: id});
    };

    this.deleteCheckedContacts = function (data) {
        return post("/deleteCheckedContacts", {data: data});
    }
}

new Vue({
    el: "#app",
    data: {
        service: new PhoneBookService(),
        contacts: [],
        newSurname: "",
        newName: "",
        newPhoneNumber: "",
        isInvalidData: false,
        isInvalidSurname: false,
        isInvalidName: false,
        isInvalidPhoneNumber: false,
        isNotNumber: false,
        isExist: false,
        term: "",
        checkedContacts: [],
        titleChecked: false,
        isEmpty: false,
        isChecked: false
    },

    created: function () {
        this.getContacts();
    },

    methods: {
        getContacts: function () {
            var self = this;
            var text = self.term.toLowerCase();

            self.checkedContacts = self.checkedContacts.filter(function (e) {
                return text.length === 0 || e.surname.toLowerCase().indexOf(text) >= 0 || e.name.toLowerCase().indexOf(text) >= 0 || e.phoneNumber.toLowerCase().indexOf(text) >= 0;
            });

            this.service.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;

                if (contacts.length === 0) {
                    self.isChecked = false;
                    self.isEmpty = true;
                    self.titleChecked = false;
                } else {
                    self.isEmpty = false;
                }
            }).fail(function () {
                alert("Ошибка! Контакты не загружены")
            });
        },

        addContact: function () {
            var self = this;

            if (self.newSurname === "" || self.newName === "" || self.newPhoneNumber === "") {
                self.isInvalidData = true;
                self.isInvalidSurname = true;
                self.isInvalidName = true;
                self.isInvalidPhoneNumber = true;

                if (self.newSurname !== "") {
                    self.isInvalidSurname = false;
                }

                if (self.newName !== "") {
                    self.isInvalidName = false;
                }

                if (self.newPhoneNumber !== "") {
                    self.isInvalidPhoneNumber = false;
                }

                return;
            }

            self.isInvalidSurname = false;
            self.isInvalidName = false;
            self.isInvalidData = false;

            if (isNaN(self.newPhoneNumber)) {
                self.isInvalidPhoneNumber = true;
                self.isNotNumber = true;
                return;
            }

            self.isNotNumber = false;

            self.isExist = self.contacts.some(function (contact) {
                return contact.phoneNumber === self.newPhoneNumber;
            }, this);

            self.isInvalidPhoneNumber = false;

            this.service.addContact({
                surname: this.newSurname,
                name: this.newName,
                phoneNumber: this.newPhoneNumber
            }).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.newSurname = "";
                self.newName = "";
                self.newPhoneNumber = "";

                self.getContacts();
            }).fail(function () {
                alert("Ошибка! Контакты не добавлены")
            });
        },

        deleteContact: function (contact) {
            var self = this;

            this.service.deleteContact(contact.id).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.getContacts();
            }).fail(function () {
                alert("Ошибка! Контакт не удален")
            });
        },

        deleteCheckedContacts: function () {
            var self = this;

            this.service.deleteCheckedContacts(self.checkedContacts).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.getContacts()
            }).fail(function () {
                alert("Ошибка! Контакты не удалены")
            });

            self.checkedContacts = [];
            self.titleChecked = false;
            self.isChecked = false;
        },

        checkAll: function () {
            var self = this;

            self.titleChecked = !self.titleChecked;
            self.checkedContacts = [];

            if (self.titleChecked) {
                self.checkedContacts = self.contacts.slice(0);
                self.isChecked = true;
            } else {
                self.isChecked = false;
            }
        },

        updateCheckAll: function () {
            var self = this;

            self.isChecked = self.checkedContacts.length !== 0;

            if (self.contacts.length !== self.checkedContacts.length) {
                return self.titleChecked = false;
            }

            return self.titleChecked = true;
        },

        clearFilter: function () {
            var self = this;

            self.term = "";

            return self.getContacts();
        }
    }
});