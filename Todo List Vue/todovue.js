new Vue({
    el: "#app",
    data: {
        items: [],
        newTodoText: "",
        isInvalid: false,
        editTodoText: "",
        isEdit: false,
        itemId: 1
    },
    methods: {
        addTodo: function () {
            if (this.newTodoText === "") {
                this.isInvalid = true;
                return;
            }

            this.isInvalid = false;

            this.items.push({
                text: this.newTodoText,
                isEdit: false,
                id: this.itemId
            });

            this.newTodoText = "";
            this.itemId++;
        },

        editTodo: function (item) {
            item.isEdit = true;
            this.editTodoText = item.text;
        },

        saveTodo: function (item) {
            item.isEdit = false;

            if (this.editTodoText === "") {
                item.isInvalid = true;
                item.isEdit = true;
                return;
            }

            item.isInvalid = false;
            item.text = this.editTodoText;
        },

        cancelTodo: function (item) {
            item.isEdit = false;
            item.isInvalid = false;
        },

        deleteTodo: function (item) {
            this.items = this.items.filter(function (x) {
                return x !== item;
            });
        }
    }
});