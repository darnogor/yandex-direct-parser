let loadingView = $('#loading_view');
let searchButton = $('#search_button');
let searchField = $('#search_field');
let table = $('#table tbody');


loadingView.setLoading = (isLoading) => {
    if (isLoading) {
        loadingView.removeClass('invisible');
    } else {
        loadingView.addClass('invisible');
    }
};


table.clearCompanies = () => {
    table.empty();
};

table.addCompany = (company) => {
    let number = table.children().length + 1;
    table.append(`<tr><th scope="row">${number}</th><td>${company.name}</td><td>${company.contact}</td></tr>`);
};


let test = {
    name: "SAFDSASF",
    contact: "+375 33 2352333"
};
table.clearCompanies();
table.addCompany(test);