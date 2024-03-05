import { handleAddBtnClick, handleGetBtnClick, handleDelBtnClick } from '../shopping-list_page/local-storage'; // видалити handleAddBtnClick
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const refs = {
    shopListEmptElem: document.querySelector(".shop-list-empty"),
    shopListDivElem: document.querySelector(".shopping-list"),
    shopListElem: document.querySelector(".shop-list"),
    pageHeader: document.querySelector(".header-home"),
    paginationElem: document.getElementById("pagination"),
}
        
handleAddBtnClick("643282b1e85766588626a081"); // видалити
handleAddBtnClick("643282b1e85766588626a0b2"); //
handleAddBtnClick("643282b2e85766588626a112"); //
handleAddBtnClick("643282b1e85766588626a0d4"); //
handleAddBtnClick("643282b1e85766588626a085"); //
handleAddBtnClick("643282b1e85766588626a0b6"); //
handleAddBtnClick("643282b1e85766588626a087"); //
handleAddBtnClick("643282b2e85766588626a0f2"); //
handleAddBtnClick("643282b1e85766588626a0d2"); //
handleAddBtnClick("643282b1e85766588626a086"); //
handleAddBtnClick("643282b2e85766588626a116"); //
handleAddBtnClick("643282b2e85766588626a0f4"); //
handleAddBtnClick("643282b1e85766588626a0b4"); //

let booksList = handleGetBtnClick();

const options = {
    totalItems: booksList.length,
    itemsPerPage: 3, 
    visiblePages: 3,
    centerAlign: true,
}
const pagination = new Pagination('pagination', options);

renderWithPagination();

pagination.on('afterMove', renderWithPagination);

function renderWithPagination() {
    const currentPage = pagination.getCurrentPage();
    const itemsPerPage = pagination._options.itemsPerPage;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToRender = booksList.slice(startIndex, endIndex);
    renderShopList(booksToRender);
}
function renderShopList(booksList) {
    if (booksList.length === 0) {
        refs.shopListEmptElem.classList.remove("is-hidden");
        refs.paginationElem.classList.add("is-hidden");
    } else {
        refs.shopListEmptElem.classList.add("is-hidden");
        refs.paginationElem.classList.remove("is-hidden");
        const markup = shopListTemplate(booksList);
        refs.shopListElem.innerHTML = markup;
        const deleteBtnElements = document.querySelectorAll(".shop-list-delete-btn");
        deleteBtnElements.forEach(button => {
            button.addEventListener("click", onDeleteBtnClick);
        });
    }
}

function onDeleteBtnClick(event) {
    const id = event.target.closest(".shop-list-item").id;
    handleDelBtnClick(id);
    const bookToRemove = document.getElementById(id);
    bookToRemove.parentNode.removeChild(bookToRemove);
    booksList = handleGetBtnClick();
    const userCurrentPage = pagination.getCurrentPage();
    pagination.reset(booksList.length);
    renderWithPagination();
    pagination.movePageTo(userCurrentPage);
    if (refs.shopListElem.childElementCount === 0) {
        refs.shopListEmptElem.classList.remove("is-hidden");
    }
}

function shopListTemplate(books) {
    return books.map(bookTemplate).join("");
}

function bookTemplate(book) {
    const { _id, book_image, title, list_name, description, author, amazon_product_url, buy_links } = book;

    return `<li class="shop-list-item" id="${_id}">
        <img class="shop-list-img"
            src="${book_image}"
            alt="${title}" />  
        <div class="book-info">
        <h1 class="book-title">${title}</h1>
        <p class="book-category">${list_name}</p>
        <p class="book-description">${description}</p>
        <div class="card-footer">
        <p class="book-author">${author}</p>
        <ul class="book-shop-links">
        <li><a href="${amazon_product_url}" target="_blank"><img class="book-shop-img amazon-logo"
        srcset="
        /img/internet-shops/amazon@1x.png 1x,
        /img/internet-shops/amazon@2x.png 2x" 
        src="/img/internet-shops/amazon@1x.png"
        alt="Amazon logo"
        width="32"
        height="11"/></a></li>
        <li><a class="book-shop-link" href="${buy_links[1].url}" target="_blank"><img class="book-shop-img apple-books-logo"
        srcset="
        /img/internet-shops/book@1x.png 1x,
        /img/internet-shops/book@2x.png 2x" 
        src="/img/internet-shops/book@1x.png"
        alt="Apple Books logo"
        width="16"
        height="16"/></a></li>
        </ul>
        </div>
        <button class="shop-list-delete-btn"><svg class="delete-btn-icon">
                  <use href="/img/icons.svg#icon-trash"></use>
                </svg></button> 
        </div>
    </li>`;
}

window.addEventListener('DOMContentLoaded', (event) => {
    refs.pageHeader.dataset.pageName = 'shopping-list';
});
