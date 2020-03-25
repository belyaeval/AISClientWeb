new Vue({
    el: "#app",
    data: {
        items: [],
        newTodoText: "",
        isInvalid: false,
        editTodoText: "",
        isEdit: false
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
                isEdit: false
            });

            this.newTodoText = "";
        },

        editTodo: function (item) {
            item.isEdit = true;
            item.editTodoText = item.text;
        },

        saveTodo: function (item) {
            item.isEdit = false;

            if (item.editTodoText === "") {
                item.isInvalid = true;
                item.isEdit = true;
                return;
            }

            item.isInvalid = false;
            item.text = item.editTodoText;
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