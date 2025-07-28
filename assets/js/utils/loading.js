const loadingBox = document.querySelector(".loading");
export const showLoading = () => loadingBox?.classList.add("on");
export const hideLoading = () => loadingBox?.classList.remove("on");