(function (DOM) {
  "use strict";

  function app() {
    return {
      init: function init() {
        this.initCompany();
        this.initEvents();
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
        DOM('[data-js="table"]').get().appendChild(app().addCar());
      },

      addCar: function addCar() {
        let $tr = document.createElement("tr");
        let $tdImagem = document.createElement("td");
        let $img = document.createElement("img");
        let $tdModelo = document.createElement("td");
        let $tdAno = document.createElement("td");
        let $tdPlaca = document.createElement("td");
        let $tdCor = document.createElement("td");

        $img.src = DOM('[data-js="img-input"]').get().value;
        $tdImagem.appendChild($img);

        $tdModelo.textContent = DOM('[data-js="modelo-input"]').get().value;
        $tdAno.textContent = DOM('[data-js="ano-input"]').get().value;
        $tdPlaca.textContent = DOM('[data-js="placa-input"]').get().value;
        $tdCor.textContent = DOM('[data-js="cor-input"]').get().value;

        $tr.appendChild($tdImagem);
        $tr.appendChild($tdModelo);
        $tr.appendChild($tdAno);
        $tr.appendChild($tdPlaca);
        $tr.appendChild($tdCor);

        app().clearForm();
        return $tr;
      },

      clearForm: function clearForm() {
        DOM('[data-js="img-input"]').get().value = "";
        DOM('[data-js="modelo-input"]').get().value = "";
        DOM('[data-js="ano-input"]').get().value = "";
        DOM('[data-js="placa-input"]').get().value = "";
        DOM('[data-js="cor-input"]').get().value = "";
      },
    };
  }

  app().init();
})(window.DOM);
