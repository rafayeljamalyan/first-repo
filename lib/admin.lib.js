/** created by r
 * 30-01-21
 * 12:27
 */

/** r_function
 * 
 */
function ourConfirm(question, yesFunc, noFunc){
    return modalDialog(question,{
        type:"confirm",
        yes: yesFunc,
        no: noFunc
    });
}


/** r_function
 * 
 */
function modalDialog(data,dialogInfo){
    const modal = getModal();
    document.body.appendChild(modal);
    switch(dialogInfo.type){
        case "confirm":
            fillConfirmBody(modal,data,dialogInfo.yes, dialogInfo.no);
            break;
        case "update":
        case "new":
            formModal(modal,data,dialogInfo.type,dialogInfo.save);
            break;
    }
}

/** r_function
 * 
 */
function getModal(){
    const modalWrapper = document.createElement(`div`);
    modalWrapper.classList.add(`modal-content`);
    const modalBody = document.createElement(`div`);
    modalWrapper.appendChild(modalBody);
    modalBody.classList.add(`modal-body`);
    return modalWrapper;
}

/** r_function
 * 
 */
function fillConfirmBody(modalWrapper,question,yesFunc,noFunc){
    const modal = modalWrapper.querySelector(`.modal-body`);
    modal.classList.add(`confirm-modal-body`);

    const questionDiv = document.createElement(`div`);
    modal.appendChild(questionDiv);
    questionDiv.classList.add(`modal-confirm__question-div`);

    const questionP = document.createElement(`p`);
    questionP.innerText = question;
    questionDiv.appendChild(questionP);

    const buttonsDiv = document.createElement(`div`);
    modal.appendChild(buttonsDiv); 
    buttonsDiv.classList.add(`modal-confirm__buttons-div`);

    const cancelBtn = document.createElement(`div`);
    buttonsDiv.appendChild(cancelBtn);
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener(`click`,(e)=>{
        noFunc();
        closeDialog(modalWrapper);
    });
    
    const okBtn = document.createElement(`div`);
    buttonsDiv.appendChild(okBtn);
    okBtn.innerText = "Ok";
    okBtn.addEventListener(`click`,(e)=>{
        yesFunc();
        closeDialog(modalWrapper);  
    });

}

/** r_function
 * 
 */
function closeDialog(dialog){
    dialog.remove();
}


/** r_function
 * 
 */
function formModal(modalWrapper,data,type,saveFunc){
    const modal = modalWrapper.querySelector(`.modal-body`);
    modal.classList.add(`form-modal-body`);

    const form = document.createElement(`form`);
    modal.appendChild(form);

    if(type == "new"){
        modal.classList.add(`form-new-modal-body`);        
    }
    else if(type == "update"){
        modal.classList.add(`form-update-modal-body`);    
        Object.keys(data).forEach((el,i)=>{
          form.appendChild(newFormInput(el,data[el]));
        })
    }
    
    const buttonsDiv = document.createElement(`div`);
    modal.appendChild(buttonsDiv); 
    buttonsDiv.classList.add(`modal-form__buttons-div`);

    const cancelBtn = document.createElement(`div`);
    buttonsDiv.appendChild(cancelBtn);
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener(`click`,(e)=>{
        closeDialog(modalWrapper);
    });
    
    const okBtn = document.createElement(`div`);
    buttonsDiv.appendChild(okBtn);
    okBtn.innerText = "Save";
    okBtn.addEventListener(`click`,(e)=>{
        saveFunc(getAllValuesFromForm(form));
        closeDialog(modalWrapper);  
    });

}

/** r_function
 * 
 */
function newFormInput(key,value){
    const inputDiv = document.createElement(`div`);
    inputDiv.classList.add(`form__input-div`);
    
    const inputLabel = document.createElement(`label`);
    inputDiv.appendChild(inputLabel);
    inputLabel.innerText = key;
    inputLabel.setAttribute(`for`, `input_${key}`)
    
    const input = document.createElement(`input`);
    inputDiv.appendChild(input);
    input.setAttribute(`name`, key);
    input.setAttribute(`id`, `input_${key}`);  
    if(key.toLowerCase() == `id`)  {
        input.setAttribute(`disabled`,`disabled`);
    }
    input.value = value;

    return inputDiv;
}

/** r_function
 *  
 */
function getAllValuesFromForm(form){
    let result = {};
    let formElements = form.elements;
    for(let i = 0; i < formElements.length; i++){
        result[formElements[i].name] = formElements[i].value;
    }
    return result;
}
