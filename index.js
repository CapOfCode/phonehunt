//Getting Data from Input Field and Calling Get Product Function
const phoneToDisplay = () => {
  runWebsite(true);
};

const runWebsite = (isShowMore) => {
  loading(true);
  let inputField = document.querySelector(".input").value;
  if (inputField === "") {
    getProducts((inputField = "a"), isShowMore);
  }
  getProducts(inputField, isShowMore);
};

const getProducts = async (inputUrl = "a", isShowMore = false) => {
  let url = `https://openapi.programming-hero.com/api/phones?search=${inputUrl}`;
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data;
  setProducts(phones, isShowMore);
};
getProducts();

const setProducts = (phoneData, isShowMore) => {
  const phoneContainer = document.querySelector(".phone-container");
  phoneContainer.innerHTML = "";
  const totalPhones = phoneData.length;
  //see more button
  let seeMoreBtn = document.getElementById("seeMore");
  if (totalPhones > 18 && !isShowMore) {
    seeMoreBtn.classList.remove("hidden");
  } else {
    seeMoreBtn.classList.add("hidden");
  }

  if (!isShowMore) {
    phoneData = phoneData.slice(0, 12);
  }

  for (phone of phoneData) {
    const phoneBrand = phone.brand;
    const phoneName = phone.phone_name;
    const productId = phone.slug;
    const phoneImageRaw = phone.image;
    const phoneImage = `src="${phoneImageRaw}"`;

    const phoneCard = document.createElement("div");
    phoneCard.classList =
      "phone-card bg-slate-200 p-4 rounded-xl space-y-2 flex justify-center items-center flex-col";
    phoneCard.innerHTML = `
   
          <div class="phone-card bg-slate-200 p-4 rounded-xl space-y-2 flex justify-center items-center flex-col">
            <img class="rounded-xl w-20 h-30" ${phoneImage} alt="">
            <h2 class="text-2xl">${phoneName}</h2>
            <h3 class="text-xl" >Brand: ${phoneBrand} </h3>
            <button class="btn" onclick="showDetails('${productId}')">Show Details</button>
          </div>
        `;
    phoneContainer.appendChild(phoneCard);
  }
  loading(false);
};

const loading = (isLoading) => {
  const loadingScreen = document.getElementById("loading-screen");
  console.log(loadingScreen);
  if (isLoading) {
    loadingScreen.classList.remove("hidden");
  } else {
    loadingScreen.classList.add("hidden");
  }
};

//Show Details

const showDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  const singleProduct = data.data;
  console.log(singleProduct);
  let productImage = `src='${singleProduct.image}'`
  let productName = singleProduct.name;
  let productStorage = singleProduct.mainFeatures.storage;
  let productChipset = singleProduct.mainFeatures.chipSet;
  let productMemory = singleProduct.mainFeatures.memory;
  let productRelease = singleProduct.releaseDate ? singleProduct.releaseDate : "No Data Found" ;
  let productBrand = singleProduct.brand;
  let productGPS = singleProduct.others?.GPS ?  singleProduct.others?.GPS : "NO GPS";

  const singleContainer = document.querySelector(".modal-container");
  singleContainer.innerHTML = "";
  let singleProductCard = document.createElement("div");
  singleProductCard.classList = "single-product-card space-y-2";
  singleProductCard.innerHTML = `

              <div
                class="flex justify-center items-center bg-slate-200 p-2 rounded-xl w-200"
              >
                <img ${productImage} alt="" />
              </div>
              <h1 class="text-xl">${productName}</h1>
              <div class="features flex gap-3 w-full">
                <div class="features-name font-bold">
                  <h3>Storage :</h3>
                  <h3>Chipset :</h3>
                  <h3>Memory :</h3>
                  <h3>Release data :</h3>
                  <h3>Brand :</h3>
                  <h3>GPS :</h3>
                </div>
                <div class="features-details">
                <h3>${productStorage}</h3>
                  <h3>${productChipset}</h3>
                  <h3>${productMemory}</h3>
                  <h3>${productRelease}</h3>
                  <h3>${productBrand}</h3>
                  <h3>${productGPS}</h3>
                </div>
              </div>
         `;
  singleContainer.appendChild(singleProductCard);

  my_modal_3.showModal();
};
