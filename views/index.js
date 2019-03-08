let loadingView = $('#loading_view');
let searchForm = $('#search_form');
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

table.addCompanies = (companies) => {
    if (Array.isArray(companies)) {
        companies.forEach((company) => {
            table.addCompany(company);
        })
    }
};


searchForm.submit((event) => {
    let text = searchField.val();
    if (text) {
        loadingView.setLoading(true);
        $.ajax({
            type: 'POST',
            url: '/api/ads/get',
            contentType: 'application/json',
            data: JSON.stringify({query: text}),
            success: (data) => {
                loadingView.setLoading(false);
                table.clearCompanies();
                table.addCompanies(data);
            },
            error: () => {
                loadingView.setLoading(false);
            }
        });
    }

    event.preventDefault();
});

table.clearCompanies();