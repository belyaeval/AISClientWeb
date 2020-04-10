new Vue({
    el: "#phonebook",
    data: {
        items: [],
        newSurname: "",
        newName: "",
        newPhoneNumber: "",
        isInvalidData: false,
        isInvalidSurname: false,
        isInvalidName: false,
        isInvalidPhoneNumber: false,
        isNotNumber: false,
        isExist: false,
        searchText: "",
        checkedItems: [],
        titleChecked: false,
        isChecked: false,
        isEmpty: false,
        newItemNumber: 1
    },

    computed: {
        filteredItems: function () {
            var text = this.searchText.toLowerCase();

            var filterItems = this.items.filter(function (e) {
                return text.length === 0 || e.surname.toLowerCase().indexOf(text) >= 0 || e.name.toLowerCase().indexOf(text) >= 0 || e.phoneNumber.toLowerCase().indexOf(text) >= 0;
            });

            this.checkedItems = this.checkedItems.filter(function (e) {
                return text.length === 0 || e.surname.toLowerCase().indexOf(text) >= 0 || e.name.toLowerCase().indexOf(text) >= 0 || e.phoneNumber.toLowerCase().indexOf(text) >= 0;
            });

            if (filterItems.length === 0) {
                this.isChecked = false;
                this.isEmpty = true;
                this.titleChecked = false;
            } else {
                this.isEmpty = false;
            }

            return filterItems;
        }
    },

    methods: {
        addItem: function () {
            if (this.newSurname === "" || this.newName === "" || this.newPhoneNumber === "") {
                this.isInvalidData = true;
                this.isInvalidSurname = true;
                this.isInvalidName = true;
                this.isInvalidPhoneNumber = true;

                if (this.newSurname !== "") {
                    this.isInvalidSurname = false;
                }

                if (this.newName !== "") {
                    this.isInvalidName = false;
                }

                if (this.newPhoneNumber !== "") {
                    this.isInvalidPhoneNumber = false;
                }

                return;
            }

            this.isInvalidSurname = false;
            this.isInvalidName = false;
            this.isInvalidData = false;

            if (isNaN(this.newPhoneNumber)) {
                this.isInvalidPhoneNumber = true;
                this.isNotNumber = true;
                return;
            }

            this.isNotNumber = false;
            this.isInvalidPhoneNumber = false;


            this.isExist = this.items.some(function (item) {
                return item.phoneNumber === this.newPhoneNumber;
            }, this);

            if (this.isExist) {
                return;
            }

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
                this.checkedItems = this.items.slice(0);
                this.isChecked = true;
            } else {
                this.isChecked = false;
            }
        },

        updateCheckAll: function () {
            this.isChecked = this.checkedItems.length !== 0;

            if (this.items.length !== this.checkedItems.length) {
                return this.titleChecked = false;
            }

            return this.titleChecked = true;
        },

        clearFilter: function () {
            return this.searchText = "";
        }
    }
});