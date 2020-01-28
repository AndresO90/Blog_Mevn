

const actions = { 
    hideErrors() {
    const errors = document.querySelector(".alert")
    const divComments = document.querySelector(".list-group")
    divComments.style.display="none";
    if(errors.style.display=="none") {
        errors.style.display="block"
    }
    setTimeout(()=> {
     errors.style.display="none"
      divComments.style.display="block";
    },2500);
}
};
export default {
    actions
}   