/** created by r
 * 13-01-21
 * 19:48
 */

let mainData = null; 
let currentPage = null;

/** r_function
 * 
 */ 
function drawMainPage(data){
    drawMenu(data);
    mainData = data;
} 

/** r_function
 * 
 */
function drawMenu(data){
    const menuItems = Object.keys(data); // returns as array
    const mainMenuDiv = document.querySelector(`#main-menu`);
    mainMenuDiv.innerHTML = "";
    
    const menuUl = document.createElement(`ul`);
    mainMenuDiv.appendChild(menuUl);

    menuItems.forEach((menuItemsiElement,i)=>{
        const menuItemLi = document.createElement(`li`);
        menuUl.appendChild(menuItemLi);
        menuItemLi.innerText = menuItemsiElement;

        menuItemLi.addEventListener(`click`,(e)=>{
            selectMenuItem(menuUl,menuItemLi);
            menuItemOnClick(data[menuItemsiElement],i);
            currentPage = menuItemsiElement;
        });

        const recentlyOpenedPageIndex = localStorage.getItem("pageIndex");
        if(i=== parseInt((recentlyOpenedPageIndex != null) ? recentlyOpenedPageIndex : "0")){
            selectMenuItem( menuUl,menuItemLi);
            menuItemOnClick(data[menuItems[i]],i);
            currentPage = menuItemsiElement;
        }

    });

}

/** r_function
 *  
 */
function selectMenuItem(menu,menuItem){
    const lastActive = menu.querySelector(`.active`);
    if(lastActive){
        lastActive.classList.remove(`active`);
    }

    menuItem.classList.add(`active`);
}

/** r_function
 * 
 */
function drawContent(data){
    const contentDiv = document.querySelector(`#main-content`);
    contentDiv.innerHTML = "";

    const mainDataTable = document.createElement(`div`);
    contentDiv.appendChild(mainDataTable);
    mainDataTable.id = `main-data-table`;
    
    const pagination = getPagination(data);
    contentDiv.appendChild(pagination);
}

/** r_function
 * 
 */
function getPagination(data){
    const paginationDiv = document.createElement(`div`);
    paginationDiv.classList.add(`main-content__pagination`);
    
    const itemsInpage = 4;

    const countOfPages = Math.ceil(data.length / itemsInpage);
    for(let i = 0; i < countOfPages; i++){
        const paginationItem = document.createElement(`div`);
        paginationDiv.appendChild(paginationItem);
        paginationItem.innerText = i+1;

        paginationItem.addEventListener(`click`,()=>{
            paginationItemOnclick(i,data,paginationItem,itemsInpage);
        });
        if(i==0){
            paginationItemOnclick(i,data,paginationItem,itemsInpage);            
        }
    }

    return paginationDiv;
}

/** r_function
 * 
 */
function paginationItemOnclick(index,data,div,itemsInPage){
    selectMenuItem(div.parentElement,div);
    drawFilteredTable(data,index,itemsInPage);
    
    localStorage.setItem("paginationIndex",index);
}

/** r_function
 *  
 */
function drawFilteredTable(data,i,n){
    const dataContentDiv = document.querySelector(`#main-data-table`);
    
    dataContentDiv.innerHTML = ``;
    const filteredData = data.filter((el,k)=>{
        if(k >= n * i && k < (i+1)* n){
            return true
        }
        return false
    })

    const contentTable = getTable(filteredData);
    dataContentDiv.appendChild(contentTable);
}


/** r_function
 * 
 */
function menuItemOnClick(el,index){
    drawContent(el);
    localStorage.setItem("pageIndex",index);
}

/** r_function
 * 
 */
function getTable(data){
    const tableiParunakogh = document.createElement(`div`);
    tableiParunakogh.classList.add(`main-content__table`);
    if(data.length > 0){
        const tvyalZangvatsiObyektneriStruktura = Object.keys(data[0]);        
        if(tvyalZangvatsiObyektneriStruktura.length > 0){
            const dataTable = document.createElement(`table`);
            tableiParunakogh.appendChild(dataTable);
            data.forEach((arrEl,i)=>{
                if(i==0){
                    dataTable.appendChild(newRow(tvyalZangvatsiObyektneriStruktura, "header"));
                }  
                dataTable.appendChild(newRow(arrEl, "simple"));
            });
            
        }
    }
    return tableiParunakogh;
}

/** r_function
 * 
 */
function newRow(rowData, type){
    const tr = document.createElement(`tr`);
    if(type == "header"){
        rowData.forEach((firElItem,j)=>{
            const th = document.createElement(`th`);
            tr.appendChild(th);
            th.innerText = firElItem;
        });
        if(rowData.length > 0){
            const th1 = document.createElement(`th`);
            const th2 = document.createElement(`th`);
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
    }
    else{ 
        const rowDataStruct = Object.keys(rowData);
        rowDataStruct.forEach((firElemKey,j)=>{
            const td = document.createElement(`td`);
            tr.appendChild(td);
            td.innerText = rowData[firElemKey];
        });
        if(rowDataStruct.length > 0){
            const td1 = document.createElement(`td`);
            const td2 = document.createElement(`td`);
            tr.appendChild(td1);
            tr.appendChild(td2);
            td1.appendChild(newUpdateButton(rowData));
            td2.appendChild(newDeleteButton(rowData));
        }
    }
    return tr;
};

/** r_function
 * 
 */
function newUpdateButton(rowData){
    const updateButtonDiv = document.createElement(`div`);
    updateButtonDiv.classList.add(`btn`);
    updateButtonDiv.classList.add(`update-btn`);
    updateButtonDiv.addEventListener(`click`,(e)=>{
        updateBtnOnClick(rowData,e);
    });
    return updateButtonDiv;
}

/** r_function
 * 
 */
function newDeleteButton(rowData){
    const deleteButtonDiv = document.createElement(`div`);
    deleteButtonDiv.classList.add(`btn`);
    deleteButtonDiv.classList.add(`delete-btn`);;
    deleteButtonDiv.addEventListener(`click`,(e)=>{
        deleteBtnOnClick(rowData,e);
    });
    return deleteButtonDiv;
}

/** r_function
 * 
 */
function updateBtnOnClick(rowData, e){
    console.log(`updated`);
    modalDialog(rowData,{
        type:"update",
        save: (newValues)=>{
            saveRowData(rowData, newValues);
        }
    });
}

/** r_function
 * 
 */
function deleteBtnOnClick(rowData, e){
    const canDelete = ourConfirm("Are you sure to delete?",()=>{
        deleteRow(rowData);        
    },()=>{});
}

/** r_function
 * 
 */
function deleteRow(rowData){
    console.log(rowData);
    
    mainData[currentPage] = mainData[currentPage].filter((el,i)=>{
        return rowData.id != el.id;
    });
    resetPage(mainData);    
}

/** r_function
 * 
 */
function saveRowData(rowData, rowNewData){
    console.log(rowNewData);

    mainData[currentPage] = mainData[currentPage].map((el,i)=>{
        if(el.id == rowData.id){
            let updateEl = rowNewData;
            return updateEl;
        }
        else{
            return el;
        }
    });
    resetPage(mainData);
}

/** r_function
 * 
 */
function resetPage(data){
    drawMainPage(data);
}
