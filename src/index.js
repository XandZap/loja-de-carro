(function (DOM) {
  "use strict";

  function app() {
    return {
      init: function init() {
        this.initCompany();
        this.initEvents();
        this.getCar();
      },

      initCompany: function initCompany() {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "../public/company.json", true);
        ajax.send();
        ajax.addEventListener("readystatechange", this.getCompany, false);
      },

      getCompany: function getCompany() {
        if (!app().isRequestOk.call(this)) {
          return;
        }
        app().addCompany.call(this);
      },

      isRequestOk: function isRequestOk() {
        return this.readyState === 4 && this.status === 200;
      },

      addCompany: function addCompany() {
        let data = JSON.parse(this.responseText);
        let $company = DOM('[data-js="company"]');
        let $phone = DOM('[data-js="phone"]');
        $company.get().textContent = data.name;
        $phone.get().textContent = data.phone;
      },

      initEvents: function initEvents() {
        DOM('[data-js="form-car"]').on("submit", this.handleSubmitForm);
        DOM('[data-js="clean-button"]').on("click", this.clearForm);
      },

      handleSubmitForm: function handleSubmitForm(event) {
        event.preventDefault();
        app().postCar();
      },

      getCar: function getCar() {
        let get = new XMLHttpRequest();
        get.open("GET", "http://localhost:3000/car");
        get.send();
        get.addEventListener(
          "readystatechange",
          () => {
            if (!app().isRequestOk.call(get)) {
              return;
            }
            app().addCar(JSON.parse(get.responseText));
          },
          false
        );
      },

      postCar: function postCar() {
        let post = new XMLHttpRequest();
        let carInput = app().createCarInput();
        post.open("POST", "http://localhost:3000/car");
        post.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        post.send(
          `image=${carInput.image}&brandModel=${carInput.brandModel}&year=${carInput.year}&plate=${carInput.plate}&color=${carInput.color}`
        );
        location.reload();
        app().getCar();
      },

      addCar: function addCar(car) {
        car.forEach((carObject) => {
          let $tr = document.createElement("tr");
          let tdObject = app().createTdObject();
          let $img = document.createElement("img");
          let $removeButton = app().createRemoveButton();

          Object.keys(tdObject).forEach((key) => {
            if (key === "image") {
              $img.src = carObject.image;
              tdObject.image.appendChild($img);
              $tr.appendChild(tdObject.image);
              return;
            }
            tdObject[key].textContent = carObject[key];
            $tr.appendChild(tdObject[key]);
          });
          $tr.appendChild($removeButton);
          DOM('[data-js="table"]').get().appendChild($tr);
        });
      },

      clearForm: function clearForm() {
        DOM('[data-js="image-input"]').get().value = "";
        DOM('[data-js="brandModel-input"]').get().value = "";
        DOM('[data-js="year-input"]').get().value = "";
        DOM('[data-js="plate-input"]').get().value = "";
        DOM('[data-js="color-input"]').get().value = "";
      },

      removeRow: function removeRow() {
        DOM('[data-js="table"]').get().deleteRow(this.parentNode.rowIndex);
      },

      createTdObject: function createTdObject() {
        return {
          image: document.createElement("td"),
          brandModel: document.createElement("td"),
          year: document.createElement("td"),
          plate: document.createElement("td"),
          color: document.createElement("td"),
        };
      },

      createRemoveButton: function createRemoveButton() {
        let $removeButton = document.createElement("button");
        $removeButton.setAttribute("class", "remove-button");
        $removeButton.setAttribute("data-js", "remove-button");
        $removeButton.textContent = "X";
        $removeButton.onclick = this.removeRow;
        return $removeButton;
      },

      createCarInput: function createCarInput() {
        return {
          image: DOM('[data-js="image-input"]').get().value,
          brandModel: DOM('[data-js="brandModel-input"]').get().value,
          year: DOM('[data-js="year-input"]').get().value,
          plate: DOM('[data-js="plate-input"]').get().value,
          color: DOM('[data-js="color-input"]').get().value,
        };
      },
    };
  }

  app().init();
})(window.DOM);
