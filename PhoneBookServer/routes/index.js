var express = require('express');
var router = express.Router();

var contacts = [];
var newId = 1;

router.get("/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    var filteredContacts = term.length === 0 ? contacts : contacts.filter(function (c) {
        return c.surname.toUpperCase().indexOf(term) >= 0 || c.name.toUpperCase().indexOf(term) >= 0 || c.phoneNumber.toUpperCase().indexOf(term) >= 0;
    });

    res.send(filteredContacts);
});

router.post("/deleteContact", function (req, res) {
    var id = req.body.id;

    var contact = contacts.find(function (c) {
        return c.id === id;
    });

    if (contact === undefined) {
        res.send({
            success: false,
            message: "Контакт с id = " + id + " не найден"
        });

        return;
    }

    contacts = contacts.filter(function (c) {
        return c.id !== id;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/addContact", function (req, res) {
    var contact = req.body.request;

    var isInvalidSurname = contact.surname === "";
    var isInvalidName = contact.name === "";
    var isInvalidPhoneNumber = contact.phoneNumber === "";
    var isNotNumber = isNaN(contact.phoneNumber);

    if (isInvalidSurname) {
        res.send({
            success: false,
            message: "Не заполнено поле \"Фамилия\""
        });

        return;
    }

    if (isInvalidName) {
        res.send({
            success: false,
            message: "Не заполнено поле \"Имя\""
        });

        return;
    }

    if (isInvalidPhoneNumber) {
        res.send({
            success: false,
            message: "Не заполнено поле \"Номер телефона\""
        });

        return;
    }

    if (isNotNumber) {
        res.send({
            success: false,
            message: "Поле \"Номер телефона\" должно быть числовым"
        });

        return;
    }

    var hasContactWithPhone = contacts.some(function (c) {
        return c.phoneNumber.toUpperCase() === contact.phoneNumber.toUpperCase();
    });

    if (hasContactWithPhone) {
        res.send({
            hasContact: true
        });

        return;
    }

    contact.id = newId;
    newId++;
    contacts.push(contact);

    res.send({
        hasContact: false,
        success: true,
        message: null
    });
});

router.post("/deleteCheckedContacts", function (req, res) {
    var checkedContacts = req.body.data;
    var remainingContacts = contacts.length - checkedContacts.length;

    contacts = contacts.filter(function (contact) {
        return checkedContacts.every(function (checkedContact) {
            return contact.id !== checkedContact.id;
        });
    });

    var isDeleted = remainingContacts === contacts.length;

    if (!isDeleted) {
        res.send({
            success: false,
            message: "Выбранные контакты не удалены"
        });
    }

    res.send({
        success: true,
        message: null
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
