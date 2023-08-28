//Getting Data from Input Field and Calling Get Product Function
const phoneToDisplay = () => {
  runWebsite(true);
};

const runWebsite = (isShowMore) => {
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

    const phoneImageRaw = phone.image;
    const phoneImage = `src="${phoneImageRaw}"`;

    const phoneCard = document.createElement("div");
    phoneCard.classList =
      "phone-card bg-slate-200 p-4 rounded-xl space-y-2 flex justify-center items-center flex-col";
    phoneCard.innerHTML = `
   
          <div class="phone-card bg-slate-200 p-4 rounded-xl space-y-2 flex justify-center items-center flex-col">
            <img class="rounded-xl w-20 h-30" ${phoneImage} alt="">
            <h2>${phoneName}</h2>
            <h3>Brand: ${phoneBrand} </h3>

          </div>
        `;
    phoneContainer.appendChild(phoneCard);
  }
};
