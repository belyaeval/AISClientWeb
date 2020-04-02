new Vue({
    el: "#phonebook",
    data: {
        items: [],
        newSurname: "",
        newName: "",
        newPhoneNumber: "",
        isInvalidData: false,
        searchText: "",
        checkedItems: [],
        titleChecked: false,
        isExist: false,
        isChecked: false,
        newItemNumber: 1
    },

    computed: {
        filteredItems: function () {
            var text = this.searchText.toLowerCase();
            return this.items.filter(function (e) {
                return text.length === 0 || e.surname.toLowerCase().indexOf(text) >= 0 || e.name.toLowerCase().indexOf(text) >= 0 || e.phoneNumber.toLowerCase().indexOf(text) >= 0;
            });
        }
    },

    methods: {
        addItem: function () {
            if (this.newSurname === "" || this.newName === "" || this.newPhoneNumber === "") {
                this.isInvalidData = true;

                return;
            }

            this.isExist = this.items.some(function (item) {
                return item.phoneNumber === this.newPhoneNumber;
            }, this);

            if (this.isExist) {
                return;
            }

            this.isExist = false;

            this.items.push({
                itemNumber: this.newItemNumber++,
                surname: this.newSurname,
                name: this.newName,
                phoneNumber: this.newPhoneNumber
            });

            this.newSurname = "";
            this.newName = "";
            this.newPhoneNumber = "";
        },

        deleteItem: function (item) {
            this.items = this.items.filter(function (x) {
                return x !== item;
            });
        },

        deleteCheckedItems: function () {
            if (this.items.length === this.checkedItems.length) {
                this.items = [];
            } else {
                this.items = this.items.filter(function (itemsItem) {
                    return this.checkedItems.every(function (checkedItem) {
                        return itemsItem !== checkedItem;
                    }, this);
                }, this);
            }

            this.checkedItems = [];
            this.titleChecked = false;
            this.isChecked = false;
        },

        checkAll: function () {
            this.titleChecked = !this.titleChecked;
            this.checkedItems = [];

            if (this.titleChecked) {
                this.checkedItems = this.items;
            }

            this.isChecked = !this.isChecked;
        },

        updateCheckAll: function () {
            this.isChecked = this.checkedItems.length !== 0;

            return this.titleChecked = this.items.length === this.checkedItems.length;
        },

        clearFilter: function () {
            return this.searchText = "";
        }
    }
});