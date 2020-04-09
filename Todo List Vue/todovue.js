new Vue({
    el: "#app",
    data: {
        items: [],
        newTodoText: "",
        isInvalid: false,
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
            item.newTodoText = item.text;
        },

        saveTodo: function (item) {
            item.isEdit = false;

            if (item.text === "") {
                item.isInvalid = true;
                item.isEdit = true;
                return;
            }

            item.isInvalid = false;
            item.newTodoText = item.text;
        },

        cancelTodo: function (item) {
            item.isEdit = false;
            item.isInvalid = false;
            item.text = item.newTodoText;
        },

        deleteTodo: function (item) {
            this.items = this.items.filter(function (x) {
                return x !== item;
            });
        }
    }
});