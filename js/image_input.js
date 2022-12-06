const imgInputHelper = document.getElementById("add-single-img");
const imgInputHelperLabel = document.getElementById("add-img-label");
const imgContainer = document.querySelector(".image_container");
const imgFiles = [];

const addImgHandler = () => {
    const file = imgInputHelper.files[0];
    if (!file) return;
    // Generate img preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const newImg = document.createElement("img");
        newImg.src = reader.result;
        imgContainer.insertBefore(newImg, imgInputHelperLabel);
    };
    // Store img file
    imgFiles.push(file);
    // Reset image input
    imgInputHelper.value = "";
    return;
};
imgInputHelper.addEventListener("change", addImgHandler);

const getImgFileList = (imgFiles) => {
    const imgFilesHelper = new DataTransfer();
    imgFiles.forEach((imgFile) => imgFilesHelper.items.add(imgFile));
    return imgFilesHelper.files;
};

// SUBMIT BUTTON https://onestepcode.com/style-html-img-file-input/
// ----------------------------------------------------------------
/*const customFormSubmitHandler = (ev) => {
    ev.preventDefault();
    const firstImgInput = document.getElementById("image_input");
    firstImgInput.files = getImgFileList(imgFiles);
    // submit form to server, etc
};
document
    .querySelector(".custom__form")
    .addEventListener("submit", customFormSubmitHandler);*/