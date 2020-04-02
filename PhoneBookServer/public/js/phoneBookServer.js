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
        isExist: false,
        term: "",
        checkedContacts: [],
        titleChecked: false,
        isChecked: false
    },

    created: function () {
        this.getContacts();
    },

    methods: {
        getContacts: function () {
            var self = this;

            this.service.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Ошибка! Контакты не загружены")
            });
        },

        addContact: function () {
            var self = this;

            if (self.newSurname === "" || self.newName === "" || self.newPhoneNumber === "") {
                self.isInvalidData = true;

                return;
            }

            self.isInvalidData = false;

            this.service.addContact({
                surname: this.newSurname,
                name: this.newName,
                phoneNumber: this.newPhoneNumber
            }).done(function (response) {
                if (!response.success) {
                    self.isExist = true;
                    return;
                }

                self.isExist = false;

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

            this.service.deleteCheckedContacts(self.checkedContacts).done(
                self.getContacts()
            ).fail(function () {
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
            }

            self.isChecked = !self.isChecked;
        },

        updateCheckAll: function () {
            var self = this;

            self.isChecked = self.checkedContacts.length !== 0;

            return self.titleChecked = self.contacts.length === self.checkedContacts.length;
        },

        clearFilter: function () {
            var self = this;

            self.term = "";

            return self.getContacts();
        }
    }
});